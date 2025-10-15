"use client";
import React from "react";
import Modal from "@/app/_components/Modal";
import OrderForm from "@/app/_components/Order";
import Button from "@/app/_components/Button";

function NewOrder() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="order-form">
          <Button additional={"bg-accent-800 text-primary-200"}>
            &#43; New order
          </Button>
        </Modal.Open>
        <Modal.Window name="order-form">
          <OrderForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default NewOrder;
