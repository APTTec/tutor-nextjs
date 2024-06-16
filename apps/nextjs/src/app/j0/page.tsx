'use client'

import { useEffect, useState } from 'react'
import { CheckCircledIcon, SewingPinIcon } from '@radix-ui/react-icons'

import { Badge } from '@a/ui/badge'

import Circle from '~/components/circle'

interface Level {
  name: string
  value: number
  color: string
}
const levels: Level[] = [
  { name: 'Entry', value: 30, color: 'greenyellow' },
  { name: 'Medium', value: 55, color: 'gold' },
  { name: 'Expert', value: 80, color: 'red' }
]

const Level = ({ level }: { level: number }) => {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const handleIncrement = () => levels[level]?.value ?? 0
    setValue(handleIncrement)
    const interval = setInterval(() => setValue(handleIncrement), 2000)
    return () => clearInterval(interval)
  }, [])
  return (
    <Circle
      className='size-16 text-xs font-light tracking-tight'
      value={value}
      gaugePrimaryColor={levels[level]?.color}>
      {levels[level]?.name}
    </Circle>
  )
}

export default function Page() {
  const [clamp, setClamp] = useState(true)
  return (
    <div className='mt-8 w-full'>
      <div className='mx-auto grid max-w-7xl grid-cols-2 gap-5 p-5'>
        <div className='group flex flex-col rounded-xl border-2 border-transparent bg-background p-5 drop-shadow-sm transition-all duration-300 hover:border-blue-200 hover:drop-shadow-xl'>
          <div className='flex justify-between'>
            <div>
              <p className='text-xs text-muted-foreground'>Post 1 day ago</p>
              <p className='text-2xl tracking-tight transition-all duration-300 group-hover:text-blue-600'>
                Help me learn React to build a website
              </p>

              <p className='my-3 text-xs text-muted-foreground'>
                Hourly: $10.00-$30.00 - Medium - Est. Time: Less than 30 hrs/week
              </p>
            </div>
            <Level level={0} />
          </div>
          <p className={clamp ? 'line-clamp-2' : ''}>
            I'm looking for someone to help me learn React to build a website. I'm a beginner and
            I'm looking for someone who can help me learn the basics. I'm looking for someone who is
            patient and can explain things in a way that is easy to understand. If you're
            interested, please reach out to me. Thanks!
          </p>
          <button
            onClick={() => setClamp(!clamp)}
            className='text-left text-blue-600 hover:underline'>
            {clamp ? 'more' : 'less'}
          </button>
          <div className='my-3 flex gap-2'>
            <Badge
              className='h-8 rounded-full text-sm font-normal text-muted-foreground'
              variant='secondary'>
              Web Development
            </Badge>
            <Badge
              className='h-8 rounded-full text-sm font-normal text-muted-foreground'
              variant='secondary'>
              JavaScript
            </Badge>
            <Badge
              className='h-8 rounded-full text-sm font-normal text-muted-foreground'
              variant='secondary'>
              React
            </Badge>
            <Badge
              className='h-8 rounded-full text-sm font-normal text-muted-foreground'
              variant='secondary'>
              HTML
            </Badge>
            <Badge
              className='h-8 rounded-full text-sm font-normal text-muted-foreground'
              variant='secondary'>
              CSS
            </Badge>
          </div>
          <div className='flex gap-10 text-xs font-medium text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <CheckCircledIcon />
              <p>Payment verified</p>
            </div>
            <div className='flex items-center gap-2'>
              <SewingPinIcon />
              <p>United States</p>
            </div>
          </div>
          <p className='mt-3 text-xs text-muted-foreground'>
            Proposals:
            <span className='font-semibold'> 5 to 10</span>
          </p>
        </div>
      </div>
    </div>
  )
}
