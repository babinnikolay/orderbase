import { getOrders } from "@/app/_lib/data-service";
import TableHeader from "@/app/_components/TableHeader";
import { format } from "date-fns";
import { dateFormat } from "@/app/_helpers/appConstants";
import ListButtons from "@/app/_components/ListButtons";
import TableRow from "@/app/_components/TableRow";
import Table from "@/app/_components/Table";
import React from "react";
import EmptyList from "@/app/_components/EmptyList";

export default async function OrdersList() {
  const orders = await getOrders();

  return (
    <Table>
      <TableHeader>
        <div className="flex-none w-32">Date</div>
        <div className="flex-none w-60">Client</div>
        <div className="flex-none w-32">Amount</div>
        <div className="flex-1">Description</div>
        <div className="flex-none w-32 text-center">Actions</div>
      </TableHeader>

      {orders.length > 0 ? (
        orders.map((order, index) => (
          <TableRow key={index}>
            <div className="flex-none w-32">
              {format(order.date, dateFormat)}
            </div>
            <div className="flex-none w-60">{order.client.name}</div>
            <div className="flex-none w-32">{order.amount}</div>
            <div className="flex-1">{order.description}</div>
            <ListButtons
              href={`/orders/edit/${order.id}`}
              name="order"
              id={order.id}
            />
          </TableRow>
        ))
      ) : (
        <EmptyList name="orders" />
      )}
    </Table>
  );
}
