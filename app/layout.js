import "@/app/_styles/globals.css";
import Sidebar from "@/app/_components/Sidebar";
import Header from "@/app/_components/Header";
import * as appConstants from "@/app/_helpers/appConstants";

export const metadata = {
  title: appConstants.APP_NAME,
  description: appConstants.APP_DESCRIPTION,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary-950  text-primary-100 h-screen flex flex-col relative">
        <Header />
        <main className="grid grid-cols-[220px_1fr] h-full">
          <Sidebar />

          {/*<div className="flex-1 px-8 py-12 grid">*/}
          {/*<div className="max-w-7xl  mx-auto">*/}
          {children}
          {/*<ReservationProvider>{children}</ReservationProvider>*/}
          {/*</div>*/}
        </main>
        {/*</div>*/}
      </body>
    </html>
  );
}
