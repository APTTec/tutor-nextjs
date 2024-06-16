'use client'

import { motion } from 'framer-motion'

import { cn } from '@a/ui'

interface TypeProps {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  duration?: number
  cursor?: boolean
}

export const Type = ({ words, className, duration = 2, cursor = true }: TypeProps) => (
  <div className='flex'>
    <motion.div
      className='overflow-hidden'
      initial={{ width: '0%' }}
      whileInView={{ width: 'fit-content' }}
      transition={{
        duration: duration,
        ease: 'linear',
        delay: 0
      }}>
      <div className={cn(className, 'whitespace-nowrap')}>
        {words.map((w, idx) => (
          <div key={`w-${idx}`} className={cn(w.className, 'inline-block pb-2')}>
            {w.text.split('').map((c, i) => (
              <span key={i}>{c}</span>
            ))}
            &nbsp;
          </div>
        ))}{' '}
      </div>{' '}
    </motion.div>
    {cursor && (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
        className='block h-12 w-1 rounded-full bg-blue-500'
      />
    )}
  </div>
)
