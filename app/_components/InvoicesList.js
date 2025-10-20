import React from "react";
import Table from "@/app/_components/Table";
import { getInvoices } from "@/app/_lib/data-service";
import InvoiceRow from "@/app/_components/InvoiceRow";

export default async function InvoicesList() {
  const invoices = await getInvoices();
  const head = ["Date", "Client", "Total", "Status", "Description", "Actions"];
  const foot = { amount: "1250$" };
  const gridCols = "[100px_1fr_100px_100px_1fr_100px]";
  return (
    <div className="m-4 p-4 rounded-xl border border-primary-600 shadow-lg bg-primary-800 gap-0">
      <Table head={head} foot={foot} gridCols={gridCols}>
        {invoices.map((invoice, index) => (
          <InvoiceRow key={index} invoice={invoice} gridCols={gridCols} />
        ))}
      </Table>
    </div>
  );
}
