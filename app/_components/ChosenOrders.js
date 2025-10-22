"use client";

import OrderChip from "@/app/_components/OrderChip";
import React, { useState } from "react";
import AddOrders from "@/app/_components/AddOrders";

export default function ChosenOrders({ orders }) {
  const [chosenOrders, setChosenOrders] = useState(orders);

  return (
    <div>
      <div>
        <div className=" text-xl">Orders</div>
        <AddOrders
          chosenOrders={chosenOrders}
          setChosenOrders={setChosenOrders}
        />
      </div>
      <div className="flex flex-wrap gap-2 p-2">
        {chosenOrders.map((order, index) => (
          <OrderChip key={index} order={order} />
        ))}
      </div>
    </div>
  );
}
