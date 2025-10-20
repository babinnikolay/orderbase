"use client";
import { useTransition } from "react";
import SubmitButton from "@/app/_components/SubmitButton";
import { saveInvoiceAction } from "@/app/_lib/actions";

function InvoiceForm({ invoice, clients, children }) {
  const [isPending, startTransition] = useTransition();

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
            defaultValue={invoice.client.id}
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
            <label htmlFor="invoice-date">Date</label>
            <input
              name="invoice-date"
              type="date"
              id="invoice-date"
              className="px-5 py-3 bg-primary-300 text-primary-800 w-full shadow-sm rounded-xl"
              defaultValue={invoice.date}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="invoice-amount">Total</label>
            <input
              name="invoice-total"
              type="number"
              readOnly
              id="invoice-total"
              className="px-5 py-3 bg-primary-300 text-primary-800 w-full shadow-sm rounded-xl"
              defaultValue={invoice.total}
            />
          </div>
          <div className="flex gap-4 pt-7 pl-3 items-center">
            <input
              name="invoice-paid"
              type="checkbox"
              id="invoice-paid"
              className="w-4 h-4 transform scale-150"
              defaultValue={invoice.paid}
            />
            <label htmlFor="invoice-paid">Paid</label>
          </div>
        </div>
        <div className="space-y-2 py-2">{children}</div>
        <div className="space-y-2 py-2">
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
        <div className="flex justify-end pt-3 gap-3">
          <SubmitButton pendingLabel={"Saving..."}>
            {invoice.id ? "Save and close" : "Create and close"}
          </SubmitButton>
        </div>
      </form>
    </>
  );
}

export default InvoiceForm;
