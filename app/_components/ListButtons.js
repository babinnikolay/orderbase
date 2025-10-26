import React from "react";
import Link from "next/link";
import RowDeleteButton from "@/app/_components/RowDeleteButton";

function ListButtons({ href }) {
  return (
    <div className="flex justify-end gap-2">
      <Link
        href={href}
        className="p-1 px-2 rounded-md border border-primary-600 hover:bg-primary-800"
      >
        Edit
      </Link>
      <RowDeleteButton />
    </div>
  );
}

export default ListButtons;
