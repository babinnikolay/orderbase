"use client";

import OrderChip from "@/app/_components/OrderChip";
import React from "react";
import AddOrders from "@/app/_components/AddOrders";

function calcTotal(orders) {
  return orders.reduce((sum, order) => sum + order.amount, 0);
}

export default function ChosenOrders({
  orders,
  total,
  setOrders,
  setTotal,
  clientId,
}) {
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

  function handleRemoveOrder(id) {
    const filtered = orders.filter((order) => order.id !== id);
    setOrders(filtered);
    setTotal(calcTotal(filtered));
  }

  return (
    <div className="flex flex-col space-y-2">
      <div>
        <AddOrders
          chosenOrders={orders}
          onAddOrders={handleAddOrders}
          clientId={clientId}
        />
      </div>
      <div className="flex flex-wrap gap-2 p-2">
        {orders.map((order, index) => (
          <OrderChip
            key={index}
            order={order}
            deletable={true}
            onDelete={handleRemoveOrder}
          />
        ))}
      </div>
      <div className="space-y-2 flex w-full justify-end">
        <label className="font-bold" htmlFor="invoice-amount">
          Total amount: {total}
        </label>
      </div>
    </div>
  );
}
