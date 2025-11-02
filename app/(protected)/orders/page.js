import Orders from "@/app/_components/order/Orders";
import * as appConstants from "@/app/_helpers/appConstants";
import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";

export const revalidate = 0;
export async function generateMetadata() {
  return {
    title: `Orders ${appConstants.TITLE_SEPARATOR} ${appConstants.APP_NAME}`,
  };
}

export default async function Page({ searchParams }) {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }
  return <Orders searchParams={searchParams} />;
}
