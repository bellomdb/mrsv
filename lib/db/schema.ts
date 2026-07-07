import { pgTable, text, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- App tables ------------------------------------------------------------
// Guest invitation applications. These are public submissions (no owning user),
// managed by the committee through the authenticated /admin portal.

export const applications = pgTable('applications', {
  id: text('id').primaryKey(),
  reference: text('reference').notNull().unique(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  category: text('category').notNull(),
  organization: text('organization').notNull(),
  role: text('role'),
  reason: text('reason').notNull(),
  submittedAt: text('submittedAt').notNull(),
  status: text('status').notNull().default('under-review'),
  rsvpStatus: text('rsvpStatus').notNull().default('pending'),
  plusOne: boolean('plusOne').notNull().default(false),
  plusOneName: text('plusOneName'),
  dietary: text('dietary'),
  tableAssignment: text('tableAssignment'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// Vehicle nominations for award consideration. Also public submissions.

export const nominations = pgTable('nominations', {
  id: text('id').primaryKey(),
  reference: text('reference').notNull().unique(),
  company: text('company').notNull(),
  contactName: text('contactName').notNull(),
  contactEmail: text('contactEmail').notNull(),
  make: text('make').notNull(),
  model: text('model').notNull(),
  year: text('year').notNull(),
  engine: text('engine').notNull(),
  horsepower: text('horsepower').notNull(),
  zeroToSixty: text('zeroToSixty').notNull(),
  categories: jsonb('categories').notNull().default([]),
  description: text('description').notNull(),
  submittedAt: text('submittedAt').notNull(),
  status: text('status').notNull().default('received'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})
