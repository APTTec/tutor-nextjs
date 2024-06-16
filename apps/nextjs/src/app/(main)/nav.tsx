'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ExitIcon, PersonIcon } from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'framer-motion'
import { signOut, useSession } from 'next-auth/react'

import { cn } from '@a/ui'
import { Button } from '@a/ui/button'
import { Dialog, DialogClose, DialogTrigger } from '@a/ui/dialog'

import { DialogContent } from '~/components/dialog'
import { Floating } from '~/components/floating'
import Hover from '~/components/hover'
import { navbar } from '~/constant'

const transition = {
  type: 'spring',
  mass: 0.5,
  damping: 10,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001
}

const NavItem = ({
  setActive,
  active,
  item,
  children
}: {
  setActive: (item: React.ReactNode) => void
  active: React.ReactNode | null
  item: React.ReactNode
  children?: React.ReactNode
}) => (
  <div onMouseEnter={() => setActive(item)} className='relative'>
    <motion.p
      transition={{ duration: 0.3 }}
      className={cn(
        active === item && 'font-semibold tracking-normal opacity-100',
        typeof item === 'string' &&
          'cursor-pointer px-5 opacity-70 duration-300 hover:font-semibold hover:tracking-normal hover:opacity-100'
      )}>
      {item}
    </motion.p>
    {active && (
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={transition}>
        {active === item && (
          <div className='absolute left-1/2 -translate-x-1/2 pt-4'>
            <motion.div
              transition={transition}
              layoutId='active'
              className='overflow-hidden rounded-2xl border border-black/[0.2] bg-background shadow-xl backdrop-blur-sm dark:border-white/[0.2]'>
              <motion.div layout className='h-full w-max'>
                {children}
              </motion.div>
            </motion.div>
          </div>
        )}
      </motion.div>
    )}
  </div>
)

export default function Nav({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [active, setActive] = useState<React.ReactNode | null>(null)
  const [hover, setHover] = useState<number | null>(null)
  return (
    <Floating>
      <nav
        onMouseLeave={() => setActive(null)}
        className='relative flex h-10 items-center justify-center rounded-full border p-1.5 dark:border-stone-600'>
        {Object.entries(navbar).map(([key, value], i) => (
          <NavItem key={i} setActive={setActive} active={active} item={key}>
            {value.every(item => item.image) ? (
              <div className='grid grid-cols-2 p-3 text-sm'>
                {value.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                    className='relative'>
                    <AnimatePresence>
                      {hover === i && (
                        <Hover className='absolute -z-10 size-full rounded-xl bg-stone-200 dark:bg-muted' />
                      )}
                    </AnimatePresence>
                    <div className='flex space-x-2 rounded-xl p-3'>
                      <Image
                        src={item.image ?? ''}
                        width={1000}
                        height={1000}
                        alt={item.title}
                        className='h-28 w-36 rounded-lg drop-shadow-2xl'
                      />
                      <div>
                        <p className='mb-1 text-xl'>{item.title}</p>
                        <p className='max-w-40 text-sm text-muted-foreground'>{item.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className='flex flex-col p-1 text-sm'>
                {value.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className='relative'
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}>
                    <AnimatePresence>
                      {hover === i && (
                        <Hover className='absolute -z-10 size-full rounded-xl bg-stone-200 dark:bg-muted' />
                      )}
                    </AnimatePresence>
                    <p className='rounded-xl px-3 py-2'>{item.title}</p>
                  </Link>
                ))}
              </div>
            )}
          </NavItem>
        ))}
        <NavItem setActive={setActive} active={active} item={children}>
          {session && (
            <div className='flex flex-col p-1 text-sm'>
              <Link
                className='group flex w-28 items-center justify-between rounded-xl px-3 py-2 opacity-70 transition-all duration-300 hover:bg-stone-200 hover:opacity-100 dark:hover:bg-muted'
                href='/'>
                Profile
                <PersonIcon className='transition-all duration-300 group-hover:size-5' />
              </Link>
              <Dialog>
                <DialogTrigger className='group flex w-28 items-center justify-between rounded-xl px-3 py-2 opacity-70 transition-all duration-300 hover:bg-stone-200 hover:opacity-100 dark:hover:bg-muted'>
                  Log out
                  <ExitIcon className='transition-all duration-300 group-hover:size-5' />
                </DialogTrigger>
                <DialogContent className='w-fit p-4'>
                  {'Are you sure you want to sign out of ' + session.user.email + '?'}
                  <div className='flex justify-end gap-3'>
                    <DialogClose>
                      <Button variant='secondary'>Cancel</Button>
                    </DialogClose>
                    <Button onClick={() => signOut()} variant='destructive'>
                      Sign Out
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </NavItem>
      </nav>
    </Floating>
  )
}
