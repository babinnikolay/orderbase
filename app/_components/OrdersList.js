import OrderRow from "@/app/_components/OrderRow";
import Table from "@/app/_components/Table";
import { getOrders } from "@/app/_lib/data-service";

export default async function OrdersList() {
  const orders = await getOrders();
  return (
    <Table>
      {orders.map((order, index) => (
        <OrderRow key={index} order={order} />
      ))}
    </Table>
  );
}
