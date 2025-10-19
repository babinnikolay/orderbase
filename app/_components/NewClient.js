"use client";
import React from "react";
import Link from "next/link";

export default function NewClient() {
  return (
    <div>
      <Link
        href={`/clients/new`}
        className="p-1 px-2 rounded-md border border-primary-600 hover:bg-accent-800 bg-accent-700 text-primary-200"
      >
        &#43; New Client
      </Link>
    </div>
  );
}
