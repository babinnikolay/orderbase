"use client";
import React from "react";
import { RussianRuble } from "lucide-react";

export default function SetPaidButton({ paid, onClick, type = "button" }) {
  return (
    <div className="h-54 mt-auto">
      <button
        type={type}
        onClick={onClick}
        className={`p-2 px-2 h-[42px] rounded-xl border border-primary-600 ${paid ? "hover:bg-accent-800" : "hover:bg-primary-500"}`}
      >
        <div className="flex items-center justify-end gap-1">
          <RussianRuble /> Set {paid ? "unpaid" : "paid"}
        </div>
      </button>
    </div>
  );
}
