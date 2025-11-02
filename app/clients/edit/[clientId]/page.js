import React from "react";
import SectionLabel from "@/app/_components/SectionLabel";
import SectionLine from "@/app/_components/SectionLine";
import ClientForm from "@/app/_components/client/ClientForm";
import BackButton from "@/app/_components/BackButton";
import { getClient } from "@/app/_lib/data-service-clients";

export default async function Page({ params }) {
  const client = await getClient(Number(params.clientId));

  return (
    <div>
      <SectionLine>
        <SectionLabel>
          Edit client #{client?.id} {client?.name}
        </SectionLabel>
        <BackButton href="/clients" text="Clients list" />
      </SectionLine>
      <ClientForm client={client} />
    </div>
  );
}
