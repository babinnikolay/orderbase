import React from "react";
import OrderForm from "@/app/_components/OrderForm";
import SectionLabel from "@/app/_components/SectionLabel";
import SectionLine from "@/app/_components/SectionLine";
import { getClients, getOrder } from "@/app/_lib/data-service";
import { dateFormat } from "@/app/_helpers/appConstants";
import { format } from "date-fns";
import BackButton from "@/app/_components/BackButton";

export default async function Page({ params }) {
  const [order, clients] = await Promise.all([
    getOrder(Number(params.orderId)),
    getClients(),
  ]);

  return (
    <div>
      <SectionLine>
        <SectionLabel>
          Edit order #{order?.id} from {format(order.date, dateFormat)}
        </SectionLabel>
        <BackButton href="/orders" text="Orders list" />
      </SectionLine>
      <OrderForm order={order} clients={clients} />
    </div>
  );
}
