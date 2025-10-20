import React from "react";
import * as appConstants from "@/app/_helpers/appConstants";
import Invoices from "@/app/_components/Invoices";

export async function generateMetadata() {
  return {
    title: `Invoces ${appConstants.TITLE_SEPARATOR} ${appConstants.APP_NAME}`,
  };
}

function Page({ children }) {
  return <Invoices />;
}

export default Page;
