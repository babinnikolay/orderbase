"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Account() {
  const session = useSession();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Устанавливаем имя из сессии при загрузке
  useEffect(() => {
    if (session?.data?.user?.name) {
      setName(session.data.user.name);
    }
  }, [session?.data?.user?.name]);

  if (!session || session.status === "loading") return;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email: session.data.user.email,
          password,
        }),
      });

      if (res.ok) {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          toast.error(
            "Account update successful but login failed. Please sign in manually.",
          );
          router.push("/signin");
        } else {
          router.push("/");
        }
      } else {
        const error = await res.json();
        toast.error(error.error || "Account update failed");
      }
    } catch (error) {
      toast.error("Account update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-primary-900 h-full">
      <div className="p-5 border-primary-800 rounded-md max-w-md w-full space-y-8 border bg-primary-700 shadow-lg shadow-primary-950">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary-100">
            Update account data
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-primary-200"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none"
                placeholder="Enter your full name"
                defaultValue={session?.data?.user?.name || ""}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary-200"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                disabled
                readOnly
                className="mt-1 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none"
                placeholder="Enter your email"
                defaultValue={session?.data?.user?.email || ""}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-primary-200"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                className="mt-1 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-primary-200"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                className="mt-1 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-fit flex justify-center py-2 px-4  text-sm font-medium rounded-md text-primary-200 bg-primary-500 hover:bg-primary-300 hover:text-primary-800 disabled:opacity-50 border border-primary-700"
            >
              {loading ? "Updating account..." : "Update account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Account;
