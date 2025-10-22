import React from "react";
import Link from "next/link";
import SectionLabel from "@/app/_components/SectionLabel";
import SectionLine from "@/app/_components/SectionLine";
import { getClients, getNewInvoice } from "@/app/_lib/data-service";
import InvoiceForm from "@/app/_components/InvoiceForm";

export default async function Page() {
  const [invoice, clients] = await Promise.all([getNewInvoice(), getClients()]);

  return (
    <div>
      <SectionLine>
        <SectionLabel>New invoice</SectionLabel>
        <Link
          className="p-1 rounded-md border border-primary-600 hover:bg-accent-800"
          href={"/invoices"}
        >
          &larr; Invoices list
        </Link>
      </SectionLine>
      <InvoiceForm invoice={invoice} clients={clients}>
        {/*<OrdersChoiceList invoice={invoice} />*/}
      </InvoiceForm>
    </div>
  );
}
