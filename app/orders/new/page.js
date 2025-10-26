import React from "react";
import OrderForm from "@/app/_components/OrderForm";
import SectionLabel from "@/app/_components/SectionLabel";
import SectionLine from "@/app/_components/SectionLine";
import { getClients, getNewOrder } from "@/app/_lib/data-service";
import BackButton from "@/app/_components/BackButton";

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
