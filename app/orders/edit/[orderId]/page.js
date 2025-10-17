import React from "react";
import Link from "next/link";
import OrderForm from "@/app/_components/OrderForm";
import SectionLabel from "@/app/_components/SectionLabel";
import SectionLine from "@/app/_components/SectionLine";
import { getClients, getOrder } from "@/app/_lib/data-service";
import { dateFormat } from "@/app/_helpers/appConstants";
import { format } from "date-fns";

export default async function Page({ params }) {
  const [order, clients] = await Promise.all([
    getOrder(params.orderId),
    getClients(),
  ]);

  return (
    <div>
      <SectionLine>
        <SectionLabel>
          Edit order #{order?.id} from {format(order.date, dateFormat)}
        </SectionLabel>
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
