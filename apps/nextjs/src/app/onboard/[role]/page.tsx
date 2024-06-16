import type { RouterOutputs } from '@a/api'
import { auth } from '@a/auth'

import { api } from '~/trpc/server'
import Wizard from './wizard'

export default async function Page({ params }: { params: { role: 'tutor' | 'student' } }) {
  let isTutor = params.role === 'tutor'
  const { id } = (await auth())?.user ?? {}

  if (id) {
    let user = (await api.user.byId(id)) as RouterOutputs['user']['update']

    if (user && user.isTutor !== isTutor) {
      user = await api.user.update({ id, isTutor })
      isTutor = user?.isTutor ?? !isTutor
    }
    return <Wizard user={user} isTutor={isTutor} />
  }
}
