"use server";

import { format } from "date-fns";
import { revalidatePath } from "next/cache";
import { prisma } from "../_lib/prisma";

const invoices = [
  {
    id: "1",
    date: "2025-10-20",
    client: {
      id: "1",
      name: "ООО Альфа",
    },
    total: 1250,
    description: "some description",
    paid: false,
    orders: [
      {
        id: "1",
        amount: 50,
        date: "2025-10-01",
      },
      {
        id: "2",
        amount: 75,
        date: "2025-10-02",
      },
      {
        id: "3",
        amount: 60,
        date: "2025-10-03",
      },
      {
        id: "4",
        amount: 80,
        date: "2025-10-04",
      },
      {
        id: "5",
        amount: 45,
        date: "2025-10-05",
      },
      {
        id: "6",
        amount: 90,
        date: "2025-10-06",
      },
      {
        id: "7",
        amount: 55,
        date: "2025-10-07",
      },
      {
        id: "8",
        amount: 70,
        date: "2025-10-08",
      },
      {
        id: "9",
        amount: 65,
        date: "2025-10-09",
      },
      {
        id: "10",
        amount: 85,
        date: "2025-10-10",
      },
      {
        id: "11",
        amount: 40,
        date: "2025-10-11",
      },
      {
        id: "12",
        amount: 95,
        date: "2025-10-12",
      },
      {
        id: "13",
        amount: 50,
        date: "2025-10-13",
      },
      {
        id: "14",
        amount: 75,
        date: "2025-10-14",
      },
      {
        id: "15",
        amount: 60,
        date: "2025-10-15",
      },
      {
        id: "16",
        amount: 80,
        date: "2025-10-16",
      },
      {
        id: "17",
        amount: 45,
        date: "2025-10-17",
      },
      {
        id: "18",
        amount: 90,
        date: "2025-10-18",
      },
      {
        id: "19",
        amount: 55,
        date: "2025-10-19",
      },
      {
        id: "20",
        amount: 70,
        date: "2025-10-20",
      },
    ],
  },
  {
    id: "2",
    date: "2025-10-21",
    client: {
      id: "2",
      name: "ИП Иванов",
    },
    total: 850,
    description: "Разработка лендинга",
    paid: true,
    orders: [
      {
        id: "21",
        amount: 850,
        date: "2025-10-20",
      },
    ],
  },
  {
    id: "3",
    date: "2025-10-22",
    client: {
      id: "3",
      name: "ООО Бета",
    },
    total: 2100,
    description: "Техническая поддержка за октябрь",
    paid: false,
    orders: [
      {
        id: "22",
        amount: 700,
        date: "2025-10-10",
      },
      {
        id: "23",
        amount: 700,
        date: "2025-10-15",
      },
      {
        id: "24",
        amount: 700,
        date: "2025-10-20",
      },
    ],
  },
  {
    id: "4",
    date: "2025-10-23",
    client: {
      id: "4",
      name: "ЗАО Гамма",
    },
    total: 150,
    description: "Консультация",
    paid: true,
    orders: [
      {
        id: "25",
        amount: 150,
        date: "2025-10-22",
      },
    ],
  },
];

const orders = [
  {
    id: "1",
    date: "2025-10-10",
    client: {
      id: "1",
      name: "ООО Альфа",
    },
    amount: 300,
    description: "разработка лэндинговой страницы",
  },
  {
    id: "2",
    date: "2025-10-12",
    client: {
      id: "2",
      name: "ИП Сидоров",
    },
    amount: 150,
    description: "создание логотипа и брендбука",
  },
  {
    id: "3",
    date: "2025-10-15",
    client: {
      id: "3",
      name: "ООО Бета",
    },
    amount: 500,
    description: "разработка интернет-магазина",
  },
  {
    id: "4",
    date: "2025-10-18",
    client: {
      id: "4",
      name: "АО Гамма",
    },
    amount: 200,
    description: "техническая поддержка сайта",
  },
  {
    id: "5",
    date: "2025-10-20",
    client: {
      id: "5",
      name: "ИП Козлова",
    },
    amount: 100,
    description: "доработка дизайна мобильного приложения",
  },
];

export async function getOrders() {
  return orders.slice();
}

export async function getOrder(id) {
  return orders.find((order) => order.id === id);
}

export async function saveOrder(order) {
  if (!order.id) order.id = Math.max(...orders.map((order) => order.id)) + 1;
  orders.push(order);
  revalidatePath("/orders");
}

export async function saveClient(client) {
  await prisma.client.create({ data: { name: client.name } });
  revalidatePath("/orders");
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

export async function getClient(id) {
  return prisma.client.findUnique(
    {
      where: {id}
    })
}

export async function getNewClient() {
  return {
    id: "",
    name: "",
  };
}

export async function getInvoices() {
  return invoices.slice();
}

export async function getInvoice(id) {
  return invoices.find((invoice) => invoice.id === id);
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

export async function getAvailableOrders() {
  return orders.slice(0, 3);
}
