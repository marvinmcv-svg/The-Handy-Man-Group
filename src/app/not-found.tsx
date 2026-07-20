import Link from "next/link";
import { Hammer, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#121117] px-6 text-center text-white">
      <div className="flex items-center gap-3">
        <img src="/ai-media/logo-hcg.png" alt="The Handyman & Carpentry Group" className="h-12 w-12 object-contain" />
        <span className="text-[16px] font-bold tracking-tight">Handyman &amp; Carpentry</span>
      </div>
      <h1 className="mt-12 text-[80px] font-bold leading-none text-[#D2151E] md:text-[120px]">404</h1>
      <h2 className="mt-4 text-[24px] font-bold md:text-[32px]">Page not found</h2>
      <p className="mt-3 max-w-md text-[16px] font-normal text-white/60">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center gap-2 bg-[#D2151E] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#B01118]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to homepage
      </Link>
    </main>
  );
}
