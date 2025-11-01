import * as appConstants from "@/app/_helpers/appConstants";

export async function generateMetadata() {
  return {
    title: `Home ${appConstants.TITLE_SEPARATOR} ${appConstants.APP_NAME}`,
  };
}

export default function Home() {
  return (
    <main className="mt-24">
      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to {appConstants.APP_NAME}.
        </h1>
      </div>
    </main>
  );
}
