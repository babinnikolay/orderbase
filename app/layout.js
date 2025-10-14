import "@/app/_styles/globals.css";
import Sidebar from "@/app/_components/Sidebar";
import Header from "@/app/_components/Header";

export const metadata = {
  title: process.env.APP_CODENAME_NAME,
  description: process.env.APP_DESCRIPTION,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary-950  text-primary-100 min-h-screen flex flex-col relative">
        <Header />
        <div className="grid grid-cols-[220px_1fr]">
          <Sidebar />

          {/*<div className="flex-1 px-8 py-12 grid">*/}
          <main className="max-w-7xl  mx-auto">
            {children}
            {/*<ReservationProvider>{children}</ReservationProvider>*/}
          </main>
        </div>
        {/*</div>*/}
      </body>
    </html>
  );
}
