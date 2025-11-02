import React from "react";
import OrderForm from "@/app/_components/order/OrderForm";
import SectionLabel from "@/app/_components/SectionLabel";
import SectionLine from "@/app/_components/SectionLine";
import { dateFormat } from "@/app/_helpers/appConstants";
import { format } from "date-fns";
import BackButton from "@/app/_components/BackButton";
import { getOrder } from "@/app/_lib/data-service-orders";
import { getClients } from "@/app/_lib/data-service-clients";

export const revalidate = 0;

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
