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

export async function getSales() {
  const session = await auth();
  if (!session) return;

  const currentDate = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(currentDate.getDate() - 30);

  try {
    const [payments, sales] = await Promise.all([
      prisma.invoice.findMany({
        where: {
          paid: true,
          date: {
            gte: thirtyDaysAgo,
            lte: currentDate,
          },
          userId: session.user.id,
        },
        select: {
          date: true,
          total: true,
        },
        orderBy: {
          date: "asc",
        },
      }),
      prisma.order.findMany({
        where: {
          date: {
            gte: thirtyDaysAgo,
            lte: currentDate,
          },
          userId: session.user.id,
        },
        select: {
          date: true,
          amount: true,
        },
        orderBy: {
          date: "asc",
        },
      }),
    ]);

    const dateMap = new Map();

    sales.forEach((order) => {
      const dateKey = format(order.date, dateFormat);
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, {
          date: dateKey,
          sales: 0,
          payments: 0,
        });
      }
      dateMap.get(dateKey).sales += order.amount;
    });
    payments.forEach((invoice) => {
      const dateKey = format(invoice.date, dateFormat);
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, {
          date: dateKey,
          sales: 0,
          payments: 0,
        });
      }
      dateMap.get(dateKey).payments += invoice.total;
    });

    return Array.from(dateMap.values()).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  } catch (error) {
    console.error("Error fetching chart data:", error);
    throw error;
  }
}
