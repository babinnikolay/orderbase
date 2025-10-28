"use client";
import React, { useState, useTransition } from "react";
import SaveButton from "@/app/_components/SaveButton";
import { saveOrderAction } from "@/app/_lib/actions";
import SelectClient from "@/app/_components/SelectClient";
import SingleDatePicker from "@/app/_components/SingleDatePicker";

function OrderForm({ order, clients }) {
  const [_, startTransition] = useTransition();
  const [date, setDate] = useState(order.date);

  if (!order) return;

  function handleSubmit(dataForm) {
    const newOrder = {
      client: { connect: { id: Number(dataForm.get("client-id")) } },
      date: new Date(date),
      amount: Number(dataForm.get("order-amount")),
      description: dataForm.get("order-description").split(0, 1000)[0],
    };
    const id = dataForm.get("order-id");
    if (id) newOrder.id = Number(id);

    startTransition(async () => {
      await saveOrderAction(newOrder);
    });
  }

  return (
    <>
      <form
        action={handleSubmit}
        className="mx-4 p-4 rounded-xl border border-primary-600 shadow-lg bg-primary-800 space-y-4"
      >
        <div className="flex flex-row gap-4">
          <SelectClient clients={clients} defaultId={order.client.id} />
          <div className="flex flex-col w-64">
            <SingleDatePicker date={date} onChangeDate={setDate} />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="w-64 py-2 space-y-2">
            <label htmlFor="order-amount" className="py-2">
              Amount
            </label>
            <input
              name="order-amount"
              type="number"
              id="order-amount"
              className="bg-primary-300 text-primary-800 w-full rounded-xl p-2"
              defaultValue={order.amount}
            />
          </div>
        </div>

        <div className="space-y-2 py-2">
          <label htmlFor="order-description">Description</label>
          <textarea
            name="order-description"
            rows="5"
            id="order-description"
            className="px-5 py-3 bg-primary-300 text-primary-800 w-full shadow-sm rounded-xl"
            defaultValue={order.description}
          />
        </div>
        <input type="hidden" value={order.id} name="order-id" />
        <div className="flex justify-end">
          <SaveButton pendingLabel={"Saving..."}>
            {order.id ? "Save and close" : "Create and close"}
          </SaveButton>
        </div>
      </form>
    </>
  );
}

export default OrderForm;
