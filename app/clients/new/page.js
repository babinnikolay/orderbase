import React from "react";
import Link from "next/link";
import SectionLabel from "@/app/_components/SectionLabel";
import SectionLine from "@/app/_components/SectionLine";
import { getNewClient } from "@/app/_lib/data-service";
import ClientForm from "@/app/_components/ClientForm";

export default async function Page() {
  const client = await getNewClient();

  return (
    <div>
      <SectionLine>
        <SectionLabel>New client</SectionLabel>
        <Link
          className="p-1 rounded-md border border-primary-600 hover:bg-accent-800"
          href={"/clients"}
        >
          &larr; Orders list
        </Link>
      </SectionLine>
      <ClientForm client={client} />
    </div>
  );
}
