'use client'

import type { IconProps } from '@radix-ui/react-icons/dist/types'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  BookmarkIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  InfoCircledIcon,
  MobileIcon,
  Pencil2Icon,
  SewingPinIcon,
  StarIcon,
  UpdateIcon
} from '@radix-ui/react-icons'
import { DollarSign } from 'lucide-react'
import { toast } from 'sonner'

import type { RouterOutputs } from '@a/api'
import { UpdateUserSchema } from '@a/db/schema'
import { Button } from '@a/ui/button'
import { Dialog } from '@a/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@a/ui/form'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@a/ui/hover-card'
import { Input } from '@a/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@a/ui/select'

import { DialogContent } from '~/components/dialog'
import { Generate } from '~/components/generate'
import { Step, Stepper, useStepper } from '~/components/stepper'
import { Textarea } from '~/components/textarea'
import { Type } from '~/components/type'
import { useForm } from '~/hook/use-form'
import { api } from '~/trpc/react'

type User = RouterOutputs['user']['update']

type Field =
  | 'name'
  | 'email'
  | 'username'
  | 'phone'
  | 'title'
  | 'image'
  | 'bio'
  | 'location'
  | 'topic'
  | 'rate'

interface Step {
  field: Field
  icon: React.FC<IconProps> | LucideIcon
  heading: string
  image: string
  tutor: string
  student: string
}

const steps: Step[] = [
  {
    field: 'name',
    icon: FaceIcon,
    heading: "What's your *name* ?",
    image:
      'https://img.freepik.com/set-human-cartoon-character-greeting-collection-isolated-illustration_1150-37221.jpg',
    tutor:
      "First things first, let's personalize your profile! \n\nWhat's your name? This will be displayed for students looking to connect with tutors.",
    student: "Let's start by getting to know you a bit better!  What's your name?"
  },
  {
    field: 'email',
    icon: EnvelopeClosedIcon,
    heading: 'What is your *email* address ?',
    image:
      'https://img.freepik.com/email-marketing-internet-chatting-24-hours-support_335657-3009.jpg',
    tutor:
      "Your email address is important for account verification and receiving notifications from students. \n\nPlease enter the email address you'd like to use with our platform",
    student:
      "To create your account and connect with tutors, we'll need your email address. This is where we'll send you important updates and information about your tutoring sessions."
  },
  {
    field: 'phone',
    icon: MobileIcon,
    heading: 'What is your *phone number* ?',
    image: 'https://img.freepik.com/adult-talking-cell-phone-concept-illustration_114360-9555.jpg',
    tutor:
      'For clear and efficient communication with your students, we require your phone number. \n\nThis allows you to easily exchange contact information for scheduling sessions, quick questions, or follow-up discussions outside the platform, if needed.',
    student:
      'To ensure smooth communication with your tutor, we require your phone number. This allows you and your tutor to easily exchange contact information for scheduling sessions, quick questions, or follow-up discussions outside the platform, if needed.'
  },
  {
    field: 'title',
    icon: BookmarkIcon,
    heading: 'What is your *job title* ?',
    image: 'https://img.freepik.com/hand-drawn-business-strategy_23-2149164272.jpg',
    tutor:
      'Do you have a formal job title related to your tutoring expertise? Are you a professor, teacher, industry professional, or independent tutor? \n\nSharing your title can help students understand your qualifications.',
    student:
      'Are you a current student, recent graduate, or working professional seeking to enhance your skills? Sharing your title can help us connect you with tutors who understand your academic goals.'
  },
  {
    field: 'bio',
    icon: Pencil2Icon,
    heading: 'Write a short *biography*',
    image: 'https://img.freepik.com/live-collaboration-concept-illustration_114360-663.jpg',
    tutor:
      'Introduce yourself! Are you a seasoned teacher passionate about sharing your expertise, a recent graduate with fresh knowledge in a specific field, or a subject matter enthusiast ready to guide students?',
    student:
      'Let us know! Are you a high school student tackling college applications, a college student needing a boost in a specific subject, or a lifelong learner seeking to expand your knowledge?'
  },
  {
    field: 'location',
    icon: SewingPinIcon,
    heading: 'Where are you *located* ?',
    image: 'https://img.freepik.com/map-light-concept-illustration_114360-192.jpg',
    tutor:
      'Where are you located? Sharing your location can help students find tutors in their area.',
    student:
      'Where are you located? Sharing your location can help us connect you with tutors in your area.'
  },
  {
    field: 'topic',
    icon: StarIcon,
    heading: 'What *subjects* interest you ?',
    image: 'https://img.freepik.com/internet-forum-abstract-concept-illustration_335657-3679.jpg',
    tutor:
      'What subjects do you excel at tutoring? Sharing your areas of expertise will make you more visible to students seeking your guidance.',
    student:
      'What subject areas are you seeking help with? Knowing your specific needs will help us match you with the perfect tutor.'
  },
  {
    field: 'rate',
    icon: DollarSign,
    heading: 'What is your ideal *hourly rate* ?',
    image:
      'https://img.freepik.com/free-vector/tiny-students-sitting-near-books-getting-university-degree-paying-money-education-business-flat-vector-illustration-college-scholarship-finance-system-school-fee-economy-student-loan-concept_74855-21037.jpg',
    tutor:
      'How much do you charge for your tutoring services? \n\nSetting your rate will help students understand your pricing and budget accordingly.',
    student:
      'What is your budget for tutoring services? Knowing your budget will help us match you with tutors who meet your financial needs.'
  }
]

