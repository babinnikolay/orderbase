import React, { useState } from "react";
import { format } from "date-fns";
import { dateFormat } from "@/app/_helpers/appConstants";
import { Trash } from "lucide-react";

function OrderChip({ order, selectable = false, deletable = true, choose }) {
  const [selected, setSelected] = useState(false);
  return (
    <div
      key={order.id}
      className={`flex items-center gap-3 px-3 py-2  rounded-lg shadow border hover:shadow-md transition-shadow hover:bg-primary-400 cursor-default ${selected ? "bg-primary-400" : "bg-primary-200"}`}
      onClick={() => {
        choose(order, !selected);
        selectable && setSelected(!selected);
      }}
    >
      <div className="flex items-center gap-2 align-center">
        <span className="font-medium text-primary-800 text-sm">
          #{order.id}
        </span>
        <span className="text-gray-600 text-sm">•</span>
        <span className="text-gray-600 text-sm">
          {format(order.date, dateFormat)}
        </span>
        <span className="text-gray-400">•</span>
        <span className="font-semibold text-primary-800 text-sm">
          {order.amount}
        </span>
        {deletable && (
          <button type="button" title="Remove from this invoice">
            <Trash size={13} />
          </button>
        )}
      </div>
    </div>
  );
}

export default OrderChip;
