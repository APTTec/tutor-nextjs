import Image from 'next/image'

export default function Page() {
  const name = 'John Doe'
  const title = 'Software Developer'

  return (
    <div className='flex gap-3 p-3'>
      <div className='group h-96 w-80 rounded-xl border-t bg-background p-5 shadow drop-shadow transition-all duration-500 hover:drop-shadow-xl'>
        <div className='flex flex-col items-center'>
          <div className='mb-3 flex items-center justify-start transition-all duration-500'>
            <Image
              className='size-56 rounded-full object-cover transition-all duration-500 group-hover:size-20'
              src='/ava.jpg'
              alt=''
              width={500}
              height={500}
            />
            <div className='flex w-0 -translate-x-28 flex-col -space-y-1.5 tracking-tight opacity-0 transition-all duration-500 group-hover:ml-3 group-hover:mt-7 group-hover:w-48 group-hover:translate-x-0 group-hover:opacity-100'>
              <p className='line-clamp-1 font-bold transition-all duration-500 group-hover:text-xl'>
                {name}
              </p>
              <p className='line-clamp-1 font-medium text-muted-foreground transition-all duration-500 group-hover:text-lg'>
                {title}
              </p>
            </div>
          </div>
          <div className='flex h-16 flex-col items-center opacity-100 transition-all duration-500 group-hover:h-0 group-hover:translate-y-32 group-hover:opacity-0'>
            <p className='line-clamp-1 text-2xl font-bold'>{name}</p>
            <p className='line-clamp-1 text-xl font-medium text-muted-foreground'>{title}</p>
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
      </div>
    </div>
  )
}