export default function Wizard({ user, isTutor }: { user: User; isTutor: boolean }) {
  const [open, setOpen] = useState(false)
  const [savedUser, setSavedUser] = useState<User>(user)

  function SingleFieldForm({ step }: { step: Step }) {
    const { nextStep, prevStep, isLastStep, isDisabledStep } = useStepper()

    const f = step.field
    const form = useForm({
      schema: UpdateUserSchema,
      defaultValues: { id: user?.id, [f]: savedUser?.[f] }
    })
    const utils = api.useUtils()
    const updateUser = api.user.update.useMutation({
      onSuccess: async data => {
        if (savedUser && data) {
          setSavedUser({ ...savedUser, [f]: data[f] })
        }
        toast.success(`${f} updated`)
        toast.dismiss()
        nextStep()
        form.reset()
        await utils.user.invalidate()
      },
      onError: err => {
        toast.error(err.data?.code === 'UNAUTHORIZED' ? 'Log in to update' : 'Update failed')
        toast.dismiss()
      }
    })

    const bold = step.heading.split('*')[1] ?? ''
    const words = step.heading
      .replaceAll(`*${bold}*`, '$')
      .split(' ')
      .map(word => ({
        text: word === '$' ? bold : word,
        className:
          word === '$'
            ? // ? 'bg-gradient-to-r from-blue-600 via-green-600 to-indigo-600 inline-block text-transparent bg-clip-text tracking-normal mx-0.5'
              'text-blue-700 mx-0.5'
            : 'tracking-tight mx-0.5'
      }))

    return (
      <Form {...form}>
        <form
          className='mx-auto mt-[4.5rem] flex h-[47rem] w-[70rem] flex-col gap-20 sm:flex-row'
          onSubmit={form.handleSubmit(data => {
            if (form.getValues(f) !== savedUser?.[f]) {
              toast.loading(`Updating ${f} ...`)
              updateUser.mutate(data)
            } else {
              nextStep()
            }
          })}>
          <div className='flex h-fit w-[50rem] flex-col items-start gap-7 rounded-[3rem] bg-blue-50 p-10 transition-all duration-300 hover:drop-shadow-xl dark:bg-blue-950'>
            <div className='flex items-center gap-6 text-4xl font-black'>
              <FaceIcon className='size-8 text-blue-600' />
              Key tips
            </div>
            <Generate
              text={isTutor ? step.tutor : step.student}
              duration={0.08}
              className='whitespace-pre-line text-base'
            />
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 3 }}
              className='overflow-hidden rounded-xl'>
              <Image
                alt=''
                src={step.image}
                className='rounded-xl object-cover'
                width={1000}
                height={1000}
              />
            </motion.div> */}
          </div>
          <div className='-mr-10 flex w-full grow flex-col gap-10'>
            <Type words={words} className='text-[40px] font-black' duration={0.5} cursor={false} />
            {/* <Emphasize
              words={words}
              className='text-[40px] font-black flex flex-wrap leading-tight -mr-24'
            /> */}
            <div className='flex w-full items-center gap-3'>
              <FormField
                control={form.control}
                name={f}
                render={({ field }) => (
                  <FormItem className='relative grow'>
                    <div className='absolute left-5 mt-7'>
                      {updateUser.isPending ? (
                        <UpdateIcon className='size-10 animate-spin opacity-50 duration-700' />
                      ) : (
                        <step.icon className='size-10 opacity-50' />
                      )}
                    </div>
                    <FormControl>
                      {step.field === 'bio' ? (
                        <Textarea
                          className='rounded-xl border-none bg-muted py-6 pl-20 text-base shadow-md focus-visible:bg-background focus-visible:ring-0'
                          {...field}
                          disabled={updateUser.isPending}
                        />
                      ) : (
                        <Input
                          className='h-20 rounded-xl border-none bg-muted pl-20 text-base shadow-md focus-visible:bg-background focus-visible:ring-0'
                          {...field}
                          disabled={updateUser.isPending}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='mx-auto mt-auto flex gap-3'>
              {!isDisabledStep && (
                <Button
                  onClick={prevStep}
                  className='h-14 w-36 rounded-3xl text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:drop-shadow-lg'
                  size='lg'
                  variant='secondary'>
                  Go back
                </Button>
              )}
              {isLastStep ? (
                <Button
                  className='h-14 w-36 rounded-3xl bg-blue-600 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:drop-shadow-lg'
                  size='lg'>
                  Finish
                </Button>
              ) : (
                <Button
                  disabled={!form.getValues(f) || updateUser.isPending}
                  className='h-14 w-36 rounded-3xl bg-blue-600 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:drop-shadow-lg'
                  size='lg'
                  type='submit'>
                  Next
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    )
  }

  useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <Stepper
      className='mt-9'
      variant='line'
      initialStep={steps.findIndex(s => !savedUser?.[s.field])}
      steps={Array(steps.length).fill({})}
      onClickStep={(step, setStep) => setStep(step)}>
      {steps.map(s => (
        <Step
          key={s.field}
          // label={s.field.charAt(0).toUpperCase() + s.field.slice(1)}
          // isCompletedStep={!!savedUser?.[s.field]}
          icon={s.icon}>
          <SingleFieldForm step={s} />
        </Step>
      ))}
      <Step>
        <div className='mx-auto mt-[4.5rem] flex h-[47rem] w-[70rem] flex-col gap-20 sm:flex-row'>
          <div className='flex h-fit w-[50rem] flex-col items-start gap-7 rounded-[3rem] bg-blue-50 p-10 transition-all duration-300 hover:drop-shadow-xl dark:bg-blue-950'>
            <div className='flex items-center gap-6 text-4xl font-black'>
              <FaceIcon className='size-8 text-blue-600' />
              Key tips
            </div>
            <Generate
              text={
                'Screening questions help you understand your tutor’s qualifications, teaching style, and availability. \n\nThese questions are designed to help you find the perfect tutor for your learning needs. \n\nWe recommend adding at least 3 questions to help you make an informed decision.'
              }
              duration={0.08}
              className='whitespace-pre-line text-base'
            />
          </div>
          <div className='-mr-10 flex w-full grow flex-col'>
            <p className='text-[40px] font-black'>Screening Questions</p>
            <div className='flex w-full flex-col gap-5'>
              <p className='mt-5 text-lg font-semibold'>Question 1*</p>
              <Textarea
                className='rounded-xl border-none bg-muted p-5 text-base shadow-md focus-visible:bg-background focus-visible:ring-0'
                placeholder='How long have you been tutoring this subject?'
              />
              <div className='flex justify-between'>
                <div className='flex flex-col gap-3'>
                  Respond type
                  <Select>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Numeric' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='boolean'>Yes / No</SelectItem>
                      <SelectItem value='numeric'>Numeric</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='flex flex-col gap-3'>
                  Ideal
                  <Input type='number' className='w-[180px]' placeholder='1' />
                </div>
              </div>
              <p className='mt-5 text-lg font-semibold'>Question 2*</p>
              <Textarea
                className='rounded-xl border-none bg-muted p-5 text-base shadow-md focus-visible:bg-background focus-visible:ring-0'
                placeholder='Do you have a degree or certification in this subject?'
              />
              <div className='flex justify-between'>
                <div className='flex flex-col gap-3'>
                  Respond type
                  <Select>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Yes / No' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='boolean'>Yes / No</SelectItem>
                      <SelectItem value='numeric'>Numeric</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='flex flex-col gap-3'>
                  Ideal
                  <Select>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Yes' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='boolean'>Yes</SelectItem>
                      <SelectItem value='numeric'>No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button variant='secondary' className='mx-auto mt-3 w-fit rounded-full'>
                + Add question
              </Button>
            </div>
            <div className='mx-auto mt-auto flex gap-3'>
              <Button
                className='h-14 w-36 rounded-3xl text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:drop-shadow-lg'
                size='lg'
                variant='secondary'>
                Go back
              </Button>
              <Button
                className='h-14 w-36 rounded-3xl bg-blue-600 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:drop-shadow-lg'
                size='lg'
                type='submit'>
                Next
              </Button>
            </div>
          </div>
        </div>
      </Step>

      <HoverCard>
        <HoverCardTrigger>
          <InfoCircledIcon className='opacity-5' />
        </HoverCardTrigger>
        <HoverCardContent className='w-full p-1'>
          <pre>{JSON.stringify(savedUser, null, 2)}</pre>
        </HoverCardContent>
      </HoverCard>

      <Dialog open={open}>
        <DialogContent className='w-2/3 max-w-full'>
          <div className='grid grid-cols-2 gap-3'>
            <div className='flex flex-col gap-8 p-2'>
              <p className='text-4xl font-semibold tracking-tighter'>
                Welcome to our community of learners and educators!
              </p>
              <Generate
                text={
                  isTutor
                    ? "We're thrilled to have you join our vibrant community of educators. Here, you can share your knowledge and passion for learning with students who seek your expertise. This brief wizard will help you set up your profile and showcase your qualifications to potential students. \n\nThis quick and easy wizard will help you get started on your tutoring journey. In just a few steps, you'll be ready to connect with students who are eager to learn from you!"
                    : "Whether you need a helping hand with a specific subject or want to boost your overall knowledge, we're here to connect you with expert tutors who can guide you on your learning journey. This platform connects you with experienced and passionate tutors who can guide you towards success. \n\nThis quick and easy wizard will help you get started on your student journey. In just a few steps, you'll be ready to connect with the perfect match to achieve your academic goals."
                }
                duration={0.05}
                className='whitespace-pre-line text-xl'
              />
            </div>
            <div className='relative'>
              <Image
                src={
                  isTutor
                    ? 'https://img.freepik.com/seminar-concept-illustration_114360-7480.jpg'
                    : 'https://img.freepik.com/focused-tiny-people-reading-books_74855-5836.jpg'
                }
                fill={true}
                alt='onboard'
                className='size-fit rounded-xl object-cover'
              />
            </div>
          </div>
          <Button
            className='h-12 w-full rounded-xl text-base transition-all duration-300 hover:-translate-y-0.5'
            onClick={() => setOpen(false)}>
            Let's do it
          </Button>
        </DialogContent>
      </Dialog>
    </Stepper>
  )
}
