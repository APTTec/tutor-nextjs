import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { GeistMono } from 'geist/font/mono'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'sonner'

import { auth } from '@a/auth'
import { cn } from '@a/ui'
import { ThemeProvider } from '@a/ui/theme'
import { TooltipProvider } from '@a/ui/tooltip'

import { env } from '~/env'
import { TRPCReactProvider } from '~/trpc/react'

import '~/app/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(env.VERCEL_ENV === 'production' ? 'https://...' : 'http://localhost:3000'),
  title: '',
  description: 'Simple monorepo with shared backend for web & mobile apps',
  openGraph: {
    title: '',
    description: 'Simple monorepo with shared backend for web & mobile apps',
    url: 'https://t.vercel.app',
    siteName: ''
  },
  twitter: {
    card: 'summary_large_image',
    site: '@',
    creator: '@'
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}
const buenosAires = localFont({
  src: [
    {
      path: './font/BuenosAires-Thin.woff2',
      weight: '100',
      style: 'normal'
    },
    {
      path: './font/BuenosAires-ThinItalic.woff2',
      weight: '100',
      style: 'italic'
    },
    {
      path: './font/BuenosAires-Light.woff2',
      weight: '200',
      style: 'normal'
    },
    {
      path: './font/BuenosAires-LightItalic.woff2',
      weight: '200',
      style: 'italic'
    },
    {
      path: './font/BuenosAires-Book.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: './font/BuenosAires-BookItalic.woff2',
      weight: '300',
      style: 'italic'
    },
    {
      path: './font/BuenosAires-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './font/BuenosAires-RegularItalic.woff2',
      weight: '400',
      style: 'italic'
    },
    {
      path: './font/BuenosAires-SemiBold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: './font/BuenosAires-SemiBoldItalic.woff2',
      weight: '600',
      style: 'italic'
    },
    {
      path: './font/BuenosAires-Bold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: './font/BuenosAires-BoldItalic.woff2',
      weight: '700',
      style: 'italic'
    },
    {
      path: './font/BuenosAires-Black.woff2',
      weight: '900',
      style: 'normal'
    },
    {
      path: './font/BuenosAires-BlackItalic.woff2',
      weight: '900',
      style: 'italic'
    }
  ]
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background tracking-normal text-foreground antialiased',
          buenosAires.className,
          GeistMono.variable
        )}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <TRPCReactProvider>
            <TooltipProvider delayDuration={0} disableHoverableContent>
              <SessionProvider session={await auth()}>{props.children}</SessionProvider>
            </TooltipProvider>
          </TRPCReactProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
