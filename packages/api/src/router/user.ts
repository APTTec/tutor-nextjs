import type { TRPCRouterRecord } from '@trpc/server'
import { z } from 'zod'

import { eq } from '@a/db'
import { UpdateUserSchema, User } from '@a/db/schema'

import { protectedProcedure, publicProcedure } from '../trpc'

export const userRouter = {
  byId: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => ctx.db.query.User.findFirst({ where: eq(User.id, input) })),

  update: protectedProcedure.input(UpdateUserSchema).mutation(({ ctx, input }) =>
    ctx.db
      .update(User)
      .set(input)
      .where(eq(User.id, input.id))
      .returning()
      .then(value => value[0] ?? null)
  )
} satisfies TRPCRouterRecord
