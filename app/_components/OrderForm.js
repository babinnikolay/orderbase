"use client";
import { useTransition } from "react";
import SubmitButton from "@/app/_components/SubmitButton";
import { saveOrderAction } from "@/app/_lib/actions";

function OrderForm({ order, clients }) {
  const [isPending, startTransition] = useTransition();

  if (!order) return;

  function handleSubmit(dataForm) {
    const newOrder = {
      id: dataForm.get("order-id"),
      client: {
        id: dataForm.get("client-id"),
      },
      date: dataForm.get("order-date"),
      amount: dataForm.get("order-amount"),
      description: dataForm.get("order-description").split(0, 1000)[0],
    };
    startTransition(async () => {
      await saveOrderAction(newOrder);
    });
  }

  return (
    <>
      <form
        action={handleSubmit}
        className="m-4 p-4 rounded-xl border border-primary-600 shadow-lg bg-primary-800"
      >
        <div className="pb-2 flex flex-col">
          <label htmlFor="client-id" className="py-2">
            Client
          </label>
          <select
            name="client-id"
            id="client-id"
            className=" px-2 py-2 bg-primary-300 text-primary-800 w-1/2 shadow-sm rounded-xl"
            defaultValue={order.client.id}
          >
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-row gap-5 w-1/2">
          <div className="space-y-2">
            <label htmlFor="order-date">Date</label>
            <input
              name="order-date"
              type="date"
              id="order-date"
              className="px-5 py-3 bg-primary-300 text-primary-800 w-full shadow-sm rounded-xl"
              defaultValue={order.date}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="order-amount">Amount</label>
            <input
              name="order-amount"
              type="number"
              id="order-amount"
              className="px-5 py-3 bg-primary-300 text-primary-800 w-full shadow-sm rounded-xl"
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
        <div className="flex justify-end pt-3 gap-3">
          <SubmitButton pendingLabel={"Saving..."}>
            {order.id ? "Save and close" : "Create and close"}
          </SubmitButton>
        </div>
      </form>
    </>
  );
}

export default OrderForm;
