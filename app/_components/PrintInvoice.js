// components/InvoicePrint.jsx
import React, { useRef } from "react";
import ClosePrintButton from "@/app/_components/ClosePrintButton";
import ToPrintButton from "@/app/_components/ToPrintButton";
import { format } from "date-fns";
import { dateFormat } from "@/app/_helpers/appConstants";
import TableHeader from "@/app/_components/TableHeader";
import TableRow from "@/app/_components/TableRow";
import Table from "@/app/_components/Table";

const PrintInvoice = ({ invoice, onClose }) => {
  const printContentRef = useRef();

  const handlePrint = () => {
    const originalBodyStyle = document.body.style.cssText;

    document.body.style.cssText = `
      visibility: hidden !important;
      margin: 0 !important;
      padding: 0 !important;
    `;

    if (printContentRef.current) {
      printContentRef.current.style.cssText = `
        visibility: visible !important;
        position: absolute !important;
        left: 0 !important;
        top: 0 !important;
        width: 100% !important;
        height: auto !important;
        margin: 0 !important;
        padding: 20px !important;
        background: white !important;
      `;
    }

    window.print();

    setTimeout(() => {
      document.body.style.cssText = originalBodyStyle;
      if (printContentRef.current) {
        printContentRef.current.style.cssText = "";
      }
    }, 100);
  };

  return (
    <div className="m-4 p-4 rounded-xl border border-primary-600 shadow-lg bg-primary-800 space-y-4">
      <div className="flex flex-row gap-2">
        <ClosePrintButton onClick={onClose} />
        <ToPrintButton onClick={handlePrint} />
      </div>
      <div className="py-4 bg-gray-100 min-h-screen" ref={printContentRef}>
        <div className="border-b-2 border-black p-4">
          <h1 className="text-xl font-bold text-black">
            Invoice #{invoice.id} from {format(invoice.date, dateFormat)}
          </h1>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-3 text-black">
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
            <p className="text-2xl font-bold text-black p-4">
              Total: {invoice.total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintInvoice;
