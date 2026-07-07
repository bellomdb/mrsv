// Seeds the committee portal admin account from ADMIN_EMAIL / ADMIN_PASSWORD.
// Uses Better Auth's own password hasher so the credentials work at sign-in.
// Run: node --env-file-if-exists=/vercel/share/.env.project scripts/seed-admin.mjs

import { randomUUID } from 'node:crypto'
import { Pool } from 'pg'
import { betterAuth } from 'better-auth'

const email = process.env.ADMIN_EMAIL
const password = process.env.ADMIN_PASSWORD

if (!email || !password) {
  console.error('[seed] ADMIN_EMAIL and ADMIN_PASSWORD must be set.')
  process.exit(1)
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const auth = betterAuth({ database: pool, emailAndPassword: { enabled: true } })
const ctx = await auth.$context
const hash = await ctx.password.hash(password)

const normalizedEmail = email.trim().toLowerCase()

// Is there already a user with this email?
const existing = await pool.query('SELECT id FROM "user" WHERE lower(email) = $1', [normalizedEmail])

if (existing.rows.length > 0) {
  const userId = existing.rows[0].id
  const updated = await pool.query(
    `UPDATE "account" SET "password" = $1, "updatedAt" = now()
     WHERE "userId" = $2 AND "providerId" = 'credential'`,
    [hash, userId],
  )
  if (updated.rowCount === 0) {
    await pool.query(
      `INSERT INTO "account" ("id", "accountId", "providerId", "userId", "password", "createdAt", "updatedAt")
       VALUES ($1, $2, 'credential', $3, $4, now(), now())`,
      [randomUUID(), userId, userId, hash],
    )
  }
  console.log(`[seed] Updated existing admin: ${normalizedEmail}`)
} else {
  const userId = randomUUID()
  await pool.query(
    `INSERT INTO "user" ("id", "name", "email", "emailVerified", "createdAt", "updatedAt")
     VALUES ($1, 'Committee Admin', $2, true, now(), now())`,
    [userId, normalizedEmail],
  )
  await pool.query(
    `INSERT INTO "account" ("id", "accountId", "providerId", "userId", "password", "createdAt", "updatedAt")
     VALUES ($1, $2, 'credential', $3, $4, now(), now())`,
    [randomUUID(), userId, userId, hash],
  )
  console.log(`[seed] Created admin: ${normalizedEmail}`)
}

await pool.end()
process.exit(0)
