import React from "react";
import Table from "@/app/_components/Table";
import TableHeader from "@/app/_components/TableHeader";
import TableRow from "@/app/_components/TableRow";
import EmptyList from "@/app/_components/EmptyList";

function WidgetSalesByClients({ sales }) {
  const salesByClients = new Map();

  sales.forEach((value) => {
    const clientKey = value.clientName;

    if (!salesByClients.has(clientKey)) {
      salesByClients.set(clientKey, {
        clientName: clientKey,
        sales: 0,
        payments: 0,
      });
    }

    const clientSummary = salesByClients.get(clientKey);
    clientSummary.sales += value.sales;
    clientSummary.payments += value.payments;
  });

  const clientSummary = Array.from(salesByClients.values()).sort((a, b) =>
    a.clientName.localeCompare(b.clientName),
  );

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
        {clientSummary.length > 0 ? (
          clientSummary.map((sale, index) => (
            <TableRow key={index}>
              <div className="flex-none w-60">{sale.clientName}</div>
              <div className="flex-none w-32">{sale.sales}</div>
              <div className="flex-none w-32">{sale.payments}</div>
              <div className="flex-none w-32">{sale.sales - sale.payments}</div>
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
