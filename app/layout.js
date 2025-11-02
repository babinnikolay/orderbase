import "./globals.css";
import * as appConstants from "@/app/_helpers/appConstants";
import AuthProvider from "@/app/_components/AuthProvider";

export const metadata = {
  title: appConstants.APP_NAME,
  description: appConstants.APP_DESCRIPTION,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary-950 text-primary-100 h-screen flex flex-col relative">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
