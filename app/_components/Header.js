"use client";
import Image from "next/image";
import logo from "@/public/logo.png";

function Header() {
  return (
    <header className="border-b border-primary-700 px-1 py-5 bg-primary-800 flex print:hidden">
      <div className="flex items-center w-[100px] h-[100px] relative">
        <Image src={logo} alt="Orderbase logo" fill />
      </div>
      <div className="flex items-center justify-center pl-4 text-6xl font-bold">
        Orderbase
      </div>
    </header>
  );
}

export default Header;
