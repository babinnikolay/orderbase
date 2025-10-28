import React from "react";

function TableRow({ children }) {
  return (
      <div className="border-primary-700 border-b   last:border-b-0">
        <div className="px-1 py-2 flex rounded-lg items-center hover:bg-primary-500 ">
        {children}
      </div>
    </div>
  );
}

export default TableRow;
