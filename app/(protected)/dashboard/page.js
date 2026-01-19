import React from "react";
import Dashboard from "@/app/_components/dashboard/Dashboard";
import * as appConstants from "@/app/_helpers/appConstants";

export async function generateMetadata() {
  return {
    title: `Dashboard${appConstants.TITLE_SEPARATOR}${appConstants.APP_NAME}`,
  };
}

function Page() {
  return <Dashboard />;
}

export default Page;
