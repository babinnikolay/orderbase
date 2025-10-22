import React, { useState } from "react";
import Button from "@/app/_components/Button";
import { BadgeMinus, Plus, Save } from "lucide-react";
import AddOrdersList from "@/app/_components/AddOrdersList";

function AddOrders({ chosenOrders, setChosenOrders }) {
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
                setChosenOrders([...chosenOrders, ...newOrders]);
                setNewOrders([]);
              }}
            >
              <div className="flex items-center justify-center">
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
              <div className="flex items-center justify-center">
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
