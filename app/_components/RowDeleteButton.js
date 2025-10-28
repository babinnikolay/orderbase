"use client";

import React from "react";

function RowDeleteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-1 px-2 rounded-md border border-primary-600 hover:bg-accent-800 hover:text-accent-400"
    >
      Delete
    </button>
  );
}

export default RowDeleteButton;
