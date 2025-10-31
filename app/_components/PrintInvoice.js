import { format } from "date-fns";
import { dateFormat } from "@/app/_helpers/appConstants";

export default function PrintInvoice({ invoice, amount }) {
  return (
    <div className="bg-white p-5">
      <h1 className="p-4 text-2xl font-bold">
        Invoice #{invoice.id} from {format(invoice.date, dateFormat)}
      </h1>
      {invoice.orders.map((order, index) => (
        <div key={index}>
          <p>
            {order.id} from {format(order.date, dateFormat)}
          </p>
        </div>
      ))}
      <p>Total amount: {invoice.total}</p>
    </div>
  );
}
