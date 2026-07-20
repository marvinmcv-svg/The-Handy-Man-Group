import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Detect a stale cached client (e.g. one created before a new Prisma model
// was generated) and discard it so a fresh client is built from the latest
// generated code. This keeps the dev-server HMR story working when the
// Prisma schema evolves without requiring a full server restart.
const cached = globalForPrisma.prisma as unknown as
  | (PrismaClient & { media?: unknown })
  | undefined
if (cached && typeof cached.media === "undefined") {
  cached?.$disconnect?.().catch(() => {})
  globalForPrisma.prisma = undefined
}

// Only log Prisma queries in development — production logging is noisy and
// can leak query details into server logs.
const logConfig: ("query" | "error" | "warn")[] =
  process.env.NODE_ENV === 'production' ? ['error', 'warn'] : ['query', 'error', 'warn']

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: logConfig,
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
