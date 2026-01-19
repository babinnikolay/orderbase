import React from "react";
import SectionLabel from "@/app/_components/SectionLabel";
import NewItemButton from "@/app/_components/NewItemButton";
import SectionLine from "@/app/_components/SectionLine";
import { getDashboardData } from "@/app/_lib/data-service-orders";
import WidgetSalesByClients from "@/app/_components/dashboard/WidgetSalesByClients";
import WidgetSalesChart from "@/app/_components/dashboard/WidgetSalesChart";

async function Dashboard() {
  const data = await getDashboardData();

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
        <WidgetSalesByClients data={data.summaryByClient} />
      </div>

      <div className="flex flex-row gap-2 justify-center">
        <WidgetSalesChart data={data.detailedByDateAndClient} />
      </div>
    </div>
  );
}

export default Dashboard;
