import React, { Suspense } from "react";
import SectionLine from "@/app/_components/SectionLine";
import SectionLabel from "@/app/_components/SectionLabel";
import NewItemButton from "@/app/_components/NewItemButton";
import ClientsList from "@/app/_components/ClientsList";

export default async function Clients() {
  return (
    <div>
      <SectionLine>
        <SectionLabel>Clients</SectionLabel>
        <NewItemButton href={"/clients/new"} title={"New client"} />
      </SectionLine>

      <Suspense fallback={<div>Loading clients...</div>}>
        <ClientsList />
      </Suspense>
    </div>
  );
}
