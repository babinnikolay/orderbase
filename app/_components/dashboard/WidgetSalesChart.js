import React from "react";
import SalesChart from "@/app/_components/dashboard/SalesChart";
import EmptyList from "@/app/_components/EmptyList";

function WidgetSalesChart({ sales }) {
  return sales.length > 0 ? (
    <SalesChart chartData={sales} />
  ) : (
    <div className="p-4 w-full">
      <EmptyList name="sales" />
    </div>
  );
}

export default WidgetSalesChart;
