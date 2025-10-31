import Orders from "@/app/_components/Orders";
import * as appConstants from "@/app/_helpers/appConstants";

export const revalidate = 0;
export async function generateMetadata() {
  return {
    title: `Orders ${appConstants.TITLE_SEPARATOR} ${appConstants.APP_NAME}`,
  };
}

export default function Page() {
  return <Orders />;
}
