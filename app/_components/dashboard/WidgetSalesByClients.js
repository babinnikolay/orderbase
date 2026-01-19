import React from "react";
import Table from "@/app/_components/Table";
import TableHeader from "@/app/_components/TableHeader";
import TableRow from "@/app/_components/TableRow";
import EmptyList from "@/app/_components/EmptyList";

function WidgetSalesByClients({ data }) {
  return (
    <div className="flex flex-col items-left justify-center">
      <p className="pl-6 pb-2 text-xl">Sales by clients for the last 90 days</p>
      <Table>
        <TableHeader>
          <div className="flex-none w-60">Client</div>
          <div className="flex-none w-32">Sales</div>
          <div className="flex-none w-32">Payment</div>
          <div className="flex-none w-32">Debt</div>
        </TableHeader>
        {data.length > 0 ? (
          data.map((sale, index) => (
            <TableRow key={index}>
              <div className="flex-none w-60">{sale.clientName}</div>
              <div className="flex-none w-32">{sale.totalSales}</div>
              <div className="flex-none w-32">{sale.totalPayments}</div>
              <div className="flex-none w-32">{sale.debt}</div>
            </TableRow>
          ))
        ) : (
          <EmptyList name="unpaid sales" />
        )}
      </Table>
    </div>
  );
}

export default WidgetSalesByClients;
