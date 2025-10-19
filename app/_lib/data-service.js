import { format } from "date-fns";
import { revalidatePath } from "next/cache";

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

const clients = [
  {
    id: "1",
    name: "ООО Альфа",
  },
  {
    id: "2",
    name: "ИП Сидоров",
  },
  {
    id: "3",
    name: "ООО Бета",
  },
  {
    id: "4",
    name: "АО Гамма",
  },
  {
    id: "5",
    name: "ИП Козлова",
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
  return clients.slice();
}

export async function getClient(id) {
  return clients.find((client) => client.id === id);
}

export async function getNewClient() {
  return {
    id: "",
    name: "",
  };
}
