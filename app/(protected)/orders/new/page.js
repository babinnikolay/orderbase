import React from "react";
import OrderForm from "@/app/_components/order/OrderForm";
import SectionLabel from "@/app/_components/SectionLabel";
import SectionLine from "@/app/_components/SectionLine";
import BackButton from "@/app/_components/BackButton";
import { getClients } from "@/app/_lib/data-service-clients";
import { getNewOrder } from "@/app/_lib/data-service-orders";

export const revalidate = 0;

export default async function Page() {
  const [order, clients] = await Promise.all([getNewOrder(), getClients()]);

  return (
    <div>
      <SectionLine>
        <SectionLabel>New order</SectionLabel>
        <BackButton href="/orders" text="Orders list" />
      </SectionLine>
      <OrderForm order={order} clients={clients} />
    </div>
  );
}
