import React from "react";
import Link from "next/link";
import Button from "@/app/_components/Button";

function ListButtons({ href }) {
  return (
    <div className="flex justify-end gap-2">
      <Link
        href={href}
        className="p-1 px-2 rounded-md border border-primary-600 hover:bg-accent-800"
      >
        Edit
      </Link>
      <Button additional={"text-amber-600"}>Delete</Button>
    </div>
  );
}

export default ListButtons;
