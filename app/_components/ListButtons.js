"use client";

import React, { startTransition } from "react";
import Link from "next/link";
import {
  deleteClientAction,
  deleteInvoiceAction,
  deleteOrderAction,
} from "@/app/_lib/actions";
import Modal from "@/app/_components/Modal";
import RowDeleteButton from "@/app/_components/RowDeleteButton";
import DeleteForm from "@/app/_components/DeleteForm";

function handleDelete(name, id) {
  startTransition(async () => {
    if (name === "client") await deleteClientAction(id);
    if (name === "order") await deleteOrderAction(id);
    if (name === "invoice") await deleteInvoiceAction(id);
  });
}

function ListButtons({ href, id, name }) {
  return (
    <div className="flex justify-end gap-2">
      <Link
        href={href}
        className="p-1 px-2 rounded-md border border-primary-600 hover:bg-primary-800"
      >
        Edit
      </Link>
      <Modal>
        <Modal.Open opens={"delete-window"}>
          <RowDeleteButton />
        </Modal.Open>
        <Modal.Window name={"delete-window"}>
          <DeleteForm onConfirm={() => handleDelete(name, id)}>
            {name}
          </DeleteForm>
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default ListButtons;
