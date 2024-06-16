import Image from 'next/image'

export default function Page() {
  return (
    <div className='mt-10 flex flex-col items-center gap-2'>
      <p className='text-5xl font-light tracking-tighter'>John Doe</p>
      <p className='text-5xl font-light tracking-tighter'>Fullstack Developer</p>
      <div className='mt-20 grid w-[1200px] grid-cols-3'>
        <div className='flex flex-col'>
          <p className='text-xs uppercase text-muted-foreground'>biography</p>
          <p className='mb-16 mt-6 w-48'>
            A fullstack developer with a passion for building beautiful and functional websites.
          </p>
          <p className='text-xs uppercase text-muted-foreground'>contact</p>
          <div className='mb-12 mt-6'>
            <p>Hanoi, Vietnam</p>
            <p>hello@world.com</p>
            <p>+1234567890</p>
          </div>
          <p className='text-xs uppercase text-muted-foreground'>service</p>
          <div className='mb-12 mt-6'>
            <p>Web Development</p>
            <p>UI/UX Design</p>
            <p>Mobile Development</p>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <Image
            src='/ava.jpg'
            alt=''
            width={1000}
            height={1000}
            className='h-[525px] w-96 rounded-full object-cover outline-double outline-2 outline-offset-[30px] outline-stone-200'
          />
        </div>
        <div className='flex flex-col items-end'>
          <p className='text-xs uppercase text-muted-foreground'>years of experience</p>
          <p className='mb-12 mt-6 text-5xl font-light tracking-tighter'>8</p>
          <p className='text-xs uppercase text-muted-foreground'>clients' satisfaction</p>
          <p className='mb-12 mt-6 text-5xl font-light tracking-tighter'>100%</p>
          <p className='text-xs uppercase text-muted-foreground'>clients worldwide</p>
          <p className='mb-12 mt-6 text-5xl font-light tracking-tighter'>80</p>
          <p className='text-xs uppercase text-muted-foreground'>projects done</p>
          <p className='mb-12 mt-6 text-5xl font-light tracking-tighter'>675</p>
        </div>
      </div>
      <div className='mt-12 flex w-[1000px] justify-between'>
        <p className='w-40 text-center text-4xl font-black uppercase leading-10 text-stone-300'>
          nice logo
        </p>
        <p className='w-40 text-center text-4xl font-black uppercase leading-10 text-stone-300'>
          nice logo
        </p>
        <p className='w-40 text-center text-4xl font-black uppercase leading-10 text-stone-300'>
          nice logo
        </p>
        <p className='w-40 text-center text-4xl font-black uppercase leading-10 text-stone-300'>
          nice logo
        </p>
        <p className='w-40 text-center text-4xl font-black uppercase leading-10 text-stone-300'>
          nice logo
        </p>
      </div>
    </div>
  )
}
