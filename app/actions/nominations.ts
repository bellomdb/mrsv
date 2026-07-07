'use server'

import { randomUUID } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { nominations } from '@/lib/db/schema'
import type { Nomination } from '@/lib/types'

type NominationRow = typeof nominations.$inferSelect

function toNomination(row: NominationRow): Nomination {
  return {
    id: row.id,
    reference: row.reference,
    company: row.company,
    contactName: row.contactName,
    contactEmail: row.contactEmail,
    make: row.make,
    model: row.model,
    year: row.year,
    engine: row.engine,
    horsepower: row.horsepower,
    zeroToSixty: row.zeroToSixty,
    categories: (row.categories as string[]) ?? [],
    description: row.description,
    submittedAt: row.submittedAt,
    status: row.status as Nomination['status'],
  }
}

function generateReference() {
  const num = Math.floor(100 + Math.random() * 900)
  return `NOM-2026-${num}`
}

export interface NominationInput {
  company: string
  contactName: string
  contactEmail: string
  make: string
  model: string
  year: string
  engine: string
  horsepower: string
  zeroToSixty: string
  categories: string[]
  description: string
}

export async function submitNomination(input: NominationInput): Promise<{ reference: string }> {
  let reference = generateReference()
  for (let i = 0; i < 5; i++) {
    const clash = await db
      .select({ id: nominations.id })
      .from(nominations)
      .where(eq(nominations.reference, reference))
      .limit(1)
    if (clash.length === 0) break
    reference = generateReference()
  }

  await db.insert(nominations).values({
    id: randomUUID(),
    reference,
    company: input.company.trim(),
    contactName: input.contactName.trim(),
    contactEmail: input.contactEmail.trim(),
    make: input.make.trim(),
    model: input.model.trim(),
    year: input.year.trim(),
    engine: input.engine.trim(),
    horsepower: input.horsepower.trim(),
    zeroToSixty: input.zeroToSixty.trim(),
    categories: input.categories,
    description: input.description.trim(),
    submittedAt: new Date().toISOString().slice(0, 10),
    status: 'received',
  })

  return { reference }
}
