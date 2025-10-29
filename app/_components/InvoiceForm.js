"use client";
import React, { useState, useTransition } from "react";
import SaveButton from "@/app/_components/SaveButton";
import SelectClient from "@/app/_components/SelectClient";
import SingleDatePicker from "@/app/_components/SingleDatePicker";
import SetPaidButton from "@/app/_components/SetPaidButton";
import InvoiceOrdersList from "@/app/_components/InvoiceOrdersList";
import { saveInvoiceAction } from "@/app/_lib/actions";
import { useFormState } from "@/app/hooks/useFormState";

function InvoiceForm({ invoice, clients }) {
  const [_, startTransition] = useTransition();
  const [date, setDate] = useState(invoice.date);
  const [paid, setPaid] = useState(invoice.paid);
  const [orders, setOrders] = useState(invoice.orders);
  const [total, setTotal] = useState(invoice.total);
  const [clientId, setClientId] = useState(invoice.client.id);
  const { formData, isDirty, updateField, reset } = useFormState(invoice);

  if (!invoice) return;

  function handleSubmit(dataForm) {
    const newInvoice = {
      client: {
        id: Number(dataForm.get("client-id")),
      },
      date: new Date(date).toISOString(),
      total: Number(total),
      description: dataForm.get("invoice-description").split(0, 1000)[0],
      paid: Boolean(paid),
      orders: [...orders.map((order) => ({ id: order.id }))],
    };
    const id = dataForm.get("invoice-id");
    if (id) newInvoice.id = Number(id);

    startTransition(async () => {
      await saveInvoiceAction(newInvoice);
    });
  }

  return (
    <>
      <form
        action={handleSubmit}
        className="m-4 p-4 rounded-xl border border-primary-600 shadow-lg bg-primary-800 space-y-4"
      >
        <div className="flex flex-row gap-4">
          <SelectClient
            clients={clients}
            defaultId={invoice.client.id}
            setClientId={setClientId}
          />
          <div className="flex flex-col w-40">
            <SingleDatePicker date={date} onChangeDate={setDate} />
          </div>
          <div className="flex flex-col h-[82px]">
            <SetPaidButton paid={paid} onClick={() => setPaid(!paid)} />
          </div>
        </div>

        <div>
          <label>Orders</label>
          <div className="space-y-2 py-2">
            <InvoiceOrdersList
              orders={orders}
              total={total}
              setOrders={setOrders}
              setTotal={setTotal}
              clientId={clientId}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="invoice-description">Description</label>
          <textarea
            name="invoice-description"
            rows="5"
            id="invoice-description"
            className="px-5 py-3 bg-primary-300 text-primary-800 w-full shadow-sm rounded-xl"
            defaultValue={invoice.description}
          />
        </div>

        <input type="hidden" value={invoice.id} name="invoice-id" />
        <div className="flex justify-end pt-3 gap-3 items-center ">
          <SaveButton pendingLabel={"Saving..."}>
            {invoice.id ? "Save and close" : "Create and close"}
          </SaveButton>
        </div>
      </form>
    </>
  );
}

export default InvoiceForm;
