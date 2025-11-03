"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Spinner from "@/app/_components/Spinner";
import * as appConstants from "@/app/_helpers/appConstants";
import Image from "next/image";
import logo from "@/public/logo.png";

function Landing() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading")
    return (
      <div className="h-full flex items-center justify-center min-h-[200px]">
        <Spinner />
      </div>
    );

  if (session && status === "authenticated") router.push("/dashboard");

  return (
    <div className="min-h-screen bg-primary-950 text-primary-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 w-full">
        <div className="text-center max-w-md w-full">
          {/* Лого и приветствие в одну строку */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 relative flex-shrink-0">
              <Image
                src={logo}
                alt="Orderbase logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold whitespace-nowrap">
              Welcome to {appConstants.APP_NAME}
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/signin"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors text-lg"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-transparent text-primary-300 px-8 py-3 rounded-lg font-medium border-2 border-primary-600 hover:bg-primary-800 transition-colors text-lg"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 border-t border-primary-800">
        <div className="text-center text-primary-400">
          <p>© Corp LLC, all rights reserved 2025</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
