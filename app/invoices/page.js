import React from "react";
import * as appConstants from "@/app/_helpers/appConstants";
import Invoices from "@/app/_components/Invoices";

export const revalidate = 0;
export async function generateMetadata() {
  return {
    title: `Invoices ${appConstants.TITLE_SEPARATOR} ${appConstants.APP_NAME}`,
  };
}

function Page({ children }) {
  return <Invoices />;
}

export default Page;
