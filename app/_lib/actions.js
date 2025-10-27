"use server";

import {
  getAvailableOrders,
  saveClient,
  saveOrder,
} from "@/app/_lib/data-service";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function saveOrderAction(order) {
  await saveOrder(order);
  revalidatePath(`/order/${order.id}`);
  redirect("/orders");
}

export async function saveClientAction(client) {
  await saveClient(client);
  revalidatePath(`/client/${client.id}`);
  redirect("/clients");
}

export async function saveInvoiceAction(invoice) {
  // await saveOrder(order);
  revalidatePath(`/invoice/${invoice.id}`);
  redirect("/invoices");
}

export async function getFreeOrdersAction() {
  return await getAvailableOrders();
}
