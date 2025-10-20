import OrderRow from "@/app/_components/OrderRow";
import Table from "@/app/_components/Table";
import { getOrders } from "@/app/_lib/data-service";

export default async function OrdersList() {
  const orders = await getOrders();
  const head = ["Date", "Client", "Amount", "Description", "Actions"];
  const foot = { amount: "1250$" };
  const gridCols = "[1fr_1fr_1fr_4fr_1fr]";

  return (
    <div className="m-4 px-4 py-2 rounded-xl border border-primary-600 shadow-lg bg-primary-800">
      <Table head={head} foot={foot} gridCols={gridCols}>
        {orders.map((order, index) => (
          <OrderRow key={index} order={order} gridCols={gridCols} />
        ))}
      </Table>
    </div>
  );
}
