'use server'

import { randomUUID } from 'node:crypto'
import { and, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { applications } from '@/lib/db/schema'
import type { Application, GuestCategory } from '@/lib/types'

type ApplicationRow = typeof applications.$inferSelect

function toApplication(row: ApplicationRow): Application {
  return {
    id: row.id,
    reference: row.reference,
    firstName: row.firstName,
    lastName: row.lastName,
    email: row.email,
    phone: row.phone ?? undefined,
    category: row.category as GuestCategory,
    organization: row.organization,
    role: row.role ?? undefined,
    reason: row.reason,
    submittedAt: row.submittedAt,
    status: row.status as Application['status'],
    rsvpStatus: row.rsvpStatus as Application['rsvpStatus'],
    plusOne: row.plusOne,
    plusOneName: row.plusOneName ?? undefined,
    dietary: row.dietary ?? undefined,
    table: row.tableAssignment ?? undefined,
  }
}

function generateReference() {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `MRSV-2026-${num}`
}

export interface ApplicationInput {
  firstName: string
  lastName: string
  email: string
  phone?: string
  category: GuestCategory
  organization: string
  role?: string
  reason: string
}

export async function submitApplication(input: ApplicationInput): Promise<{ reference: string }> {
  // Ensure a unique reference.
  let reference = generateReference()
  for (let i = 0; i < 5; i++) {
    const clash = await db
      .select({ id: applications.id })
      .from(applications)
      .where(eq(applications.reference, reference))
      .limit(1)
    if (clash.length === 0) break
    reference = generateReference()
  }

  await db.insert(applications).values({
    id: randomUUID(),
    reference,
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email: input.email.trim(),
    phone: input.phone?.trim() || null,
    category: input.category,
    organization: input.organization.trim(),
    role: input.role?.trim() || null,
    reason: input.reason.trim(),
    submittedAt: new Date().toISOString().slice(0, 10),
    status: 'under-review',
    rsvpStatus: 'pending',
  })

  return { reference }
}

export async function findApplication(reference: string): Promise<Application | null> {
  const ref = reference.trim()
  if (!ref) return null
  const rows = await db
    .select()
    .from(applications)
    .where(eq(applications.reference, ref))
    .limit(1)
  return rows[0] ? toApplication(rows[0]) : null
}

export interface RsvpInput {
  plusOne: boolean
  plusOneName?: string
  dietary?: string
}

export async function confirmRsvp(
  reference: string,
  input: RsvpInput,
): Promise<Application | null> {
  const existing = await findApplication(reference)
  if (!existing || existing.status !== 'approved') return null

  await db
    .update(applications)
    .set({
      rsvpStatus: 'confirmed',
      plusOne: input.plusOne,
      plusOneName: input.plusOne ? input.plusOneName?.trim() || null : null,
      dietary: input.dietary?.trim() || null,
      tableAssignment: existing.table ?? 'Table assignment at check-in',
    })
    .where(and(eq(applications.reference, existing.reference), eq(applications.status, 'approved')))

  return findApplication(reference)
}

export async function declineRsvp(reference: string): Promise<void> {
  const existing = await findApplication(reference)
  if (!existing || existing.status !== 'approved') return
  await db
    .update(applications)
    .set({ rsvpStatus: 'declined' })
    .where(eq(applications.reference, existing.reference))
}
