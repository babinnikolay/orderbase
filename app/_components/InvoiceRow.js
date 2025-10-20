import Button from "@/app/_components/Button";
import ListButtons from "@/app/_components/ListButtons";
import Link from "next/link";
import { format } from "date-fns";
import { dateFormat } from "@/app/_helpers/appConstants";

export default function InvoiceRow({ invoice, gridCols }) {
  return (
    <div
      className={`py-2 grid grid-cols-${gridCols} hover:bg-primary-700 border-b border-primary-700 items-center`}
    >
      <div>{format(invoice.date, dateFormat)}</div>
      <div>{invoice.client.name}</div>
      <div>${invoice.total}</div>
      <div className="items-center justify-center">
        <div
          className={` border-none border-primary-700 p-1 rounded-md w-fit ${invoice.paid ? "bg-green-900" : "bg-accent-800"}`}
        >
          {invoice.paid ? "Paid" : "Unpaid"}
        </div>
      </div>
      <div>{invoice.description}</div>
      <div>
        <ListButtons>
          <Link
            href={`/invoices/edit/${invoice.id}`}
            className="p-1 px-2 rounded-md border border-primary-600 hover:bg-accent-800"
          >
            Edit
          </Link>
          <Button additional={"text-amber-600"}>Delete</Button>
        </ListButtons>
      </div>
    </div>
  );
}
