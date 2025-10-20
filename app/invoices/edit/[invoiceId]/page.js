import React from "react";
import Link from "next/link";
import SectionLabel from "@/app/_components/SectionLabel";
import SectionLine from "@/app/_components/SectionLine";
import { getClients, getInvoice } from "@/app/_lib/data-service";
import { dateFormat } from "@/app/_helpers/appConstants";
import { format } from "date-fns";
import InvoiceForm from "@/app/_components/InvoiceForm";
import OrdersChoiceList from "@/app/_components/OrdersChoiceList";

export default async function Page({ params }) {
  const [invoice, clients] = await Promise.all([
    getInvoice(params.invoiceId),
    getClients(),
  ]);

  return (
    <div>
      <SectionLine>
        <SectionLabel>
          Edit invoice #{invoice?.id} from {format(invoice.date, dateFormat)}
        </SectionLabel>
        <Link
          className="p-1 rounded-md border border-primary-600 hover:bg-accent-800"
          href={"/invoices"}
        >
          &larr; Invoices list
        </Link>
      </SectionLine>
      <InvoiceForm invoice={invoice} clients={clients}>
        <OrdersChoiceList />
      </InvoiceForm>
    </div>
  );
}
