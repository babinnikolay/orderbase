"use server";

import { format } from "date-fns";
import { revalidatePath } from "next/cache";
import { prisma } from "../_lib/prisma";

export async function deleteInvoice(id) {
  try {
    await prisma.invoice.delete({ where: { id } });
    revalidatePath("/invoices");
  } catch (error) {
    throw error;
  }
}

export async function getInvoices(skip = 0, take = 10) {
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
  try {
    return prisma.invoice.findUnique({
      where: { id },
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
  if (!invoice.id) {
    try {
      await prisma.invoice.create({
        data: {
          date: invoice.date,
          total: invoice.total,
          description: invoice.description,
          paid: invoice.paid,
          client: { connect: { id: invoice.client.id } },
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
            invoiceId: null,
          },
          data: {
            invoiceId: invoice.id,
          },
        });
      }

      await prisma.invoice.update({
        where: { id: invoice.id },
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
