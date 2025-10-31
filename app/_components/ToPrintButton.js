import React from "react";
import { PrinterCheck } from "lucide-react";

function ToPrintButton({ onClick }) {
  return (
    <div className="mb-4 flex gap-4">
      <button onClick={onClick}>
        <div className="p-2 flex flex-row gap-2 border border-primary-600 rounded-md hover:bg-primary-500 hover:text-primary-700">
          <PrinterCheck /> Print
        </div>
      </button>
    </div>
  );
}

export default ToPrintButton;
