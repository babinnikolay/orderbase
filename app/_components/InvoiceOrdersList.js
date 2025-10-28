"use client";

import ChosenOrders from "@/app/_components/ChosenOrders";

export default function InvoiceOrdersList({
  orders,
  total,
  setOrders,
  setTotal,
}) {
  return (
    <div className=" p-4 rounded-xl bg-primary-300 text-primary-800 ">
      <ChosenOrders
        total={total}
        orders={orders}
        setOrders={setOrders}
        setTotal={setTotal}
      />
    </div>
  );
}
