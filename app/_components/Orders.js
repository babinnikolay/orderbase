import OrdersList from "@/app/_components/OrdersList";
import SectionLabel from "@/app/_components/SectionLabel";
import SectionLine from "@/app/_components/SectionLine";
import NewOrder from "@/app/_components/NewOrder";

export default function Orders() {
  return (
    <div>
      <SectionLine>
        <SectionLabel>Orders</SectionLabel>
        <NewOrder />
      </SectionLine>
      <OrdersList />
    </div>
  );
}
