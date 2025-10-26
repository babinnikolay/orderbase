"use client";

import OrderChip from "@/app/_components/OrderChip";
import React, { useState } from "react";
import AddOrders from "@/app/_components/AddOrders";

function calcTotal(orders) {
  return orders.reduce((sum, order) => sum + order.amount, 0);
}

export default function ChosenOrders({ orders }) {
  const [chosenOrders, setChosenOrders] = useState(orders);
  const [total, setTotal] = useState(calcTotal(orders));

  function handleAddOrders(newOrders) {
    const uniqueOrders = [
      ...chosenOrders,
      ...newOrders.filter(
        (order) => !chosenOrders.some((existing) => existing.id === order.id),
      ),
    ];
    setChosenOrders(uniqueOrders);
    setTotal(calcTotal(uniqueOrders));
    console.log(uniqueOrders);
  }

  return (
    <div>
      <div>
        <AddOrders chosenOrders={chosenOrders} addOrders={handleAddOrders} />
      </div>
      <div className="flex flex-wrap gap-2 p-2">
        {chosenOrders.map((order, index) => (
          <OrderChip key={index} order={order} />
        ))}
      </div>
      <div className="space-y-2 flex flex-row w-64">
        <label htmlFor="invoice-amount">Total amount: {total}</label>
      </div>
    </div>
  );
}
