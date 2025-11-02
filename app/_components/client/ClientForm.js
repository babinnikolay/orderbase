"use client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import SaveButton from "@/app/_components/SaveButton";
import { saveClientAction } from "@/app/_lib/actions";

function ClientForm({ client }) {
  const [_, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      clientName: client?.name || "",
    },
  });

  if (!client) return;

  function handleFormSubmit(data) {
    const newOrder = {
      id: client.id,
      name: data.clientName,
    };
    startTransition(async () => {
      await saveClientAction(newOrder);
    });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="m-4 p-4 rounded-xl border border-primary-600 shadow-lg bg-primary-800"
      >
        <div className="pb-2 flex flex-col">
          <div className="flex flex-row gap-5 w-1/2">
            <div className="space-y-2">
              <input
                name="client-id"
                type="text"
                disabled
                hidden
                id="client-id"
                className="px-5 py-3 bg-primary-300 text-primary-800 w-full shadow-sm rounded-xl"
                defaultValue={client.id}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="client-name">Name</label>
              <input
                {...register("clientName", {
                  required: "Client name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                type="text"
                id="client-name"
                className="px-5 py-3 bg-primary-300 text-primary-800 w-full shadow-sm rounded-xl"
              />
              {errors.clientName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.clientName.message}
                </p>
              )}
            </div>
          </div>
          <input type="hidden" value={client.id} name="order-id" />

          <div className="flex justify-end pt-3 gap-3">
            <SaveButton
              pendingLabel={"Saving..."}
              disabled={!isDirty || Object.keys(errors).length > 0}
            >
              {client.id
                ? isDirty
                  ? "Save and close"
                  : "Close"
                : "Create and close"}
            </SaveButton>
          </div>
        </div>
      </form>
    </>
  );
}

export default ClientForm;
