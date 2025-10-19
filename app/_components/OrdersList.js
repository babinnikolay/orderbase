import OrderRow from "@/app/_components/OrderRow";
import Table from "@/app/_components/Table";
import { getOrders } from "@/app/_lib/data-service";

export default async function OrdersList() {
  const orders = await getOrders();
  const head = ["Date", "Client", "Amount", "Description", "Actions"];
  const foot = { amount: "1250$" };
  return (
    <Table head={head} foot={foot}>
      {orders.map((order, index) => (
        <OrderRow key={index} order={order} />
      ))}
    </Table>
  );
}
