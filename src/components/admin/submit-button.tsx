"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SubmitButton({
  children,
  loadingLabel = "Saving…",
  loading = false,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  loadingLabel?: string;
  loading?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
}) {
  return (
    <Button
      type="submit"
      variant={variant}
      disabled={loading}
      className={className}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        children
      )}
    </Button>
  );
}

export function useFormSubmit() {
  const [loading, setLoading] = useState(false);
  async function submit(
    url: string,
    options: RequestInit & { method?: string },
    onSuccess?: (data: unknown) => void,
    onError?: (msg: string) => void
  ) {
    setLoading(true);
    try {
      const res = await fetch(url, options);
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        const msg = (data && (data.error as string)) || "Something went wrong.";
        onError?.(msg);
        return false;
      }
      onSuccess?.(data);
      return true;
    } catch {
      const msg = "Network error. Please try again.";
      onError?.(msg);
      return false;
    } finally {
      setLoading(false);
    }
  }
  return { loading, submit };
}
