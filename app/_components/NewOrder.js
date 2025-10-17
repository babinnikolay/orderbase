"use client";
import React from "react";
import Link from "next/link";

function NewOrder() {
  return (
    <div>
      <Link
        href={`/orders/new`}
        className="p-1 px-2 rounded-md border border-primary-600 hover:bg-accent-800 bg-accent-700 text-primary-200"
      >
        &#43; New order
      </Link>
    </div>
  );
}

export default NewOrder;
