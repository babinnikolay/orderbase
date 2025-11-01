import "./globals.css";
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
        <main className="grid grid-cols-[220px_1fr] h-full print:grid-cols-[1fr]">
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  );
}
