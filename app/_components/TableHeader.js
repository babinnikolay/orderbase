import React from "react";

function TableHeader({ children }) {
  return (
    <div className={`w-full py-2 flex text-left border-b border-primary-700`}>
      {children}
    </div>
  );
}

export default TableHeader;
