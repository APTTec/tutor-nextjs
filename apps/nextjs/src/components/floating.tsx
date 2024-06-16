'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'

import { cn } from '@a/ui'

export const Floating = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => {
  const { scrollY, scrollYProgress } = useScroll()

  const [visible, setVisible] = useState(true)
  const [haveShadow, setHaveShadow] = useState(false)

  useMotionValueEvent(scrollYProgress, 'change', current => {
    const direction = current - (scrollYProgress.getPrevious() ?? 0)

    if (direction < 0) {
      setVisible(true)
      setHaveShadow(true)
    } else {
      setVisible(false)
    }
    if (scrollY.get() === 0) {
      setVisible(true)
      setHaveShadow(false)
    }
  })
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        animate={{ y: visible ? 0 : -50 }}
        transition={{ duration: 0 }}
        className={cn(
          'fixed inset-x-0 top-2 z-50 mx-auto max-w-fit rounded-full bg-transparent transition-all duration-300 hover:bg-background hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-stone-800',
          haveShadow && 'bg-background drop-shadow-lg dark:shadow-lg dark:shadow-stone-800',
          className
        )}>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
