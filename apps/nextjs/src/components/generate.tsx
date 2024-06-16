'use client'

import { useEffect } from 'react'
import { motion, stagger, useAnimate } from 'framer-motion'

interface GenerateProps {
  text: string
  duration: number
  className?: string
}

export const Generate = ({ text, duration, className }: GenerateProps) => {
  const [scope, animate] = useAnimate()
  useEffect(
    () => void animate('span', { opacity: 1 }, { duration: 1, delay: stagger(duration) }),
    [animate, duration]
  )

  return (
    <motion.div ref={scope} className={className}>
      {text.split(' ').map((w, i) => (
        <motion.span key={i} className='opacity-0'>
          {w}{' '}
        </motion.span>
      ))}
    </motion.div>
  )
}
