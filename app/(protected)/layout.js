import Sidebar from "@/app/_components/Sidebar";
import Header from "@/app/_components/Header";
import { redirect } from "next/navigation";
import { auth } from "@/app/_lib/auth";

export default async function ProtectedLayout({ children }) {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="bg-primary-950 text-primary-100 h-screen flex flex-col relative">
      <Header />
      <main className="grid grid-cols-[220px_1fr] h-full print:grid-cols-[1fr]">
        <Sidebar />
        <div className="overflow-auto">{children}</div>
      </main>
    </div>
  );
}
