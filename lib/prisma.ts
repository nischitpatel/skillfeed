import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import dotenv from 'dotenv'

dotenv.config()
const connectionString = `${process.env.DATABASE_URL}`

// Create Neon adapter
const adapter = new PrismaNeon({ connectionString })

// Prevent multiple instances in dev
const globalForPrisma = global as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter, log: ["query", "info", "warn", "error"] })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
