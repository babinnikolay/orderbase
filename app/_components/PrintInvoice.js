import React from "react";
import ClosePrintButton from "@/app/_components/ClosePrintButton";
import ToPrintButton from "@/app/_components/ToPrintButton";
import { format } from "date-fns";
import { dateFormat } from "@/app/_helpers/appConstants";
import TableHeader from "@/app/_components/TableHeader";
import TableRow from "@/app/_components/TableRow";
import Table from "@/app/_components/Table";

const PrintInvoice = ({ invoice, onClose }) => {
  function handlePrint() {
    window.print();
  }

  return (
    <>
      <div className="print:hidden">
        <div className="m-4 p-4 rounded-xl border border-primary-600 shadow-lg bg-primary-800 space-y-4 ">
          <div className="flex flex-row gap-2 ">
            <ClosePrintButton onClick={onClose} />
            <ToPrintButton onClick={handlePrint} />
          </div>
        </div>
      </div>
      <div className="m-4 p-4 rounded-xl border border-primary-600 shadow-lg bg-primary-800 space-y-4 print:flex print:bg-white">
        <div className="py-4 bg-primary-800 print-content print:bg-white print:flex-1">
          <div className="border-b-2 print:border-black p-4">
            <h1 className="text-xl font-bold print:text-black">
              Invoice #{invoice.id} from {format(invoice.date, dateFormat)}
            </h1>
          </div>

          <div className="p-4">
            <h2 className="text-xl font-semibold mb-3 print:text-black">
              Client: {invoice.client.name}
            </h2>
          </div>

          <Table>
            <TableHeader>
              <div className="flex-none w-32">Date</div>
              <div className="flex-1">Description</div>
              <div className="flex-none w-32">Amount</div>
            </TableHeader>

            {invoice.orders.map((order, index) => (
              <TableRow key={index}>
                <div className="flex-none w-32">
                  {format(order.date, dateFormat)}
                </div>
                <div className="flex-1">{order.description}</div>
                <div className="flex-none w-32">{order.amount}</div>
              </TableRow>
            ))}
          </Table>

          <div className="flex justify-end p-4">
            <div className="text-right">
              <p className="text-2xl font-bold print:text-black p-4">
                Total: {invoice.total}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintInvoice;
