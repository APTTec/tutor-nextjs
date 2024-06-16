'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import { GraduationCapIcon, UserRoundSearchIcon } from 'lucide-react'

import { Generate } from '~/components/generate'
import Hover from '~/components/hover'

interface RoleInfo {
  title: string
  description: string
  image: string
  href: string
  icon: React.ReactNode
}

const roles: RoleInfo[] = [
  {
    title: 'I want to be a Tutor',
    description:
      'Join our platform as a tutor and help students learn new skills. Build your own profile and start earning by teaching others.',
    image: 'https://img.freepik.com/seminar-concept-illustration_114360-7480.jpg',
    href: '/onboard/tutor',
    icon: <UserRoundSearchIcon strokeWidth={1.5} className='size-8' />
  },
  {
    title: 'I want to be a Student',
    description:
      'Join our platform as a student and learn new skills from our tutors. Book lessons and start learning new skills today.',
    image: 'https://img.freepik.com/focused-tiny-people-reading-books_74855-5836.jpg',
    href: '/onboard/student',
    icon: <GraduationCapIcon strokeWidth={1.5} className='size-8' />
  }
]

const Page = () => {
  const [hover, setHover] = useState<number | null>(null)
  return (
    <div className='flex h-screen'>
      <div className='m-auto'>
        <Generate
          text='Please select your role'
          duration={0.15}
          className='mb-7 text-center text-xl'
        />
        <div className='flex flex-col sm:flex-row'>
          {roles.map((role, i) => (
            <Link
              key={i}
              href={role.href}
              className='relative'
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}>
              <AnimatePresence>
                {hover === i && <Hover className='absolute -z-10 size-full rounded-xl bg-muted' />}
              </AnimatePresence>
              <div className='group z-10 m-3 flex w-96 flex-col justify-center gap-3 rounded-xl border-2 p-5 transition-all duration-300 hover:border-blue-500 hover:drop-shadow-xl'>
                <div className='flex items-center gap-3 transition-all duration-300 group-hover:font-semibold group-hover:tracking-tighter group-hover:text-blue-600 dark:group-hover:text-blue-300'>
                  {role.icon}
                  <p className='text-2xl'>{role.title}</p>
                </div>
                <Image
                  src={role.image}
                  width={1000}
                  height={1000}
                  alt={role.title}
                  className='h-60 rounded-xl'
                />
                <p className='text-wrap'>{role.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
