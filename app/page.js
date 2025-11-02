import * as appConstants from "@/app/_helpers/appConstants";
import Dashboard from "@/app/_components/dashboard/Dashboard";

export const revalidate = 0;

export async function generateMetadata() {
  return {
    title: `Home ${appConstants.TITLE_SEPARATOR} ${appConstants.APP_NAME}`,
  };
}

export default function Home() {
  return (
    <main>
      <Dashboard />
    </main>
  );
}
