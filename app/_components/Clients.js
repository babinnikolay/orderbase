import React from "react";
import SectionLine from "@/app/_components/SectionLine";
import SectionLabel from "@/app/_components/SectionLabel";
import ClientsList from "@/app/_components/ClientsList";
import NewClient from "@/app/_components/NewClient";

export default function Clients({ children }) {
  return (
    <div>
      <SectionLine>
        <SectionLabel>Clients</SectionLabel>
        <NewClient />
      </SectionLine>
      <ClientsList />
    </div>
  );
}
