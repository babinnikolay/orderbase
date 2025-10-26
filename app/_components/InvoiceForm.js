"use client";
import React, { useState, useTransition } from "react";
import SaveButton from "@/app/_components/SaveButton";
import { saveInvoiceAction } from "@/app/_lib/actions";
import SelectClient from "@/app/_components/SelectClient";
import SingleDatePicker from "@/app/_components/SingleDatePicker";
import SetPaidButton from "@/app/_components/SetPaidButton";

function InvoiceForm({ invoice, clients, children }) {
  const [isPending, startTransition] = useTransition();
  const [date, setDate] = useState(invoice.date);
  const [paid, setPaid] = useState(invoice.paid);

  if (!invoice) return;

  function handleSubmit(dataForm) {
    const newInvoice = {
      id: dataForm.get("invoice-id"),
      client: {
        id: dataForm.get("client-id"),
      },
      date: dataForm.get("invoice-date"),
      total: dataForm.get("invoice-total"),
      description: dataForm.get("invoice-description").split(0, 1000)[0],
      paid: dataForm.get("invoice-paid"),
      orders: [],
    };
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
          <SelectClient clients={clients} defaultId={invoice.client.id} />
          <div className="flex flex-col w-40">
            <SingleDatePicker date={date} onChangeDate={setDate} />
          </div>
          <div className="flex flex-col h-[82px]">
            <SetPaidButton paid={paid} onClick={() => setPaid(!paid)} />
          </div>
        </div>

        <div>
          <label>Orders</label>
          <div className="space-y-2 py-2">{children}</div>
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
