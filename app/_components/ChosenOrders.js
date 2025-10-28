"use client";

import OrderChip from "@/app/_components/OrderChip";
import React from "react";
import AddOrders from "@/app/_components/AddOrders";

function calcTotal(orders) {
  return orders.reduce((sum, order) => sum + order.amount, 0);
}

export default function ChosenOrders({ orders, total, setOrders, setTotal }) {
  function handleAddOrders(newOrders) {
    const uniqueOrders = [
      ...orders,
      ...newOrders.filter(
        (order) => !orders.some((existing) => existing.id === order.id),
      ),
    ];
    setOrders(uniqueOrders);
    setTotal(calcTotal(uniqueOrders));
  }

  return (
    <div>
      <div>
        <AddOrders chosenOrders={orders} addOrders={handleAddOrders} />
      </div>
      <div className="flex flex-wrap gap-2 p-2">
        {orders.map((order, index) => (
          <OrderChip key={index} order={order} />
        ))}
      </div>
      <div className="space-y-2 flex flex-row w-64">
        <label htmlFor="invoice-amount">Total amount: {total}</label>
      </div>
    </div>
  );
}
