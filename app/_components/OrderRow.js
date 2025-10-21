import { format } from "date-fns";
import { dateFormat } from "@/app/_helpers/appConstants";
import ListButtons from "@/app/_components/ListButtons";

export default function OrderRow({ order, styles }) {
  return (
    <div className="flex px-1 py-2 items-center rounded-md hover:bg-primary-500">
      <div className={styles[0]}>{format(order.date, dateFormat)}</div>
      <div className={styles[1]}>{order.client.name}</div>
      <div className={styles[2]}>{order.amount}</div>
      <div className={styles[3]}>{order.description}</div>
      <ListButtons href={`/orders/edit/${order.id}`} />
    </div>
  );
}
