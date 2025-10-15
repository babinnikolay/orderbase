import OrderLine from "@/app/_components/OrderLine";
import Table from "@/app/_components/Table";

const orders = [
  {
    date: "2025-10-10",
    clientName: "ООО Альфа",
    amount: 300,
    description: "разработка лэндинговой страницы",
  },
  {
    date: "2025-10-12",
    clientName: "ИП Сидоров",
    amount: 150,
    description: "создание логотипа и брендбука",
  },
  {
    date: "2025-10-15",
    clientName: "ООО Бета",
    amount: 500,
    description: "разработка интернет-магазина",
  },
  {
    date: "2025-10-18",
    clientName: "АО Гамма",
    amount: 200,
    description: "техническая поддержка сайта",
  },
  {
    date: "2025-10-20",
    clientName: "ИП Козлова",
    amount: 100,
    description: "доработка дизайна мобильного приложения",
  },
];

export default function OrdersList() {
  return (
    <Table>
      {orders.map((order, index) => (
        <OrderLine key={index} order={order} />
      ))}
    </Table>
  );
}
