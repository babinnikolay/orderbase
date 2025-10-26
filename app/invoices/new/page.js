import React from "react";
import SectionLabel from "@/app/_components/SectionLabel";
import SectionLine from "@/app/_components/SectionLine";
import { getClients, getNewInvoice } from "@/app/_lib/data-service";
import InvoiceForm from "@/app/_components/InvoiceForm";
import BackButton from "@/app/_components/BackButton";
import InvoiceOrdersList from "@/app/_components/InvoiceOrdersList";

export default async function Page() {
  const [invoice, clients] = await Promise.all([getNewInvoice(), getClients()]);

  return (
    <div>
      <SectionLine>
        <SectionLabel>New invoice</SectionLabel>
        <BackButton text="Invoices list" href="/invoices" />
      </SectionLine>
      <InvoiceForm invoice={invoice} clients={clients}>
        <InvoiceOrdersList invoice={invoice} />
      </InvoiceForm>
    </div>
  );
}
