import React from "react";
import SectionLine from "@/app/_components/SectionLine";
import SectionLabel from "@/app/_components/SectionLabel";
import NewItemButton from "@/app/_components/NewItemButton";
import InvoicesList from "@/app/_components/InvoicesList";

function Invoices() {
  return (
    <div>
      <SectionLine>
        <SectionLabel>Invoices</SectionLabel>
        <NewItemButton href={"/invoices/new"} title={"New invoice"} />
      </SectionLine>
      <InvoicesList />
    </div>
  );
}

export default Invoices;
