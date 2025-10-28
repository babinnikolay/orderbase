import React from "react";
import Table from "@/app/_components/Table";
import TableHeader from "@/app/_components/TableHeader";
import TableRow from "@/app/_components/TableRow";
import ListButtons from "@/app/_components/ListButtons";
import { getClients } from "@/app/_lib/data-service";
import EmptyList from "@/app/_components/EmptyList";

export default async function ClientsList() {
  const clients = await getClients();

  return (
    <Table>
      <TableHeader>
        <div className="flex-1">Client name</div>
        <div className="flex-none w-32 text-center">Actions</div>
      </TableHeader>

      {clients.length > 0 ? (
        clients.map((client, index) => (
          <TableRow key={index}>
            <div className="flex-1">{client.name}</div>
            <ListButtons
              href={`/clients/edit/${client.id}`}
              id={client.id}
              name="client"
            />
          </TableRow>
        ))
      ) : (
        <EmptyList name="clients" />
      )}
    </Table>
  );
}
