"use client";
import React, { useEffect, useState, useTransition } from "react";
import SaveButton from "@/app/_components/SaveButton";
import SelectClient from "@/app/_components/SelectClient";
import SetPaidButton from "@/app/_components/SetPaidButton";
import InvoiceOrdersList from "@/app/_components/order/InvoiceOrdersList";
import SingleDatePicker from "@/app/_components/SingleDatePicker";
import PrintInvoice from "@/app/_components/PrintInvoice";
import { Printer } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { saveInvoiceAction } from "@/app/_lib/actions";

function InvoiceForm({ invoice, clients }) {
  const [_, startTransition] = useTransition();
  const [orders, setOrders] = useState(invoice.orders);
  const [total, setTotal] = useState(invoice.total);
  const router = useRouter();
  const [printForm, setPrintForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      clientId: invoice?.client?.id || "",
      date: invoice?.date || new Date(),
      paid: invoice?.paid || false,
      description: invoice?.description || "",
    },
    shouldUnregister: false,
  });

  useEffect(() => {
    if (invoice) {
      reset({
        clientId: invoice.client.id,
        date: invoice.date,
        paid: invoice.paid,
        description: invoice.description || "",
      });
      setOrders(invoice.orders);
      setTotal(invoice.total);
    }
  }, [invoice, reset]);

  useEffect(() => {
    if (orders.length !== invoice.orders.length || total !== invoice.total) {
      setValue("ordersChanged", true, { shouldDirty: true });
    }
  }, [orders, total, invoice.orders, invoice.total, setValue]);

  if (!invoice) return;

  const handleDateChange = (date) => {
    setValue("date", date, { shouldDirty: true });
  };

  const handleClientChange = (clientId) => {
    setValue("clientId", clientId, { shouldDirty: true });
  };

  const handlePaidChange = (paidStatus) => {
    setValue("paid", paidStatus, { shouldDirty: true });
  };

  const onSubmit = (data) => {
    if (isDirty) {
      const newInvoice = {
        client: {
          id: Number(data.clientId),
        },
        date: new Date(data.date).toISOString(),
        total: Number(total),
        description: data.description.substring(0, 1000),
        paid: Boolean(data.paid),
        orders: [...orders.map((order) => ({ id: order.id }))],
      };

      const id = invoice.id;
      if (id) newInvoice.id = Number(id);

      startTransition(async () => {
        await saveInvoiceAction(newInvoice);
      });
    } else {
      router.push("/invoices");
    }
  };

  if (printForm) {
    return (
      <PrintInvoice invoice={invoice} onClose={() => setPrintForm(false)} />
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-4 p-4 rounded-xl border border-primary-600 shadow-lg bg-primary-800 space-y-4"
    >
      <div className="flex flex-row gap-4">
        <SelectClient
          clients={clients}
          defaultId={invoice.client.id}
          onClientChange={handleClientChange}
          disabled={orders.length > 0}
        />
        {errors.clientId && (
          <p className="text-red-400 text-sm mt-1">{errors.clientId.message}</p>
        )}

        <div className="flex flex-col w-40">
          <SingleDatePicker
            date={watch("date") ? watch("date") : invoice.date}
            onChangeDate={handleDateChange}
          />
        </div>

        <div className="flex flex-col h-[82px]">
          <SetPaidButton
            paid={watch("paid")}
            onClick={() => handlePaidChange(!watch("paid"))}
          />
        </div>

        {orders.length > 0 && invoice.id && (
          <div className="flex flex-col h-[82px]">
            <div className="h-54 mt-auto flex p-2 px-2 rounded-xl border border-primary-600 hover:bg-primary-500 gap-2">
              <Printer />
              <button onClick={() => setPrintForm(true)}>Print preview</button>
            </div>
          </div>
        )}
      </div>

      <div>
        <label>Orders</label>
        <div className="space-y-2 py-2">
          <InvoiceOrdersList
            orders={orders}
            total={total}
            setOrders={setOrders}
            setTotal={setTotal}
            clientId={watch("clientId") ? watch("clientId") : invoice.client.id}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="invoice-description">Description</label>
        <textarea
          {...register("description", {
            maxLength: {
              value: 1000,
              message: "Description must be less than 1000 characters",
            },
          })}
          rows="5"
          id="invoice-description"
          className="px-5 py-3 bg-primary-300 text-primary-800 w-full shadow-sm rounded-xl"
        />
        {errors.description && (
          <p className="text-red-400 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
        <div className="text-sm text-gray-400">
          {watch("description")?.length || 0}/1000 characters
        </div>
      </div>

      <input type="hidden" {...register("ordersChanged")} />
      <input type="hidden" value={invoice.id} name="invoice-id" />

      <div className="flex justify-end pt-3 gap-3 items-center">
        <SaveButton
          pendingLabel={"Saving..."}
          disabled={!isDirty || Object.keys(errors).length > 0}
        >
          {invoice.id
            ? isDirty
              ? "Save and close"
              : "Close"
            : "Create and close"}
        </SaveButton>
      </div>
    </form>
  );
}

export default InvoiceForm;
