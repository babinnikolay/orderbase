import ChosenOrders from "@/app/_components/ChosenOrders";

export default async function InvoiceOrdersList({ invoice }) {
  const { orders } = invoice;
  return (
    <div className=" p-4 rounded-xl bg-primary-300 text-primary-800 ">
      <ChosenOrders orders={orders} />
    </div>
  );
}
