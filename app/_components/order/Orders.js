import OrdersList from "@/app/_components/order/OrdersList";
import SectionLabel from "@/app/_components/SectionLabel";
import SectionLine from "@/app/_components/SectionLine";
import NewItemButton from "@/app/_components/NewItemButton";

export default function Orders({ searchParams }) {
  return (
    <div className="h-full">
      <SectionLine>
        <SectionLabel>Orders</SectionLabel>
        <NewItemButton href={"/orders/new"} title={"New order"} />
      </SectionLine>
      <OrdersList searchParams={searchParams} />
    </div>
  );
}
