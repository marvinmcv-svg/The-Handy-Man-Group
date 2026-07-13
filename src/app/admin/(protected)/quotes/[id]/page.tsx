import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { PageHeader, AdminContainer } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { QuoteStatusBadge, QuoteStatusControl } from "@/components/admin/quote-status-control";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, MapPin, Clock, Wrench } from "lucide-react";

export const dynamic = "force-dynamic";

function formatDateTime(iso: Date) {
  return new Date(iso).toLocaleString("en-AU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function QuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quote = await db.quoteRequest.findUnique({ where: { id } });
  if (!quote) notFound();

  return (
    <>
      <PageHeader
        title={`Quote from ${quote.name}`}
        description={`Received ${formatDateTime(quote.createdAt)}`}
        crumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Quote Requests", href: "/admin/quotes" },
          { label: quote.name },
        ]}
        action={
          <DeleteButton
            endpoint={`/api/admin/quotes/${quote.id}`}
            redirectTo="/admin/quotes"
            itemLabel={`quote request from "${quote.name}"`}
            size="default"
          />
        }
      />
      <AdminContainer>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Status control */}
          <div className="lg:col-span-3">
            <div className="border border-[#DDDDDD] bg-white p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#999999]">
                    Current status
                  </p>
                  <div className="mt-1.5">
                    <QuoteStatusBadge status={quote.status} />
                  </div>
                </div>
                <div className="sm:text-right">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#999999]">
                    Update status
                  </p>
                  <div className="mt-1.5">
                    <QuoteStatusControl
                      quoteId={quote.id}
                      initialStatus={quote.status}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer details */}
          <div className="lg:col-span-1">
            <div className="border border-[#DDDDDD] bg-white p-5 sm:p-6">
              <h2 className="text-sm font-bold uppercase tracking-wide text-[#999999]">
                Customer
              </h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="text-xs text-[#999999]">Name</dt>
                  <dd className="font-semibold text-[#121117]">{quote.name}</dd>
                </div>
                <DetailLink
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  value={quote.email}
                  href={`mailto:${quote.email}`}
                />
                <DetailLink
                  icon={<Phone className="h-4 w-4" />}
                  label="Phone"
                  value={quote.phone}
                  href={`tel:${quote.phone}`}
                />
                <DetailItem
                  icon={<MapPin className="h-4 w-4" />}
                  label="Suburb"
                  value={quote.suburb || "—"}
                />
                <DetailItem
                  icon={<Wrench className="h-4 w-4" />}
                  label="Service"
                  value={quote.service}
                />
                <DetailItem
                  icon={<Clock className="h-4 w-4" />}
                  label="Received"
                  value={formatDateTime(quote.createdAt)}
                />
              </dl>
            </div>
          </div>

          {/* Message */}
          <div className="lg:col-span-2">
            <div className="border border-[#DDDDDD] bg-white p-5 sm:p-6">
              <h2 className="text-sm font-bold uppercase tracking-wide text-[#999999]">
                Message
              </h2>
              <blockquote className="mt-4 border-l-2 border-[#D2151E] pl-4 text-[15px] leading-relaxed text-[#333333] whitespace-pre-wrap">
                {quote.message}
              </blockquote>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-[#EEEEEE] pt-5">
                <Button asChild className="bg-[#D2151E] text-white hover:bg-[#B01118]">
                  <a href={`mailto:${quote.email}?subject=Re: Your quote request — ${encodeURIComponent(quote.service)}`}>
                    <Mail className="h-4 w-4" />
                    Reply by Email
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={`tel:${quote.phone}`}>
                    <Phone className="h-4 w-4" />
                    Call Customer
                  </a>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/admin/quotes">
                    <ArrowLeft className="h-4 w-4" />
                    Back to list
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AdminContainer>
    </>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 text-[#999999]">{icon}</span>
      <div className="min-w-0">
        <dt className="text-xs text-[#999999]">{label}</dt>
        <dd className="font-medium text-[#121117]">{value}</dd>
      </div>
    </div>
  );
}

function DetailLink({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 text-[#999999]">{icon}</span>
      <div className="min-w-0">
        <dt className="text-xs text-[#999999]">{label}</dt>
        <dd className="min-w-0">
          <a
            href={href}
            className="break-all font-medium text-[#D2151E] hover:underline"
          >
            {value}
          </a>
        </dd>
      </div>
    </div>
  );
}
