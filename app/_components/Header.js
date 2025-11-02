"use client";
import Image from "next/image";
import logo from "@/public/logo.png";
import AccountButton from "@/app/_components/AccountButton";
import LogoutButton from "@/app/_components/LogoutButton";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

function Header() {
  let pathname = usePathname();
  const split = pathname.split("/");
  if (split.length > 1) pathname = `/${split[1]}`;

  const { data: session } = useSession();

  return (
    <header className="border-b border-primary-700 px-1 py-5 bg-primary-800 flex justify-between print:hidden">
      <div className="flex flex-row">
        <div className="flex items-center w-[100px] h-[100px] relative">
          <Image src={logo} alt="Orderbase logo" fill />
        </div>
        <div className="flex items-center justify-center pl-4 text-6xl font-bold">
          Orderbase
        </div>
      </div>
      <div className="content-center flex flex-row p-4 items-center gap-2">
        {session && (
          <AccountButton
            active={"/account" === pathname}
            user={session?.user}
          />
        )}
        {session && <LogoutButton active={"/logout" === pathname} />}
      </div>
    </header>
  );
}

export default Header;
