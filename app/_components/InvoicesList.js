import React from "react";
import { getInvoices } from "@/app/_lib/data-service";
import Table from "@/app/_components/Table";
import TableHeader from "@/app/_components/TableHeader";
import TableRow from "@/app/_components/TableRow";
import { format } from "date-fns";
import { dateFormat } from "@/app/_helpers/appConstants";
import ListButtons from "@/app/_components/ListButtons";

export default async function InvoicesList() {
  const invoices = await getInvoices();
  return (
    <Table>
      <TableHeader>
        <div className="flex-none w-32">Date</div>
        <div className="flex-none w-60">Client</div>
        <div className="flex-none w-32">Total</div>
        <div className="flex-none w-20 text-center">Paid</div>
        <div className="flex-1">Description</div>
        <div className="flex-none w-32 text-center">Actions</div>
      </TableHeader>
      {invoices.map((invoice, index) => (
        <TableRow key={index}>
          <div className="flex-none w-32">
            {format(invoice.date, dateFormat)}
          </div>
          <div className="flex-none w-60">{invoice.client.name}</div>
          <div className="flex-none w-32">{invoice.total}</div>
          <div className="flex-none w-20 text-center items-center flex justify-center ">
            <div
              className={` border border-primary-700 rounded-md w-fit p-1 ${invoice.paid ? "bg-green-800" : "bg-accent-800"}`}
            >
              {invoice.paid ? "paid" : "unpaid"}
            </div>
          </div>
          <div className="flex-1">{invoice.description}</div>
          <ListButtons href={`/invoices/edit/${invoice.id}`} />
        </TableRow>
      ))}
    </Table>
  );
}
