import React from "react";

function SectionLine({ children }) {
  return (
    <div className="m-4 flex justify-between print:hidden">{children}</div>
  );
}

export default SectionLine;
