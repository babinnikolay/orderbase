import React from "react";

function TableRow({ children }) {
  return (
    <div className="flex px-1 py-2 items-center rounded-md hover:bg-primary-500">
      {children}
    </div>
  );
}

export default TableRow;
