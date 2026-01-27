import { Pool } from 'pg' 
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../app/generated/prisma/client'

const connectionString = process.env.DATABASE_URL

type GlobalWithPrisma = typeof globalThis & {
  prisma?: PrismaClient
}

const g = globalThis as GlobalWithPrisma

if (!g.prisma) {
  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  g.prisma = new PrismaClient({ 
    adapter,
    transactionOptions: {
      maxWait: 5000, 
      timeout: 10000  
    }
  })
}

const prisma = g.prisma

export default prisma