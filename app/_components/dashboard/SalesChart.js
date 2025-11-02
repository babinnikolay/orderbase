"use client";
import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function SalesChart({ chartData }) {
  return (
    <div className="w-full">
      <p className="pl-6 pb-2 text-2xl">
        Sales and payments for the last 30 days
      </p>
      <LineChart width="100%" height={300} data={chartData} responsive>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" name="sales" />
        <Line
          type="monotone"
          dataKey="payments"
          stroke="#82ca9d"
          name="payments"
        />
      </LineChart>
    </div>
  );
}

export default SalesChart;
