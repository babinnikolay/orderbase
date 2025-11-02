import React from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";

function LogoutButton({ active }) {
  return (
    <Link
      href="/logout"
      className={`h-10 p-3 flex flex-row gap-2 border border-primary-600 rounded-xl items-center ${active && "bg-primary-700"} hover:bg-primary-500`}
    >
      <LogOut /> Logout
    </Link>
  );
}

export default LogoutButton;
