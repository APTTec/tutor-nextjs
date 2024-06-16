import { GraduationCapIcon } from 'lucide-react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <p className='ml-8 mt-8 flex items-center gap-2 text-2xl font-bold text-blue-500'>
        <GraduationCapIcon className='size-8' strokeWidth={1} />
        supergood
      </p>
      {children}
    </>
  )
}
