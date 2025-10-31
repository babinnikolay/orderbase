import React from "react";
import { LucideFileX } from "lucide-react";

function ClosePrintButton({ onClick }) {
  return (
    <button onClick={onClick}>
      <div className="p-2 flex flex-row gap-2 border border-primary-600 rounded-md hover:bg-primary-500 hover:text-primary-700">
        <LucideFileX /> Close
      </div>
    </button>
  );
}

export default ClosePrintButton;
