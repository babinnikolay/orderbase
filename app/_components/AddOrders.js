"use client";

import React, { useState } from "react";
import Button from "@/app/_components/Button";
import { BadgeMinus, Plus, Save } from "lucide-react";
import AddOrdersList from "@/app/_components/AddOrdersList";

function AddOrders({ clientId, onAddOrders }) {
  const [addingMode, setAddingMode] = useState(false);
  const [count, setCount] = useState(0);
  const [newOrders, setNewOrders] = useState([]);

  const changeCount = function chooseCount(order, inc) {
    setCount((c) => (inc ? c + 1 : c - 1));
    newOrders.push(order);
    setNewOrders(newOrders);
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
          <div className="flex gap-2">
            <Button
              onClick={() => {
                if (addingMode) setCount(0);
                setAddingMode(!addingMode);
                onAddOrders(newOrders);
                setNewOrders([]);
              }}
            >
              <div className="flex items-center justify-center gap-1">
                <Save /> Ok {count ? `(${count})` : ""}
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
          </div>
          <AddOrdersList onSelect={changeCount} clientId={clientId} />
        </div>
      )}
    </div>
  );
}

export default AddOrders;
