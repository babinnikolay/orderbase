import Button from "@/app/_components/Button";
import ListButtons from "@/app/_components/ListButtons";
import Link from "next/link";
import { format } from "date-fns";
import { dateFormat } from "@/app/_helpers/appConstants";

export default function OrderRow({ order, gridCols }) {
  return (
    <div
      className={`items-center py-2 grid grid-cols-${gridCols} hover:bg-primary-700 border-b border-primary-700`}
    >
      <div>{format(order.date, dateFormat)}</div>
      <div>{order.client.name}</div>
      <div>${order.amount}</div>
      <div>{order.description}</div>
      <div>
        <ListButtons>
          <Link
            href={`/orders/edit/${order.id}`}
            className="p-1 px-2 rounded-md border border-primary-600 hover:bg-accent-800"
          >
            Edit
          </Link>
          <Button additional={"text-amber-600"}>Delete</Button>
        </ListButtons>
      </div>
    </div>
  );
}
