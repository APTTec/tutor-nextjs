import { FaFacebook } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'

import { signIn } from '@a/auth'
import { Button } from '@a/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@a/ui/drawer'

interface LoginProps {
  children: React.ReactNode
  to?: string
}

export default function Login({ children, to }: LoginProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className='mx-auto w-fit'>
        <p className='pt-3 text-center'>Continue with</p>
        <div className='flex gap-5 p-5'>
          <form
            action={async () => {
              'use server'
              await signIn('google', { redirectTo: to })
            }}>
            <Button
              variant='outline'
              size='lg'
              className='group size-36 flex-col gap-1 rounded-2xl text-base font-normal drop-shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:drop-shadow-lg'>
              <FcGoogle className='size-16 transition-all duration-300' />
              <div className='transition-all duration-300 group-hover:font-semibold group-hover:tracking-normal'>
                Google
              </div>
            </Button>
          </form>
          <form
            action={async () => {
              'use server'
              await signIn('facebook', { redirectTo: to })
            }}>
            <Button
              variant='outline'
              size='lg'
              className='group size-36 flex-col gap-1 rounded-2xl text-base font-normal drop-shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:drop-shadow-lg'>
              <FaFacebook className='size-16 scale-90 text-blue-600 transition-all duration-300' />
              <div className='transition-all duration-300 group-hover:font-semibold group-hover:tracking-normal'>
                Facebook
              </div>
            </Button>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
