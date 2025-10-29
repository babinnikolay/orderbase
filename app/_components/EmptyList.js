import React from "react";

function EmptyList({ name }) {
  return (
    <div className="p-4 flex flex-col text-center bg-primary-600 rounded-lg">
      <p>There are no {name}</p>
    </div>
  );
}

export default EmptyList;
