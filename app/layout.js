import "./globals.css";
import * as appConstants from "@/app/_helpers/appConstants";
import AuthProvider from "@/app/_components/AuthProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: appConstants.APP_NAME,
  description: appConstants.APP_DESCRIPTION,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary-950 text-primary-100 h-screen flex flex-col relative">
        <div className="bg-primary-600"></div>
        <AuthProvider>{children}</AuthProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#4c6b8a",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
