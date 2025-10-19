import Button from "@/app/_components/Button";
import ListButtons from "@/app/_components/ListButtons";
import Link from "next/link";

export default function ClientRow({ client }) {
  return (
    <tr className="hover:bg-primary-700 border-b border-primary-700 ">
      <td className="p-3">{client.id}</td>
      <td>{client.name}</td>
      <td>
        <ListButtons>
          <Link
            href={`/clients/edit/${client.id}`}
            className="p-1 px-2 rounded-md border border-primary-600 hover:bg-accent-800"
          >
            Edit
          </Link>
          <Button additional={"text-amber-600"}>Delete</Button>
        </ListButtons>
      </td>
    </tr>
  );
}
