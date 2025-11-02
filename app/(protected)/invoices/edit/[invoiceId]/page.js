import React from "react";
import SectionLabel from "@/app/_components/SectionLabel";
import SectionLine from "@/app/_components/SectionLine";
import { dateFormat } from "@/app/_helpers/appConstants";
import { format } from "date-fns";
import InvoiceForm from "@/app/_components/order/InvoiceForm";
import BackButton from "@/app/_components/BackButton";
import { getInvoice } from "@/app/_lib/data-service-invoices";
import { getClients } from "@/app/_lib/data-service-clients";

export const revalidate = 0;

export default async function Page({ params }) {
  const { invoiceId } = await params;
  const [invoice, clients] = await Promise.all([
    getInvoice(Number(invoiceId)),
    getClients(),
  ]);

  return (
    <div className="h-screen">
      <SectionLine>
        <SectionLabel>
          Edit invoice #{invoice?.id} from {format(invoice.date, dateFormat)}
        </SectionLabel>
        <BackButton href="/invoices" text="Invoices list" />
      </SectionLine>
      <InvoiceForm key={invoice.id} invoice={invoice} clients={clients} />
    </div>
  );
}
