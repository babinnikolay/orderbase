import React from "react";
import SalesChart from "@/app/_components/dashboard/SalesChart";
import EmptyList from "@/app/_components/EmptyList";

function WidgetSalesChart({ data }) {
  return data.length > 0 ? (
    <SalesChart chartData={data} />
  ) : (
    <div className="p-4 w-full">
      <EmptyList name="sales" />
    </div>
  );
}

export default WidgetSalesChart;
