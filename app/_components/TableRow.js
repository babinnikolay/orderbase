import React from "react";

function TableRow({ children }) {
  return (
    <div className="flex px-1 py-2 items-center rounded-t-lg hover:bg-primary-500 border-primary-700 border-b last:border-b-0">
      {children}
    </div>
  );
}

export default TableRow;
