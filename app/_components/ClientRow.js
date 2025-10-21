import Button from "@/app/_components/Button";
import ListButtons from "@/app/_components/ListButtons";
import Link from "next/link";

export default function ClientRow({ client }) {
  return (
    <div
      className={`flex hover:bg-primary-700 border-b border-primary-700 py-2 items-center`}
    >
      <div className="flex-1">{client.name}</div>
      <div>
        <ListButtons>
          <Link
            href={`/clients/edit/${client.id}`}
            className="p-1 px-2 rounded-md border border-primary-600 hover:bg-accent-800"
          >
            Edit
          </Link>
          <Button additional={"text-amber-600"}>Delete</Button>
        </ListButtons>
      </div>
    </div>
  );
}
