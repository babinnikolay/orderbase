"use client";
import React from "react";

function Button({ onClick, type = "button", accent, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`p-1 px-2 rounded-md border border-primary-600 ${accent ? "hover:bg-accent-800" : "hover:bg-primary-500"}`}
    >
      {children}
    </button>
  );
}

export default Button;
