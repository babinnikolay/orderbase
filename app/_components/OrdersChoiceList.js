import { getOrders } from "@/app/_lib/data-service";
import OrderChoiceRow from "@/app/_components/OrderChoiceRow";
import Table from "@/app/_components/Table";

export default async function OrdersChoiceList() {
  const orders = await getOrders();
  const head = ["Choice", "Date", "Amount", "Description"];
  const foot = { amount: "1250$" };
  const gridCols = "[0.5fr_1fr_1fr_2fr]";
  return (
    <div className=" p-4 rounded-xl bg-primary-300 text-primary-800 ">
      <Table head={head} foot={foot} gridCols={gridCols}>
        {orders.map((order, index) => (
          <OrderChoiceRow key={index} order={order} gridCols={gridCols} />
        ))}
      </Table>
    </div>
  );
}
