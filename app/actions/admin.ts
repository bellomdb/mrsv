'use server'

import { desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { applications, nominations } from '@/lib/db/schema'
import type { Application, ApplicationStatus, GuestCategory, Nomination } from '@/lib/types'

// Every committee action requires a valid session. Applications and nominations
// are shared committee records (public submissions), so access is gated on being
// an authenticated committee member rather than per-row ownership.
async function requireCommittee() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user
}

type ApplicationRow = typeof applications.$inferSelect
type NominationRow = typeof nominations.$inferSelect

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

export async function getApplications(): Promise<Application[]> {
  await requireCommittee()
  const rows = await db.select().from(applications).orderBy(desc(applications.createdAt))
  return rows.map(toApplication)
}

export async function getNominations(): Promise<Nomination[]> {
  await requireCommittee()
  const rows = await db.select().from(nominations).orderBy(desc(nominations.createdAt))
  return rows.map(toNomination)
}

export async function updateApplicationStatus(
  reference: string,
  status: ApplicationStatus,
): Promise<void> {
  await requireCommittee()
  await db.update(applications).set({ status }).where(eq(applications.reference, reference))
  revalidatePath('/admin')
}

export async function updateApplicationTable(
  reference: string,
  tableAssignment: string,
): Promise<void> {
  await requireCommittee()
  await db
    .update(applications)
    .set({ tableAssignment: tableAssignment.trim() || null })
    .where(eq(applications.reference, reference))
  revalidatePath('/admin')
}

export async function updateNominationStatus(
  reference: string,
  status: Nomination['status'],
): Promise<void> {
  await requireCommittee()
  await db.update(nominations).set({ status }).where(eq(nominations.reference, reference))
  revalidatePath('/admin')
}
