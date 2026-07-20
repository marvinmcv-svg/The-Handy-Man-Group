import type { Metadata } from "next";
import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";
import { Hammer } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const authed = await isAuthenticated();
  if (authed) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#121117] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center bg-[#D2151E] text-white">
            <Hammer className="h-7 w-7" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Handyman &amp; Carpentry Group
          </h1>
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-[#999999]">
            Admin Portal
          </p>
        </div>

        <LoginForm />

        <p className="mt-6 text-center text-xs text-[#999999]">
          Demo credentials:{" "}
          <span className="font-semibold text-[#F3F4F6]">Joeisgay123!</span> /{" "}
          <span className="font-semibold text-[#F3F4F6]">Joelewis123!</span>
        </p>
      </div>
    </main>
  );
}
