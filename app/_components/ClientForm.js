"use client";
import { useTransition } from "react";
import SaveButton from "@/app/_components/SaveButton";
import { saveClientAction } from "@/app/_lib/actions";

function ClientForm({ client }) {
  const [isPending, startTransition] = useTransition();

  if (!client) return;

  function handleSubmit(dataForm) {
    const newOrder = {
      id: dataForm.get("client-id"),
      name: dataForm.get("client-name"),
    };
    startTransition(async () => {
      await saveClientAction(newOrder);
    });
  }

  return (
    <>
      <form
        action={handleSubmit}
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
                name="client-name"
                type="text"
                id="cient-name"
                className="px-5 py-3 bg-primary-300 text-primary-800 w-full shadow-sm rounded-xl"
                defaultValue={client.name}
              />
            </div>
          </div>
          <input type="hidden" value={client.id} name="order-id" />
          <div className="flex justify-end pt-3 gap-3">
            <SaveButton pendingLabel={"Saving..."}>
              {client.id ? "Save and close" : "Create and close"}
            </SaveButton>
          </div>
        </div>
      </form>
    </>
  );
}

export default ClientForm;
