"use server";

import { format } from "date-fns";
import { revalidatePath } from "next/cache";
import { prisma } from "../_lib/prisma";
import { dateFormat } from "@/app/_helpers/appConstants";
import { auth } from "@/app/_lib/auth";

export async function getOrders(skip = 0, take = 10) {
  const session = await auth();
  if (!session) return;

  try {
    const [orders, totalCount] = await Promise.all([
      prisma.order.findMany({
        skip,
        take,
        include: {
          client: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          date: "desc",
        },
        where: { userId: session.user.id },
      }),
      prisma.order.count(),
    ]);

    return {
      orders,
      totalCount,
      hasMore: skip + take < totalCount,
    };
  } catch (error) {
    return {
      orders: [],
      totalCount: 0,
      hasMore: false,
    };
  }
}

export async function getAvailableOrders(clientId) {
  const session = await auth();
  if (!session) return;

  try {
    return await prisma.order.findMany({
      where: {
        invoiceId: null,
        clientId: Number(clientId),
        userId: session.user.id,
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function getOrder(id) {
  const session = await auth();
  if (!session) return;

  try {
    return prisma.order.findUnique({
      where: { id, userId: session.user.id },
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function saveOrder(order) {
  const session = await auth();
  if (!session) return;

  if (!order.id) {
    try {
      await prisma.order.create({
        data: { ...order, user: { connect: { id: session.user.id } } },
      });
    } catch (err) {
      throw err;
    }
  } else {
    try {
      await prisma.order.update({
        where: { id: order.id, userId: session.user.id },
        data: {
          date: order.date,
          amount: order.amount,
          description: order.description,
          clientId: order.client.id,
        },
      });
    } catch (err) {
      throw err;
    }
  }
  revalidatePath("/orders");
}

export async function deleteOrder(id) {
  const session = await auth();
  if (!session) return;

  try {
    await prisma.order.delete({ where: { id, userId: session.user.id } });
    revalidatePath("/orders");
  } catch (error) {
    throw error;
  }
}

export async function getNewOrder() {
  return {
    id: "",
    date: format(new Date(), "yyyy-MM-dd"),
    client: {
      id: "",
      name: "",
    },
    amount: 0,
    description: "",
  };
}

export async function getDashboardData() {
  const session = await auth();
  if (!session) return;

  const currentDate = new Date();
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(currentDate.getDate() - 90);

  try {
    const [payments, sales] = await Promise.all([
      prisma.invoice.findMany({
        where: {
          paid: true,
          date: { gte: ninetyDaysAgo, lte: currentDate },
          userId: session.user.id,
        },
        select: {
          date: true,
          total: true,
          client: { select: { id: true, name: true } },
        },
        orderBy: { date: "asc" },
      }),
      prisma.order.findMany({
        where: {
          date: { gte: ninetyDaysAgo, lte: currentDate },
          userId: session.user.id,
        },
        select: {
          date: true,
          amount: true,
          client: { select: { id: true, name: true } },
        },
        orderBy: { date: "asc" },
      }),
    ]);

    const clientDateMap = new Map();
    const clientTotalMap = new Map();

    // Вспомогательная функция для обработки данных
    const processRecord = (date, amount, client, isSale) => {
      const dateKey = format(date, dateFormat);
      const clientId = client?.id || "no-client";
      const clientName = client?.name || "Без клиента";

      // Детализированные данные (по дате и клиенту)
      const dateClientKey = `${dateKey}_${clientId}`;
      if (!clientDateMap.has(dateClientKey)) {
        clientDateMap.set(dateClientKey, {
          date: dateKey,
          clientId,
          clientName,
          sales: 0,
          payments: 0,
        });
      }

      const dateClientData = clientDateMap.get(dateClientKey);
      if (isSale) {
        dateClientData.sales += amount;
      } else {
        dateClientData.payments += amount;
      }

      // Суммарные данные (только по клиенту)
      if (!clientTotalMap.has(clientId)) {
        clientTotalMap.set(clientId, {
          clientId,
          clientName,
          totalSales: 0,
          totalPayments: 0,
        });
      }

      const clientData = clientTotalMap.get(clientId);
      if (isSale) {
        clientData.totalSales += amount;
      } else {
        clientData.totalPayments += amount;
      }
    };

    // Обработка продаж
    sales.forEach((order) =>
      processRecord(order.date, order.amount, order.client, true),
    );

    // Обработка платежей
    payments.forEach((invoice) =>
      processRecord(invoice.date, invoice.total, invoice.client, false),
    );

    // Формирование результатов
    const detailedByDateAndClient = Array.from(clientDateMap.values()).sort(
      (a, b) => {
        const dateCompare =
          new Date(a.date).getTime() - new Date(b.date).getTime();
        return dateCompare !== 0
          ? dateCompare
          : a.clientName.localeCompare(b.clientName);
      },
    );

    const summaryByClient = Array.from(clientTotalMap.values())
      .map((client) => ({
        ...client,
        debt: client.totalSales - client.totalPayments,
      }))
      .sort((a, b) => a.clientName.localeCompare(b.clientName));

    return {
      detailedByDateAndClient,
      summaryByClient,
    };
  } catch (error) {
    console.error("Error fetching chart data:", error);
    throw error;
  }
}
