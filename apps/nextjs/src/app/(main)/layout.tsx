import { ThemeToggle } from '@a/ui/theme'

import Nav from './nav'
import UserButton from './user'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav>
        <UserButton />
      </Nav>
      <div className='fixed right-1 top-1 focus-visible:ring-0'>
        <ThemeToggle />
      </div>
      {children}
    </>
  )
}
