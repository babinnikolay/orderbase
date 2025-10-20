import OrdersList from "@/app/_components/OrdersList";
import SectionLabel from "@/app/_components/SectionLabel";
import SectionLine from "@/app/_components/SectionLine";
import NewItemButton from "@/app/_components/NewItemButton";

export default function Orders() {
  return (
    <div>
      <SectionLine>
        <SectionLabel>Orders</SectionLabel>
        <NewItemButton href={"/orders/new"} title={"New order"} />
      </SectionLine>
      <OrdersList />
    </div>
  );
}
