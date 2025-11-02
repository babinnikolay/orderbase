"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../_lib/prisma";

export async function saveClient(client) {
  if (!client.id) await prisma.client.create({ data: { name: client.name } });
  else
    await prisma.client.update({
      where: { id: client.id },
      data: { name: client.name },
    });
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
