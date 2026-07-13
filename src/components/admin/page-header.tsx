import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

export function PageHeader({
  title,
  description,
  crumbs,
  action,
}: {
  title: string;
  description?: string;
  crumbs?: Crumb[];
  action?: React.ReactNode;
}) {
  return (
    <div className="border-b border-[#DDDDDD] bg-white">
      <div className="px-6 py-6 sm:px-8">
        {crumbs && crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-3 flex items-center gap-1 text-xs text-[#999999]"
          >
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1">
                {c.href ? (
                  <Link
                    href={c.href}
                    className="transition-colors hover:text-[#121117]"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-[#121117]">{c.label}</span>
                )}
                {i < crumbs.length - 1 && (
                  <ChevronRight className="h-3 w-3 text-[#CCCCCC]" />
                )}
              </span>
            ))}
          </nav>
        )}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#121117] sm:text-3xl">
              {title}
            </h1>
            {description && (
              <p className="mt-1 text-sm text-[#666666]">{description}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      </div>
    </div>
  );
}

export function AdminContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-6 py-6 sm:px-8 sm:py-8", className)}>{children}</div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center border border-dashed border-[#DDDDDD] bg-white px-6 py-16 text-center">
      <p className="text-base font-semibold text-[#121117]">{title}</p>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-[#666666]">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
