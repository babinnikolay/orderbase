"use server";

import { deleteOrder, saveOrder } from "@/app/_lib/data-service-orders";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { deleteClient, saveClient } from "@/app/_lib/data-service-clients";
import { deleteInvoice, saveInvoice } from "@/app/_lib/data-service-invoices";

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

export async function deleteInvoiceAction(id) {
  await deleteInvoice(id);
  revalidatePath(`/invoices`);
}

export async function saveInvoiceAction(invoice) {
  await saveInvoice(invoice);
  revalidatePath("/invoices");
  redirect("/invoices");
}
