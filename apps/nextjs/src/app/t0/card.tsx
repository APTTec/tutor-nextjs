'use client'

import type { MotionProps } from 'framer-motion'
import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { cn } from '@a/ui'

interface ShiftCardProps extends Omit<MotionProps, 'onAnimationStart' | 'onAnimationComplete'> {
  className?: string
  topContent?: React.ReactNode
  middleContent?: React.ReactNode
  topAnimateContent?: React.ReactNode
  bottomContent?: React.ReactNode
}

const ShiftCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
    </div>
  )
)
ShiftCardHeader.displayName = 'ShiftCardHeader'

interface ShiftCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  isHovered: boolean
}
const ShiftCardContent = React.forwardRef<HTMLDivElement, ShiftCardContentProps>(
  ({ isHovered, children, ...divProps }, ref) => {
    // Explicitly define motion props to avoid passing incompatible HTML attributes
    const motionProps: MotionProps = {
      initial: { opacity: 0, height: 0 },
      animate: isHovered ? { opacity: 1, height: 194 } : { opacity: 1, height: 38 },
      transition: { duration: 0.5, delay: 0.1 }
    }
    return (
      <motion.div
        key='shift-card-content'
        ref={ref}
        {...motionProps}
        className={divProps.className}>
        {children}
      </motion.div>
    )
  }
)
ShiftCardContent.displayName = 'ShiftCardContent'

const ShiftCard = React.forwardRef<HTMLDivElement, ShiftCardProps>(
  ({ className, topContent, topAnimateContent, middleContent, bottomContent, ...props }, ref) => {
    const [isHovered, setHovered] = React.useState(false)
    const handleMouseEnter = () => setHovered(true)
    const handleMouseLeave = () => setHovered(false)
    const handleTapStart = () => setHovered(true)
    const handleTapCancel = () => setHovered(false)
    const handleTap = () => setHovered(false)
    return (
      <motion.div
        ref={ref}
        className={cn(
          'group relative flex min-h-[240px] w-[280px] flex-col items-center justify-between overflow-hidden rounded-xl bg-card p-3 shadow-inner transition-all duration-500 hover:cursor-pointer hover:drop-shadow-lg md:min-h-[300px] md:w-[300px]',
          className
        )}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTapStart={handleTapStart}
        onTapCancel={handleTapCancel}
        onTap={handleTap}
        {...props}>
        <ShiftCardHeader className='relative flex w-full flex-col'>
          {topContent}
          <AnimatePresence>{isHovered ? <>{topAnimateContent}</> : null}</AnimatePresence>
        </ShiftCardHeader>

        <div className='pb-12'>
          <AnimatePresence>{!isHovered ? <>{middleContent}</> : null}</AnimatePresence>
        </div>

        <ShiftCardContent
          isHovered={isHovered}
          className='absolute inset-x-0 bottom-0 flex flex-col gap-4'>
          <motion.div className='flex w-full flex-col gap-1'>{bottomContent}</motion.div>
        </ShiftCardContent>
      </motion.div>
    )
  }
)

ShiftCard.displayName = 'ShiftCard'

export { ShiftCard, ShiftCardHeader, ShiftCardContent }
