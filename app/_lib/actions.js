"use server";

import {
  deleteClient,
  deleteOrder,
  getAvailableOrders,
  saveClient,
  saveInvoice,
  saveOrder,
} from "@/app/_lib/data-service";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function saveOrderAction(order) {
  await saveOrder(order);
  revalidatePath("/orders");
  redirect("/orders");
}

export async function saveClientAction(client) {
  await saveClient(client);
  revalidatePath("/clients");
  redirect("/clients");
}

export async function deleteClientAction(id) {
  await deleteClient(id);
  revalidatePath(`/clients`);
}

export async function deleteOrderAction(id) {
  await deleteOrder(id);
  revalidatePath(`/orders`);
}

export async function saveInvoiceAction(invoice) {
  await saveInvoice(invoice);
  revalidatePath("/invoices");
  redirect("/invoices");
}

export async function getFreeOrdersAction() {
  return await getAvailableOrders();
}
