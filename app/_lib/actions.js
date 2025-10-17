"use server";

import { saveOrder } from "@/app/_lib/data-service";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function saveOrderAction(order) {
  await saveOrder(order);
  revalidatePath(`/order/${order.id}`);
  redirect("/orders");
}
