import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  smallint,
  text,
  timestamp,
  uuid,
  varchar
} from 'drizzle-orm/pg-core'
import { z } from 'zod'

export const User = pgTable('user', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }),
  emailVerified: timestamp('emailVerified', { mode: 'date', withTimezone: true }),
  image: varchar('image', { length: 255 }),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt', {
    mode: 'string',
    withTimezone: true
  }).$onUpdateFn(() => sql`now()`),

  username: varchar('username', { length: 255 }),
  isTutor: boolean('is_tutor'),
  phone: varchar('phone', { length: 16 }),
  bio: text('bio'),
  location: varchar('location', { length: 255 }),
  title: varchar('title', { length: 255 }),
  topic: varchar('topic', { length: 255 }),
  rate: smallint('rate')
})

export const UpdateUserSchema = z.object({
  id: z.string().min(2),

  name: z.string().min(2).optional(),
  email: z.string().min(2).email().optional(),
  image: z.string().min(2).url().optional(),

  isTutor: z.boolean().optional(),
  username: z.string().min(2).optional(),
  phone: z.string().min(2).optional(),
  bio: z.string().min(2).optional(),
  location: z.string().min(2).optional(),
  title: z.string().min(2).optional(),
  topic: z.string().min(2).optional(),
  rate: z.number().min(1).optional()
})

export const UserRelations = relations(User, ({ many }) => ({ accounts: many(Account) }))

export const Account = pgTable(
  'account',
  {
    userId: uuid('userId')
      .notNull()
      .references(() => User.id, { onDelete: 'cascade' }),
    type: varchar('type', { length: 255 })
      .$type<'email' | 'oauth' | 'oidc' | 'webauthn'>()
      .notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    refresh_token: varchar('refresh_token', { length: 255 }),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: text('id_token'),
    session_state: varchar('session_state', { length: 255 })
  },
  account => ({
    compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] })
  })
)

export const AccountRelations = relations(Account, ({ one }) => ({
  user: one(User, { fields: [Account.userId], references: [User.id] })
}))

export const Session = pgTable('session', {
  sessionToken: varchar('sessionToken', { length: 255 }).notNull().primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => User.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date', withTimezone: true }).notNull()
})

export const SessionRelations = relations(Session, ({ one }) => ({
  user: one(User, { fields: [Session.userId], references: [User.id] })
}))
