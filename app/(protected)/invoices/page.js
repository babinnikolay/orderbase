import React from "react";
import * as appConstants from "@/app/_helpers/appConstants";
import Invoices from "@/app/_components/order/Invoices";
import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";

export const revalidate = 0;
export async function generateMetadata() {
  return {
    title: `Invoices ${appConstants.TITLE_SEPARATOR} ${appConstants.APP_NAME}`,
  };
}

async function Page({ searchParams }) {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return <Invoices searchParams={searchParams} />;
}

export default Page;
