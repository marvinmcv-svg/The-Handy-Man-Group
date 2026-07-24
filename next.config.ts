// Force rebuild: fix media uploads
import type { NextConfig } from "next";

/**
 * Security headers applied to every response.
 *
 * - Content-Security-Policy: restricts script/style/font/img/connect sources
 *   to same-origin plus the few third-party domains we actually use
 *   (Instagram embeds + Google Fonts). `unsafe-inline` is required for
 *   styles because Next.js injects inline styles during hydration, and for
 *   scripts because the Instagram embed.js injects inline scripts.
 *   `unsafe-eval` is NOT enabled.
 * - X-Frame-Options: SAMEORIGIN prevents clickjacking via iframe.
 * - X-Content-Type-Options: nosniff stops MIME sniffing.
 * - Referrer-Policy: strict-origin-when-cross-origin.
 * - Permissions-Policy: locks down camera, microphone, geolocation, etc.
 * - Strict-Transport-Security: enforces HTTPS (only sent over HTTPS).
 *
 * Note: in dev (NODE_ENV !== "production") we relax the CSP slightly so that
 * Next.js dev tooling (HMR, React DevTools) keeps working.
 */
const cspDirectives = [
  "default-src 'self'",
  // Scripts: same-origin + Instagram embed + inline (embed.js needs it).
  process.env.NODE_ENV === "production"
    ? "script-src 'self' 'unsafe-inline' https://www.instagram.com"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.instagram.com",
  // Styles: same-origin + Google Fonts + inline (Next injects inline styles).
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // Fonts: same-origin + Google Fonts.
  "font-src 'self' https://fonts.gstatic.com data:",
  // Images: same-origin + the OSS image CDN we use + Instagram + data: URIs.
  "img-src 'self' data: blob: https://sfile.chatglm.cn https://www.instagram.com https://scontent.cdninstagram.com https://*.cdninstagram.com",
  // Media (video/audio): same-origin + instagram CDN.
  "media-src 'self' blob: https://www.instagram.com https://*.cdninstagram.com",
  // Connect (fetch/XHR/SSE): same-origin only — the public site doesn't need
  // third-party fetch. (Instagram embeds load via <iframe>, not fetch.)
  "connect-src 'self'",
  // Frames: Instagram embeds load in an iframe.
  "frame-src 'self' https://www.instagram.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Content-Security-Policy", value: cspDirectives },
  // XSS-Protection is legacy and is no-op in modern browsers, but doesn't hurt
  // for older ones.
  { key: "X-XSS-Protection", value: "1; mode=block" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  serverExternalPackages: ["@prisma/client"],
  images: {
    // Allow Next/Image to optimise images served from our OSS media CDN.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sfile.chatglm.cn",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "scontent.cdninstagram.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.cdninstagram.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
