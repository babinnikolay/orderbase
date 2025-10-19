import React from "react";
import { getClients } from "@/app/_lib/data-service";
import Table from "@/app/_components/Table";
import ClientRow from "@/app/_components/ClientRow";

export default async function ClientsList({ children }) {
  const clients = await getClients();
  const head = ["ID", "Name", "Actions"];
  return (
    <Table head={head}>
      {clients.map((client, index) => (
        <ClientRow key={index} client={client} />
      ))}
    </Table>
  );
}
