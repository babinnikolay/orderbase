import React from "react";
import SectionLine from "@/app/_components/SectionLine";
import SectionLabel from "@/app/_components/SectionLabel";
import NewItemButton from "@/app/_components/NewItemButton";
import InvoicesList from "@/app/_components/order/InvoicesList";

function Invoices({ searchParams }) {
  return (
    <div>
      <SectionLine>
        <SectionLabel>Invoices</SectionLabel>
        <NewItemButton href={"/invoices/new"} title={"New invoice"} />
      </SectionLine>
      <InvoicesList searchParams={searchParams} />
    </div>
  );
}

export default Invoices;
