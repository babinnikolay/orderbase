import React from "react";
import * as appConstants from "@/app/_helpers/appConstants";
import Clients from "@/app/_components/Clients";

export async function generateMetadata() {
  return {
    title: `Clients ${appConstants.TITLE_SEPARATOR} ${appConstants.APP_NAME}`,
  };
}

export default async function Page() {
  return <Clients />
}
