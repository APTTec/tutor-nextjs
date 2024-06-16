'use client'

import { motion } from 'framer-motion'

import { ShiftCard } from './card'

export default function Page() {
  const topContent = <p className='py-4 pl-5 text-lg'>John Doe</p>
  const topAnimateContent = (
    <motion.img
      transition={{ duration: 0.5 }}
      src='/ava.jpg'
      layoutId='img'
      width={200}
      height={200}
      alt='ava'
      className='absolute right-2 top-2 size-16 rounded-full object-cover shadow-lg'
    />
  )
  const middleContent = (
    <motion.img
      src='/ava.jpg'
      layoutId='img'
      width={200}
      height={200}
      alt='ava'
      className='size-40 rounded-full object-cover'
    />
  )
  const bottomContent = (
    <div className='flex w-full flex-col gap-1 rounded-t-lg px-7'>
      <p className='flex items-center gap-1 py-2.5 text-lg font-medium'>Software Developer</p>
      <p className='w-full text-pretty pb-2 text-sm leading-4 text-muted-foreground'>
        I am a software developer with 5 years of experience in web development. I have worked with
        various technologies like React, Node.js, and MongoDB. I am passionate about building
        applications that solve real-world problems.
      </p>
    </div>
  )
  return (
    <div className='flex items-center justify-center'>
      <ShiftCard
        topContent={topContent}
        topAnimateContent={topAnimateContent}
        middleContent={middleContent}
        bottomContent={bottomContent}
      />
    </div>
  )
}
