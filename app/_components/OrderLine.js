import Button from "@/app/_components/Button";
import ListButtons from "@/app/_components/ListButtons";

export default function OrderLine({ order }) {
  return (
    <tr className="hover:bg-primary-700 border-b border-primary-700">
      <td className="p-3">{order.date}</td>
      <td>{order.clientName}</td>
      <td>${order.amount}</td>
      <td>{order.description}</td>
      <td>
        <ListButtons>
          <Button>Edit</Button>
          <Button additional={"text-amber-600"}>Delete</Button>
        </ListButtons>
      </td>
    </tr>
  );
}
