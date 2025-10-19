import React from "react";
import Link from "next/link";
import SectionLabel from "@/app/_components/SectionLabel";
import SectionLine from "@/app/_components/SectionLine";
import ClientForm from "@/app/_components/ClientForm";
import { getClient } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const client = await getClient(params.clientId);

  return (
    <div>
      <SectionLine>
        <SectionLabel>
          Edit client #{client?.id} {client?.name}
        </SectionLabel>
        <Link
          className="p-1 rounded-md border border-primary-600 hover:bg-accent-800"
          href={"/clients"}
        >
          &larr; Clients list
        </Link>
      </SectionLine>
      <ClientForm client={client} />
    </div>
  );
}
