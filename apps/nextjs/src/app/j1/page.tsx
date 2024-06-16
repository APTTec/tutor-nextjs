'use client'

import type { LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircledIcon, MagnifyingGlassIcon, SewingPinIcon } from '@radix-ui/react-icons'
import { BookOpenIcon, BugIcon, CogIcon, GraduationCapIcon, RabbitIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { cn } from '@a/ui'
import { Badge } from '@a/ui/badge'
import { Button } from '@a/ui/button'
import { Checkbox } from '@a/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@a/ui/form'
import { Input } from '@a/ui/input'

const levels: string[] = ['beginner', 'easier', 'difficult', 'advanced', 'expert']

type JobType = 'Bug-solving' | 'Pet project' | 'New tech' | 'Lesson 101'

interface JobConfig {
  icon: LucideIcon
  className: string
}

const jobTypes: Record<JobType, JobConfig> = {
  'Bug-solving': { icon: BugIcon, className: 'to-red-200' },
  'Pet project': { icon: RabbitIcon, className: 'to-green-200' },
  'New tech': { icon: CogIcon, className: 'to-blue-200' },
  'Lesson 101': { icon: BookOpenIcon, className: 'to-yellow-200' }
}

interface JobProps {
  type: JobType
  level: number
}

const Job = ({ type, level }: JobProps) => {
  const Icon = jobTypes[type].icon
  const [clamp, setClamp] = useState(true)

  const exampleBadges = ['Web Development', 'JavaScript', 'React', 'HTML', 'CSS']

  return (
    <div
      className={cn(
        'group flex flex-col rounded-xl bg-gradient-to-tr from-background via-background bg-[size:180%] bg-[position:0%_0%] p-5 shadow-inner transition-all duration-500 hover:bg-[position:100%_100%] hover:drop-shadow-xl',
        jobTypes[type].className
      )}>
      <div className='flex justify-between'>
        <div>
          <p className='text-xs text-muted-foreground'>Post 1 day ago</p>
          <p className='text-2xl tracking-tight transition-all duration-300'>
            Help me learn React to build a website
          </p>
          <p className='my-3 text-xs text-muted-foreground'>Hourly: $10.00-$30.00</p>
        </div>
        <p className='h-fit cursor-pointer rounded-full border border-muted-foreground px-2 text-xs opacity-50 transition-all duration-500 hover:bg-foreground hover:text-background group-hover:text-base group-hover:opacity-100'>
          {type}
        </p>
        <Icon className='hidden' />
        {/* <div className='flex flex-col items-end gap-1.5'>
          <Icon
            strokeWidth={1.5}
            className='size-10 text-muted-foreground transition-all duration-500 group-hover:size-6 group-hover:text-foreground'
          />
          <p className='cursor-pointer rounded-full border border-foreground px-2 opacity-0 transition-all duration-500 hover:bg-foreground hover:text-background group-hover:opacity-60'>
            {type}
          </p>
        </div> */}
      </div>
      <p className={clamp ? 'line-clamp-2' : ''}>
        I'm looking for someone to help me learn React to build a website. I'm a beginner and I'm
        looking for someone who can help me learn the basics. I'm looking for someone who is patient
        and can explain things in a way that is easy to understand. If you're interested, please
        reach out to me. Thanks!
      </p>
      <button onClick={() => setClamp(!clamp)} className='text-left text-blue-600 hover:underline'>
        {clamp ? 'more' : 'less'}
      </button>
      <div className='my-3 flex gap-2'>
        {exampleBadges.map((badge, i) => (
          <Badge key={i} className='h-8 rounded-full text-sm font-normal' variant='secondary'>
            {badge}
          </Badge>
        ))}
      </div>
      <div className='flex gap-10 text-xs font-medium text-muted-foreground'>
        <div className='flex items-center gap-1.5'>
          <CheckCircledIcon />
          <p>Payment verified</p>
        </div>
        <div className='flex items-center gap-1 capitalize'>
          {levels[level]}
          {levels.map((_, i) => (
            <div
              className={cn('size-2.5 rounded-full', level >= i ? 'bg-blue-500' : 'bg-stone-300')}
            />
          ))}
        </div>
        <div className='flex items-center gap-1'>
          <SewingPinIcon />
          <p>United States</p>
        </div>
      </div>
      <p className='mt-3 text-xs text-muted-foreground'>
        Proposals:
        <span className='font-semibold'> 5 to 10</span>
      </p>
    </div>
  )
}

const exampleJobs: JobProps[] = [
  { type: 'Bug-solving', level: 0 },
  { type: 'Pet project', level: 1 },
  { type: 'New tech', level: 2 },
  { type: 'Lesson 101', level: 3 }
]

const FormSchema = z.object({
  items: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one item.'
  })
})

function Checkboxes({ items }: { items: string[] }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: []
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast(JSON.stringify(data, null, 2))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='items'
          render={() => (
            <FormItem>
              {items.map(item => (
                <FormField
                  key={item}
                  control={form.control}
                  name='items'
                  render={({ field }) => (
                    <FormItem
                      key={item}
                      className='flex items-start space-x-2 space-y-0 opacity-70'>
                      <FormControl>
                        <Checkbox
                          checked={field.value.includes(item)}
                          onCheckedChange={checked =>
                            checked
                              ? field.onChange([...field.value, item])
                              : field.onChange(field.value.filter(value => value !== item))
                          }
                        />
                      </FormControl>
                      <FormLabel className='capitalize'>{item}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='hidden'>
          Submit
        </Button>
      </form>
    </Form>
  )
}
export default function Page() {
  return (
    <div className='flex w-full flex-col'>
      <div className='flex justify-between border-b p-8'>
        <div className='flex items-center gap-2 text-2xl font-bold text-blue-500'>
          <GraduationCapIcon className='size-8' strokeWidth={1} />
          supergood
        </div>
        <div className='relative'>
          <MagnifyingGlassIcon className='absolute left-1.5 top-1 size-8 opacity-30' />
          <Input className='h-10 w-72 rounded-full pl-10' placeholder='Search jobs' />
        </div>
      </div>
      <div className='mx-auto flex gap-16 pt-8'>
        <div className='mt-10 flex flex-col'>
          <p className='mx-auto text-2xl font-semibold'>Filters</p>
          <p className='my-10 h-px rounded-full bg-foreground opacity-25' />
          <p className='-ml-1 mb-2.5 font-semibold'>Level</p>
          <Checkboxes items={levels} />
          <p className='my-10 h-px rounded-full bg-foreground opacity-25' />
          <p className='-ml-1 mb-2.5 font-semibold'>Job type</p>
          <Checkboxes items={Object.keys(jobTypes)} />
        </div>
        <div className='grid max-w-7xl grid-cols-2 gap-5'>
          {exampleJobs.map((job, i) => (
            <Job key={i} {...job} />
          ))}
        </div>
      </div>
    </div>
  )
}
