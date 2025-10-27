import React from "react";
import * as appConstants from "@/app/_helpers/appConstants";
import SectionLine from "@/app/_components/SectionLine";
import SectionLabel from "@/app/_components/SectionLabel";
import NewItemButton from "@/app/_components/NewItemButton";
import Table from "@/app/_components/Table";
import TableHeader from "@/app/_components/TableHeader";
import TableRow from "@/app/_components/TableRow";
import ListButtons from "@/app/_components/ListButtons";

export async function generateMetadata() {
  return {
    title: `Clients ${appConstants.TITLE_SEPARATOR} ${appConstants.APP_NAME}`,
  };
}

export default async function Page({ children }) {
  //return <Clients />;
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();
  let clients = [];
  try {
    clients = await prisma.client.findMany();
  } catch (err) {
    console.error(err);
  }

  console.log(clients);

  return (
    <div>
      <SectionLine>
        <SectionLabel>Clients</SectionLabel>
        <NewItemButton href={"/clients/new"} title={"New client"} />
      </SectionLine>

      <Table>
        <TableHeader>
          <div className="flex-1">Client name</div>
          <div className="flex-none w-32 text-center">Actions</div>
        </TableHeader>
        {clients.map((client, index) => (
          <TableRow key={index}>
            <div className="flex-1">{client.name}</div>
            <ListButtons href={`/clients/edit/${client.id}`} />
          </TableRow>
        ))}
      </Table>

      {/*<Suspense fallback={<div>Loading clients...</div>}>*/}
      {/*  <ClientsList />*/}
      {/*</Suspense>*/}
    </div>
  );
}
