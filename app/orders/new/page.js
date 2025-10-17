import React from "react";
import Link from "next/link";
import OrderForm from "@/app/_components/OrderForm";
import SectionLabel from "@/app/_components/SectionLabel";
import SectionLine from "@/app/_components/SectionLine";
import { getClients, getNewOrder } from "@/app/_lib/data-service";

export default async function Page() {
  const [order, clients] = await Promise.all([getNewOrder(), getClients()]);

  return (
    <div>
      <SectionLine>
        <SectionLabel>New order</SectionLabel>
        <Link
          className="p-1 rounded-md border border-primary-600 hover:bg-accent-800"
          href={"/orders"}
        >
          &larr; Orders list
        </Link>
      </SectionLine>
      <OrderForm order={order} clients={clients} />
    </div>
  );
}
