import { redirect } from 'next/navigation'

import type { RouterOutputs } from '@a/api'
import { auth } from '@a/auth'
import { Button } from '@a/ui/button'

import { api } from '~/trpc/server'
import Login from './login'

const BottomGradient = () => (
  <>
    <span className='absolute inset-x-0 -bottom-px mx-auto block h-[2px] w-2/3 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover:opacity-100' />
    <span className='absolute -bottom-px block h-[2px] w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover:opacity-100' />
  </>
)

export default async function Become() {
  const { id } = (await auth())?.user ?? {}
  if (id) {
    const user = (await api.user.byId(id)) as RouterOutputs['user']['update']
    if (user?.isTutor == null) {
      redirect('/onboard')
    }
  } else {
    return (
      <div className='z-10 flex gap-5'>
        <Login to='/onboard/tutor'>
          <Button
            className='group inline-flex animate-shimmer items-center justify-center rounded-lg border bg-[linear-gradient(110deg,#f3f4f6,45%,#e5e7eb,55%,#f3f4f6)] bg-[length:200%_100%] drop-shadow-sm transition-all hover:-translate-y-px hover:drop-shadow-lg dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]'
            variant='secondary'>
            <p className='font-normal tracking-tight opacity-70 transition-all duration-300 group-hover:font-semibold group-hover:opacity-90'>
              Become our Tutor
            </p>
            <span className='absolute -bottom-0.5 left-[1.125rem] h-[2px] w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40' />
            <BottomGradient />
          </Button>
        </Login>
        <Login to='/onboard/student'>
          <Button className='group inline-flex animate-shimmer items-center justify-center rounded-lg border bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] drop-shadow-sm transition-all hover:-translate-y-px hover:drop-shadow-lg dark:bg-[linear-gradient(110deg,#f3f4f6,45%,#e5e7eb,55%,#f3f4f6)]'>
            <p className='font-normal tracking-tight opacity-70 transition-all duration-300 group-hover:font-semibold group-hover:opacity-90'>
              Find a Tutor
            </p>
            <span className='absolute -bottom-0.5 left-[1.125rem] h-[2px] w-[calc(100%-2.25rem)] bg-gradient-to-r from-red-400/0 via-red-400/90 to-red-400/0 transition-opacity duration-500 group-hover:opacity-40' />
            <BottomGradient />
          </Button>
        </Login>
      </div>
    )
  }
}
