"use client";
import React from "react";

function Button({ onClick, additional, children }) {
  return (
    <button
      onClick={onClick}
      className={`p-1 px-2 rounded-md border border-primary-600 hover:bg-accent-800 ${additional}`}
    >
      {children}
    </button>
  );
}

export default Button;
