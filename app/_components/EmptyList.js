import React from "react";

function EmptyList({ name }) {
  return (
    <div className="p-4 flex flex-col text-center">
      <p>There are no {name}</p>
    </div>
  );
}

export default EmptyList;
