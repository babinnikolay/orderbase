import React from "react";
import SectionLabel from "@/app/_components/SectionLabel";
import NewItemButton from "@/app/_components/NewItemButton";
import SectionLine from "@/app/_components/SectionLine";
import SalesChart from "@/app/_components/dashboard/SalesChart";
import { getSales } from "@/app/_lib/data-service-orders";
import EmptyList from "@/app/_components/EmptyList";

async function Dashboard() {
  const sales = await getSales();

  return (
    <div>
      <SectionLine>
        <SectionLabel>Dashboard</SectionLabel>
        <div className="flex flex-row gap-2">
          <NewItemButton href={"/orders/new"} title={"New order"} />
          <NewItemButton href={"/invoices/new"} title={"New invoice"} />
        </div>
      </SectionLine>
      <div className="flex flex-row gap-2 justify-center">
        {sales.length > 0 ? (
          <SalesChart chartData={sales} />
        ) : (
          <div className="p-4 w-full">
            <EmptyList name="sales" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
