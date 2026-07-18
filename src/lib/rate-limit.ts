/**
 * In-memory IP-based rate limiter.
 *
 * Adequate for a single-instance deployment (which this project is — Next.js
 * standalone server running on one box). For multi-instance deployments this
 * would need to be backed by Redis or similar shared store.
 *
 * Usage:
 *   const rl = rateLimit({ intervalMs: 60_000, max: 5 });
 *   if (!rl.check(ip)) return 429;
 */

export interface RateLimiterOptions {
  /** Sliding window length in milliseconds. */
  intervalMs: number;
  /** Max attempts allowed within the window. */
  max: number;
  /** Optional label used in error logging. */
  label?: string;
}

interface Bucket {
  /** Timestamps of attempts within the window. */
  hits: number[];
}

export interface RateLimiter {
  /** Returns true if the action is allowed, false if rate-limited. */
  check: (key: string) => boolean;
  /** Returns the current remaining attempts for a key (min 0). */
  remaining: (key: string) => number;
  /**
   * Manually record a hit without checking — useful when you want to count
   * only failures (peek first, attempt, then record on failure).
   */
  record: (key: string) => void;
  /** Resets the bucket for a key (e.g. on successful login). */
  reset: (key: string) => void;
}

export function rateLimit(opts: RateLimiterOptions): RateLimiter {
  const buckets = new Map<string, Bucket>();

  // Periodic eviction of stale buckets so the Map doesn't grow unboundedly.
  // We piggyback on each check() to do lazy cleanup of the calling key, and
  // also run a global sweep every ~5 minutes.
  let lastSweep = Date.now();
  const SWEEP_INTERVAL = 5 * 60 * 1000;

  function sweep(now: number) {
    if (now - lastSweep < SWEEP_INTERVAL) return;
    lastSweep = now;
    const cutoff = now - opts.intervalMs;
    for (const [k, b] of buckets) {
      b.hits = b.hits.filter((t) => t > cutoff);
      if (b.hits.length === 0) buckets.delete(k);
    }
  }

  function getBucket(key: string, now: number): Bucket {
    let b = buckets.get(key);
    if (!b) {
      b = { hits: [] };
      buckets.set(key, b);
    }
    // Drop hits outside the window
    const cutoff = now - opts.intervalMs;
    b.hits = b.hits.filter((t) => t > cutoff);
    return b;
  }

  return {
    check(key: string) {
      const now = Date.now();
      sweep(now);
      const b = getBucket(key, now);
      if (b.hits.length >= opts.max) {
        if (opts.label) {
          // Best-effort log; do not throw.
          console.warn(
            `[rate-limit] ${opts.label} throttled key=${key} hits=${b.hits.length}`
          );
        }
        return false;
      }
      b.hits.push(now);
      return true;
    },
    remaining(key: string) {
      const now = Date.now();
      const b = getBucket(key, now);
      return Math.max(0, opts.max - b.hits.length);
    },
    record(key: string) {
      const now = Date.now();
      sweep(now);
      const b = getBucket(key, now);
      b.hits.push(now);
    },
    reset(key: string) {
      buckets.delete(key);
    },
  };
}

/**
 * Extract a best-effort client IP from a Next.js Request.
 * Honours the first X-Forwarded-For value (set by the gateway/proxy), falling
 * back to the connection remote address.
 */
export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  // Next.js Request doesn't expose a remoteAddress, so fall back to a sentinel.
  return "unknown";
}
