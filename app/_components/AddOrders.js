import React, { useState } from "react";
import Button from "@/app/_components/Button";
import { BadgeMinus, Plus, Save } from "lucide-react";
import AddOrdersList from "@/app/_components/AddOrdersList";

function AddOrders({ chosenOrders, addOrders }) {
  const [addingMode, setAddingMode] = useState(false);
  const [count, setCount] = useState(0);
  const [newOrders, setNewOrders] = useState([]);

  const chooseCount = function chooseCount(order, inc) {
    setCount((c) => (inc ? c + 1 : c - 1));
    newOrders.push(order);
    setNewOrders(newOrders);
  };

  return (
    <div>
      {!addingMode && (
        <Button onClick={() => setAddingMode(!addingMode)}>
          <div className="flex items-center justify-center">
            <Plus /> Add orders
          </div>
        </Button>
      )}
      {addingMode && (
        <div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                if (addingMode) setCount(0);
                setAddingMode(!addingMode);
                addOrders(newOrders);
                setNewOrders([]);
              }}
            >
              <div className="flex items-center justify-center gap-1">
                <Save /> Add {count ? `(${count})` : ""}
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
          <AddOrdersList choose={chooseCount} />
        </div>
      )}
    </div>
  );
}

export default AddOrders;
