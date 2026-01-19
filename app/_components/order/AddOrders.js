"use client";

import React, { useState } from "react";
import Button from "@/app/_components/Button";
import { BadgeMinus, Plus, Save } from "lucide-react";
import AddOrdersList from "@/app/_components/order/AddOrdersList";

function AddOrders({ clientId, onAddOrders }) {
  const [addingMode, setAddingMode] = useState(false);
  const [count, setCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [newOrders, setNewOrders] = useState([]);

  const addAction = function addOrderAction(order, inc) {
    setCount((c) => (inc ? c + 1 : c - 1));
    setTotalAmount((a) => (inc ? a + order.amount : a - order.amount));
    newOrders.push(order);
    setNewOrders(newOrders);
  };

  const okAction = () => {
    if (addingMode) setCount(0);
    setAddingMode(!addingMode);
    onAddOrders(newOrders);
    setNewOrders([]);
  };

  const resetCount = function resetCount() {
    setCount(0);
  };

  return (
    <div>
      {!addingMode && (
        <button
          onClick={() => setAddingMode(!addingMode)}
          className="p-1 px-2 rounded-md border border-primary-600 hover:bg-primary-500"
        >
          <div className="flex items-center justify-center">
            <Plus /> Add orders
          </div>
        </button>
      )}
      {addingMode && (
        <div>
          <div className="flex gap-2 flex-col">
            <div className="flex flex-row gap-2">
              <div className="flex items-left justify-center flex-row gap-1">
                <Button onClick={() => okAction()}>
                  <div className="flex items-center justify-center gap-1">
                    <Save /> Ok
                  </div>
                </Button>

                <Button
                  onClick={() => {
                    if (addingMode) setCount(0);
                    setAddingMode(!addingMode);
                    setNewOrders([]);
                  }}
                >
                  <div className="flex items-center justify-center gap-1">
                    <BadgeMinus /> Cancel
                  </div>
                </Button>

                <div
                  className={`p-1 px-2 rounded-md  border-primary-600 cursor-pointer`}
                >{`Selected: ${count}`}</div>
                <div
                  className={`p-1 px-2 rounded-md  border-primary-600  cursor-pointer`}
                >{`Total amount: ${totalAmount}`}</div>
              </div>
            </div>
          </div>
          <AddOrdersList
            onSelect={addAction}
            clientId={clientId}
            resetCount={resetCount}
            okAction={okAction}
          />
        </div>
      )}
    </div>
  );
}

export default AddOrders;
