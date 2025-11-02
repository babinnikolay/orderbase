import React from "react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function LogoutButton({ active }) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({
        redirect: false,
        callbackUrl: "/signin",
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className={`h-10 p-3 flex flex-row gap-2 border border-primary-600 rounded-xl items-center ${active && "bg-primary-700"} hover:bg-primary-500`}
    >
      <LogOut /> Logout
    </button>
  );
}

export default LogoutButton;
