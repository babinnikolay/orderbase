"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import SaveButton from "@/app/_components/SaveButton";
import { saveOrderAction } from "@/app/_lib/actions";
import SelectClient from "@/app/_components/SelectClient";
import SingleDatePicker from "@/app/_components/SingleDatePicker";

function OrderForm({ order, clients }) {
  const [_, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      clientId: order?.client?.id || "",
      date: order?.date || new Date(),
      amount: order?.amount || 0,
      description: order?.description || "",
    },
  });

  if (!order) return;

  const onSubmit = (data) => {
    const newOrder = {
      client: { connect: { id: Number(data.clientId) } },
      date: new Date(data.date),
      amount: Number(data.amount),
      description: data.description.substring(0, 1000),
    };

    if (order.id) newOrder.id = Number(order.id);

    startTransition(async () => {
      await saveOrderAction(newOrder);
    });
  };

  const handleDateChange = (date) => {
    setValue("date", date, { shouldDirty: true });
  };

  const handleClientChange = (clientId) => {
    setValue("clientId", clientId, { shouldDirty: true });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-4 p-4 rounded-xl border border-primary-600 shadow-lg bg-primary-800 space-y-4"
      >
        <div className="flex flex-row gap-4">
          <SelectClient
            clients={clients}
            defaultId={order.client.id}
            onClientChange={handleClientChange}
          />
          {errors.clientId && (
            <p className="text-red-400 text-sm mt-1">
              {errors.clientId.message}
            </p>
          )}

          <div className="flex flex-col ">
            <SingleDatePicker
              date={watch("date")}
              onChangeDate={handleDateChange}
            />
          </div>
          {errors.date && (
            <p className="text-red-400 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        <div className="flex flex-row gap-4">
          <div className="w-64 py-2 space-y-2">
            <label htmlFor="order-amount" className="py-2">
              Amount
            </label>
            <input
              {...register("amount", {
                required: "Amount is required",
                min: { value: 0, message: "Amount must be positive" },
                valueAsNumber: true,
              })}
              type="number"
              id="order-amount"
              className="bg-primary-300 text-primary-800 w-full rounded-xl p-2"
            />
            {errors.amount && (
              <p className="text-red-400 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2 py-2">
          <label htmlFor="order-description">Description</label>
          <textarea
            {...register("description", {
              maxLength: {
                value: 1000,
                message: "Description must be less than 1000 characters",
              },
            })}
            rows="5"
            id="order-description"
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

        <input type="hidden" value={order.id} name="order-id" />

        <div className="flex justify-end">
          <SaveButton
            pendingLabel={"Saving..."}
            disabled={!isDirty || Object.keys(errors).length > 0}
          >
            {order.id
              ? isDirty
                ? "Save and close"
                : "Close"
              : "Create and close"}
          </SaveButton>
        </div>
      </form>
    </>
  );
}

export default OrderForm;
