"use server";

import { format } from "date-fns";
import { revalidatePath } from "next/cache";
import { prisma } from "../_lib/prisma";

export async function getOrders() {
  try {
    return await prisma.order.findMany({
      where: {
        invoiceId: null,
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
    return [];
  }
}

export async function getAvailableOrders() {
  return await getOrders();
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

export async function saveClient(client) {
  await prisma.client.create({ data: { name: client.name } });
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

export async function getClients() {
  try {
    return await prisma.client.findMany();
  } catch (error) {
    return [];
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

export async function getInvoices() {
  try {
    return await prisma.invoice.findMany({
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
    return [];
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
  console.log(invoice);
  if (!invoice.id) {
    try {
      await prisma.invoice.create({
        data: invoice,
      });
    } catch (err) {
      throw err;
    }
  } else {
    try {
      await prisma.invoice.update({
        where: { id: invoice.id },
        data: {
          date: invoice.date,
          total: invoice.amount,
          description: invoice.description,
          paid: invoice.paid,
          clientId: invoice.client.id,
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
