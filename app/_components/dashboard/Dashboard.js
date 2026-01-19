import React from "react";
import SectionLabel from "@/app/_components/SectionLabel";
import NewItemButton from "@/app/_components/NewItemButton";
import SectionLine from "@/app/_components/SectionLine";
import { getSales } from "@/app/_lib/data-service-orders";
import WidgetSalesByClients from "@/app/_components/WidgetSalesByClients";
import WidgetSalesChart from "@/app/_components/WidgetSalesChart";

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
      <div className="flex flex-row gap-2 justify-start">
        <WidgetSalesByClients sales={sales} />
      </div>

      <div className="flex flex-row gap-2 justify-center">
        <WidgetSalesChart sales={sales} />
      </div>
    </div>
  );
}

export default Dashboard;
