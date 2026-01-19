import React from "react";
import * as appConstants from "@/app/_helpers/appConstants";
import Clients from "@/app/_components/client/Clients";
import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";

export const revalidate = 0;

export async function generateMetadata() {
  return {
    title: `Clients${appConstants.TITLE_SEPARATOR}${appConstants.APP_NAME}`,
  };
}

export default async function Page({ searchParams }) {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return <Clients searchParams={searchParams} />;
}
