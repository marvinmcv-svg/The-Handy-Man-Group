"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Hammer,
  LayoutDashboard,
  Wrench,
  FolderKanban,
  Quote,
  HelpCircle,
  Inbox,
  LogOut,
  Menu,
  X,
  Loader2,
  ImagePlus,
  Settings,
  History,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/media", label: "Media Library", icon: ImagePlus },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/quotes", label: "Quote Requests", icon: Inbox },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
  { href: "/admin/activity", label: "Activity Log", icon: History },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Close the mobile drawer whenever the route changes (so back/forward
  // nav doesn't leave a stale overlay).
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close on Escape + lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore — redirect anyway
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex h-16 items-center gap-2.5 border-b border-[#2A2A33] px-5">
        <span className="flex h-9 w-9 items-center justify-center bg-[#D2151E] text-white">
          <Hammer className="h-5 w-5" strokeWidth={2.5} />
        </span>
        <span className="flex flex-col leading-none">
          <span className="text-[13px] font-bold tracking-tight text-white">
            Handyman &amp; Carpentry
          </span>
          <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#999999]">
            Admin Portal
          </span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4" aria-label="Admin navigation">
        <ul className="space-y-1 px-3">
          {NAV.map((item) => {
            const active = isActive(item.href, item.exact);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex h-10 items-center gap-3 px-3 text-[14px] font-medium transition-colors",
                    active
                      ? "bg-[#D2151E] text-white"
                      : "text-[#C9C9D1] hover:bg-[#1A1A21] hover:text-white"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-[#2A2A33] p-3">
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex h-10 w-full items-center gap-3 px-3 text-[14px] font-medium text-[#C9C9D1] transition-colors hover:bg-[#1A1A21] hover:text-white disabled:opacity-60"
        >
          {loggingOut ? (
            <Loader2 className="h-[18px] w-[18px] animate-spin" />
          ) : (
            <LogOut className="h-[18px] w-[18px]" />
          )}
          {loggingOut ? "Logging out…" : "Logout"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 bg-[#121117] lg:block">
        <div className="sticky top-0 h-screen">{sidebar}</div>
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Admin navigation">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute left-0 top-0 h-full w-72 bg-[#121117] shadow-xl">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 z-10 inline-flex h-9 w-9 items-center justify-center text-[#C9C9D1] hover:text-white"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#DDDDDD] bg-white px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center text-[#121117]"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-[#D2151E] text-white">
              <Hammer className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <span className="text-[13px] font-bold tracking-tight text-[#121117]">
              Admin
            </span>
          </div>
          <div className="w-10" />
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
