import { Type } from '~/components/type'
import Become from './become'

export const runtime = 'edge'

export default function Page() {
  const text = "The only Tutoring platform you'll ever need."
  const words = text.split(' ').map((word, i) => ({
    text: word,
    className:
      i === 2
        ? 'bg-gradient-to-r from-blue-600 via-green-600 to-indigo-600 inline-block text-transparent bg-clip-text tracking-normal mx-1'
        : 'font-normal opacity-60'
  }))
  return (
    <>
      <div className='flex h-screen flex-col items-center justify-center gap-5'>
        <p className='pointer-events-none absolute inset-0 opacity-70 blur-lg invert will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] [background-image:var(--white-gradient),var(--aurora)] [background-position:50%_50%,50%_50%] [background-size:300%,_200%] [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)] after:absolute after:inset-0 after:animate-aurora after:mix-blend-difference after:content-[""] after:[background-attachment:fixed] after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] dark:invert-0 dark:[background-image:var(--dark-gradient),var(--aurora)] after:dark:[background-image:var(--dark-gradient),var(--aurora)]' />
        <Type words={words} className='text-5xl font-bold' />
        <Become />
      </div>
      <div className='h-screen'></div>
    </>
  )
}
