"use server";

import { format } from "date-fns";
import { revalidatePath } from "next/cache";
import { prisma } from "../_lib/prisma";
import { auth } from "@/app/_lib/auth";

export async function deleteInvoice(id) {
  const session = await auth();
  if (!session) return;

  try {
    await prisma.invoice.delete({ where: { id, userId: session.user.id } });
    revalidatePath("/invoices");
  } catch (error) {
    throw error;
  }
}

export async function getInvoices(skip = 0, take = 10) {
  const session = await auth();
  if (!session) return;

  try {
    const [invoices, totalCount] = await Promise.all([
      prisma.invoice.findMany({
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
      prisma.invoice.count(),
    ]);

    return {
      invoices,
      totalCount,
      hasMore: skip + take < totalCount,
    };
  } catch (error) {
    throw error;
  }
}

export async function getInvoice(id) {
  const session = await auth();
  if (!session) return;

  try {
    return prisma.invoice.findUnique({
      where: { id, userId: session.user.id },
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
        orders: {
          select: {
            id: true,
            date: true,
            amount: true,
            description: true,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function saveInvoice(invoice) {
  const session = await auth();
  if (!session) return;

  if (!invoice.id) {
    try {
      await prisma.invoice.create({
        data: {
          date: invoice.date,
          total: invoice.total,
          description: invoice.description,
          paid: invoice.paid,
          client: { connect: { id: invoice.client.id } },
          user: { connect: { id: session.user.id } },
          orders: {
            connect: invoice.orders.map((order) => ({
              id: order.id,
            })),
          },
        },
      });
    } catch (err) {
      throw err;
    }
  } else {
    const keepOrders = invoice.orders.map((order) => order.id);

    await prisma.$transaction(async (tx) => {
      await tx.order.updateMany({
        where: {
          invoiceId: invoice.id,
          id: {
            notIn: keepOrders,
          },
          userId: session.user.id,
        },
        data: {
          invoiceId: null,
        },
      });

      if (keepOrders.length > 0) {
        await tx.order.updateMany({
          where: {
            id: {
              in: keepOrders,
            },
            userId: session.user.id,
            invoiceId: null,
          },
          data: {
            invoiceId: invoice.id,
          },
        });
      }

      await prisma.invoice.update({
        where: { id: invoice.id, userId: session.user.id },
        data: {
          date: invoice.date,
          total: invoice.total,
          description: invoice.description,
          paid: invoice.paid,
          clientId: invoice.client.id,
        },
      });
    });
  }
}

export async function getNewInvoice() {
  return {
    id: "",
    date: format(new Date(), "yyyy-MM-dd"),
    client: {
      id: "",
      name: "",
    },
    total: 0,
    description: "",
    paid: false,
    orders: [],
  };
}
