import { auth } from '@a/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@a/ui/avatar'
import { Button } from '@a/ui/button'

import Login from './login'

export default async function UserButton() {
  const { id, name, email, image } = (await auth())?.user ?? {}
  return id ? (
    <Avatar className='ml-3 size-7 transition-all duration-300 hover:scale-110'>
      {image && <AvatarImage src={image} alt={name ?? ''} />}
      <AvatarFallback>{email}</AvatarFallback>
    </Avatar>
  ) : (
    <Login>
      <Button className='relative ml-3 h-7 overflow-hidden rounded-full p-[1.5px]'>
        <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
        <span className='inline-flex h-full items-center rounded-full bg-background px-2.5 text-sm font-normal text-foreground opacity-80 backdrop-blur-3xl transition-all duration-300 hover:bg-gradient-to-tr hover:from-blue-600 hover:to-purple-600 hover:font-semibold hover:tracking-normal hover:text-white'>
          Log in
        </span>
      </Button>
    </Login>
  )
}
