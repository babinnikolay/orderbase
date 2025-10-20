import React from "react";
import { getClients } from "@/app/_lib/data-service";
import Table from "@/app/_components/Table";
import ClientRow from "@/app/_components/ClientRow";

export default async function ClientsList({ children }) {
  const clients = await getClients();
  const head = ["Name", "Actions"];
  const gridCols = "[10fr_1fr]";

  return (
    <div className="m-4 px-4 py-2 rounded-xl border border-primary-600 shadow-lg bg-primary-800">
      <Table head={head} gridCols={gridCols}>
        {clients.map((client, index) => (
          <ClientRow key={index} client={client} gridCols={gridCols} />
        ))}
      </Table>
    </div>
  );
}
