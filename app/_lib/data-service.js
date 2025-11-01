"use server";

import { format } from "date-fns";
import { revalidatePath } from "next/cache";
import { prisma } from "../_lib/prisma";

export async function getOrders(skip = 0, take = 10) {
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
  try {
    return await prisma.order.findMany({
      where: {
        invoiceId: null,
        clientId: Number(clientId),
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
  try {
    return prisma.order.findUnique({
      where: { id },
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
  if (!order.id) {
    try {
      await prisma.order.create({
        data: order,
      });
    } catch (err) {
      throw err;
    }
  } else {
    try {
      await prisma.order.update({
        where: { id: order.id },
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
  try {
    await prisma.order.delete({ where: { id } });
    revalidatePath("/orders");
  } catch (error) {
    throw error;
  }
}

export async function deleteInvoice(id) {
  try {
    await prisma.invoice.delete({ where: { id } });
    revalidatePath("/invoices");
  } catch (error) {
    throw error;
  }
}

export async function saveClient(client) {
  if (!client.id) await prisma.client.create({ data: { name: client.name } });
  else
    await prisma.client.update({
      where: { id: client.id },
      data: { name: client.name },
    });
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

export async function getClients(skip = 0, take = 10) {
  try {
    const [clients, totalCount] = await Promise.all([
      prisma.client.findMany({
        skip,
        take,
        orderBy: {
          name: "asc", // Сортировка по имени
        },
      }),
      prisma.client.count(),
    ]);

    return {
      clients,
      totalCount,
      hasMore: skip + take < totalCount,
    };
  } catch (error) {
    return {
      clients: [],
      totalCount: 0,
      hasMore: false,
    };
  }
}

export async function deleteClient(id) {
  try {
    await prisma.client.delete({ where: { id } });
    revalidatePath("/clients");
  } catch (error) {
    throw error;
  }
}

export async function getClient(id) {
  return prisma.client.findUnique({
    where: { id },
  });
}

export async function getNewClient() {
  return {
    id: "",
    name: "",
  };
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

    console.log(keepOrders);

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
