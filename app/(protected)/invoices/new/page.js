import React from "react";
import SectionLabel from "@/app/_components/SectionLabel";
import SectionLine from "@/app/_components/SectionLine";
import InvoiceForm from "@/app/_components/order/InvoiceForm";
import BackButton from "@/app/_components/BackButton";
import { getNewInvoice } from "@/app/_lib/data-service-invoices";
import { getClients } from "@/app/_lib/data-service-clients";

export const revalidate = 0;

export default async function Page() {
  const [invoice, clients] = await Promise.all([getNewInvoice(), getClients()]);

  return (
    <div>
      <SectionLine>
        <SectionLabel>New invoice</SectionLabel>
        <BackButton text="Invoices list" href="/invoices" />
      </SectionLine>
      <InvoiceForm invoice={invoice} clients={clients} />
    </div>
  );
}
