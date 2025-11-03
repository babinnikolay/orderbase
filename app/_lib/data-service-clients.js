"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../_lib/prisma";
import { auth } from "@/app/_lib/auth";

export async function saveClient(client) {
  const session = await auth();
  if (!session) return;

  if (!client.id)
    await prisma.client.create({
      data: { name: client.name, user: { connect: { id: session.user.id } } },
    });
  else
    await prisma.client.update({
      where: { id: client.id },
      data: { name: client.name },
      user: { connect: { id: session.user.id } },
    });
}

export async function getClients(skip = 0, take = 10) {
  const session = await auth();
  if (!session) return;

  try {
    const [clients, totalCount] = await Promise.all([
      prisma.client.findMany({
        skip,
        take,
        orderBy: {
          name: "asc", // Сортировка по имени
        },
        where: { userId: session.user.id },
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
  const session = await auth();
  if (!session) return;

  try {
    await prisma.client.delete({ where: { id, userId: session.user.id } });
    revalidatePath("/clients");
  } catch (error) {
    throw error;
  }
}

export async function getClient(id) {
  const session = await auth();
  if (!session) return;

  return prisma.client.findUnique({
    where: { id, userId: session.user.id },
  });
}

export async function getNewClient() {
  return {
    id: "",
    name: "",
  };
}
