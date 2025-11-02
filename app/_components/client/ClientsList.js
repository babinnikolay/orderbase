import React from "react";
import Table from "@/app/_components/Table";
import TableHeader from "@/app/_components/TableHeader";
import TableRow from "@/app/_components/TableRow";
import ListButtons from "@/app/_components/ListButtons";
import EmptyList from "@/app/_components/EmptyList";
import { ITEMS_PER_PAGE } from "@/app/_helpers/appConstants";
import PaginationBlock from "@/app/_components/PaginationBlock";
import { getClients } from "@/app/_lib/data-service-clients";

export default async function ClientsList({ searchParams }) {
  const currentPage = parseInt(searchParams?.page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const { clients, totalCount } = await getClients(skip, ITEMS_PER_PAGE);
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div>
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

      <PaginationBlock
        totalPages={totalPages}
        totalCount={totalCount}
        currentPage={currentPage}
        skip={skip}
      />
    </div>
  );
}
