"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#121117] px-6 text-center text-white">
      <div className="flex items-center gap-3">
        <img src="/ai-media/logo-hcg.png" alt="The Handyman & Carpentry Group" className="h-12 w-12 object-contain" />
        <span className="text-[16px] font-bold tracking-tight">Handyman &amp; Carpentry</span>
      </div>
      <h1 className="mt-12 text-[60px] font-bold leading-none text-[#D2151E] md:text-[80px]">500</h1>
      <h2 className="mt-4 text-[24px] font-bold md:text-[32px]">Something went wrong</h2>
      <p className="mt-3 max-w-md text-[16px] font-normal text-white/60">
        An unexpected error occurred. Our team has been notified. Try again, or
        head back to the homepage.
      </p>
      <div className="mt-8 flex gap-3">
        <button
          onClick={reset}
          className="inline-flex h-12 items-center bg-[#D2151E] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#B01118]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex h-12 items-center gap-2 border border-white/30 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Homepage
        </Link>
      </div>
    </main>
  );
}
