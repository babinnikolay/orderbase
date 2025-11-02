"use client";

import React from "react";
import Link from "next/link";
import { User } from "lucide-react";

function AccountButton({ active }) {
  return (
    <Link
      href="/account"
      className={`border border-primary-600 h-10 p-3 flex flex-row gap-2 rounded-xl items-center ${active && "bg-primary-700"} hover:bg-primary-500`}
    >
      <User /> Account
    </Link>
  );
}

export default AccountButton;
