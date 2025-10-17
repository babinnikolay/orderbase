import Button from "@/app/_components/Button";
import ListButtons from "@/app/_components/ListButtons";
import Link from "next/link";
import { format } from "date-fns";
import { dateFormat } from "@/app/_helpers/appConstants";

export default function OrderRow({ order }) {
  return (
    <tr className="hover:bg-primary-700 border-b border-primary-700">
      <td className="p-3">{format(order.date, dateFormat)}</td>
      <td>{order.client.name}</td>
      <td>${order.amount}</td>
      <td>{order.description}</td>
      <td>
        <ListButtons>
          <Link
            href={`/orders/edit/${order.id}`}
            className="p-1 px-2 rounded-md border border-primary-600 hover:bg-accent-800"
          >
            Edit
          </Link>
          <Button additional={"text-amber-600"}>Delete</Button>
        </ListButtons>
      </td>
    </tr>
  );
}
