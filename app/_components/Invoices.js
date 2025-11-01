import React from "react";
import SectionLine from "@/app/_components/SectionLine";
import SectionLabel from "@/app/_components/SectionLabel";
import NewItemButton from "@/app/_components/NewItemButton";
import InvoicesList from "@/app/_components/InvoicesList";

function Invoices({ searchParams }) {
  return (
    <>
      <SectionLine>
        <SectionLabel>Invoices</SectionLabel>
        <NewItemButton href={"/invoices/new"} title={"New invoice"} />
      </SectionLine>
      <InvoicesList searchParams={searchParams} />
    </>
  );
}

export default Invoices;
