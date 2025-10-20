import { format } from "date-fns";
import { dateFormat } from "@/app/_helpers/appConstants";

export default function OrderChoiceRow({ order, gridCols }) {
  return (
    <div
      className={`p-2 grid grid-cols-${gridCols} border-b  border-primary-700 hover:bg-primary-400`}
    >
      <div className="">
        <input type="checkbox" />
      </div>
      <div className="">{format(order.date, dateFormat)}</div>
      <div className="">${order.amount}</div>
      <div className="flex-auto">{order.description}</div>
    </div>
  );
}
