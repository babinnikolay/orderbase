import React from "react";
import SectionLabel from "@/app/_components/SectionLabel";
import SectionLine from "@/app/_components/SectionLine";
import { getNewClient } from "@/app/_lib/data-service";
import ClientForm from "@/app/_components/ClientForm";
import BackButton from "@/app/_components/BackButton";

export default async function Page() {
  const client = await getNewClient();

  return (
    <div>
      <SectionLine>
        <SectionLabel>New client</SectionLabel>
        <BackButton href="/clients" text="Clients list" />
      </SectionLine>
      <ClientForm client={client} />
    </div>
  );
}
