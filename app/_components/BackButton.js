import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function BackButton({ href, text }) {
  return (
    <Link
      className="p-1 rounded-md border border-primary-600 hover:bg-primary-700 bg-primary-800"
      href={href}
    >
      <div className="flex items-center justify-center gap-2 p-1">
        <ArrowLeft /> <span>{text}</span>
      </div>
    </Link>
  );
}

export default BackButton;
