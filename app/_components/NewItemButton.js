import React from "react";
import Link from "next/link";

function NewItemButton({ href, title }) {
  return (
    <div>
      <Link
        href={href}
        className="p-1 px-2 rounded-md border border-primary-600 hover:bg-accent-800 bg-accent-700 text-primary-200"
      >
        &#43; {title}
      </Link>
    </div>
  );
}

export default NewItemButton;
