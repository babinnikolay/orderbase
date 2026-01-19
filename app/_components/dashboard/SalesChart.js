"use client";
import React from "react";
import { Bar, BarChart, CartesianGrid, Tooltip } from "recharts";

function SalesChart({ chartData }) {
  return (
    <div className="w-full">
      <p className="pl-6 pb-2 text-2xl">
        Sales and payments for the last 30 days
      </p>
      <BarChart width="100%" height={300} data={chartData} responsive>
        <CartesianGrid strokeDasharray="3 3" />

        <Tooltip cursor={false} />
        <Bar type="monotone" dataKey="sales" name="sales" fill="#5E82A6" />
        <Bar
          type="monotone"
          dataKey="payments"
          fill="#82ca9d"
          name="payments"
        />
      </BarChart>
    </div>
  );
}

export default SalesChart;
