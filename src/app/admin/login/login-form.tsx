"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock, User } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        setError(data?.error || "Invalid credentials");
        setLoading(false);
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-[#2A2A33] bg-[#1A1A21] p-6 sm:p-8"
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-[#F3F4F6]">
            Username <span className="text-[#D2151E]">*</span>
          </Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999999]" />
            <Input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              className="border-[#2A2A33] bg-[#121117] pl-9 text-white placeholder:text-[#666666] focus-visible:border-[#D2151E] focus-visible:ring-[#D2151E]/30"
              placeholder="Enter your username"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-[#F3F4F6]">
            Password <span className="text-[#D2151E]">*</span>
          </Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999999]" />
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="border-[#2A2A33] bg-[#121117] pl-9 text-white placeholder:text-[#666666] focus-visible:border-[#D2151E] focus-visible:ring-[#D2151E]/30"
              placeholder="Enter your password"
            />
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="border border-[#D2151E] bg-[#D2151E]/10 px-4 py-3 text-sm font-medium text-[#FF6B72]"
          >
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="h-11 w-full bg-[#D2151E] text-[15px] font-semibold text-white hover:bg-[#B01118] disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in…
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </div>
    </form>
  );
}
