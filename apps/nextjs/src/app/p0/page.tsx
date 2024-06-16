import Image from 'next/image'

import { Avatar, AvatarFallback } from '@a/ui/avatar'
import { Badge } from '@a/ui/badge'
import { Button } from '@a/ui/button'
import { Card, CardContent, CardFooter } from '@a/ui/card'

export default function Page() {
  return (
    <div className='mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8'>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
        <div className='col-span-1 flex flex-col items-center'>
          <div className='size-32 overflow-hidden rounded-full'>
            <Image
              src='/ava.png'
              width={128}
              height={128}
              alt='Profile Picture'
              className='size-full object-cover'
            />
          </div>
          <Button variant='outline' className='mt-4'>
            Change Photo
          </Button>
        </div>
        <div className='col-span-2 space-y-6'>
          <div>
            <h2 className='text-3xl font-bold'>Chris Evans</h2>
            <p>San Francisco, United States</p>
            <p className='mt-4 text-sm text-muted-foreground'>
              I am an art lover and enjoy exploring the vibrant cultural scene in my city. I love
              attending art exhibitions, concerts, and literary events, and I am always eager to
              discover new creative talents and perspectives.
            </p>
          </div>
          <div>
            <h3 className='text-xl font-bold'>Skills</h3>
            <div className='mt-4 flex flex-wrap gap-2'>
              <Badge variant='secondary'>Painting</Badge>
              <Badge variant='secondary'>Jazz Music</Badge>
              <Badge variant='secondary'>Poetry</Badge>
              <Badge variant='secondary'>Theatre</Badge>
              <Badge variant='secondary'>Photography</Badge>
            </div>
          </div>
          <div>
            <h3 className='text-xl font-bold'>Achievements</h3>
            <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <Card>
                <CardContent className='p-6'>
                  <h4 className='text-pretty text-lg font-bold'>
                    Painting Award at Local Exhibition
                  </h4>
                  <p className='mt-2 text-muted-foreground'>
                    Won the Best Painting Award at the local art exhibition for the second year in a
                    row.
                  </p>
                </CardContent>
                <CardFooter className='mt-auto'>
                  <Button variant='link'>Read More</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardContent className='p-6'>
                  <h4 className='text-pretty text-lg font-bold'>Top Performer in Jazz Music</h4>
                  <p className='mt-2 text-muted-foreground'>
                    Recognized as the top performer in jazz music at the city's annual music
                    festival.
                  </p>
                </CardContent>
                <CardFooter className='mt-auto'>
                  <Button variant='link'>Watch Video</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-12'>
        <h3 className='text-xl font-bold'>Connections</h3>
        <div className='mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4'>
          <div className='flex flex-col items-center'>
            <Avatar className='size-16'>
              <Image src='/ava.png' fill alt='Avatar' />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <p className='mt-2 text-sm font-medium'>Jane Doe</p>
          </div>
          <div className='flex flex-col items-center'>
            <Avatar className='size-16'>
              <Image src='/ava.png' fill alt='Avatar' />
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <p className='mt-2 text-sm font-medium'>Michael Davis</p>
          </div>
          <div className='flex flex-col items-center'>
            <Avatar className='size-16'>
              <Image src='/ava.png' fill alt='Avatar' />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <p className='mt-2 text-sm font-medium'>Sarah Anderson</p>
          </div>
          <div className='flex flex-col items-center'>
            <Avatar className='size-16'>
              <Image src='/ava.png' fill alt='Avatar' />
              <AvatarFallback>TW</AvatarFallback>
            </Avatar>
            <p className='mt-2 text-sm font-medium'>Tom Wilson</p>
          </div>
        </div>
      </div>
      <div className='mt-12'>
        <h3 className='text-xl font-bold'>Activity</h3>
        <div className='mt-4 space-y-4'>
          <div className='flex items-start gap-4'>
            <Avatar className='size-12'>
              <Image src='/ava.png' fill alt='Avatar' />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className='flex-1'>
              <p>
                <span className='font-medium'>John Doe</span> commented on the latest art
                exhibition.
              </p>
              <p className='mt-1 text-sm text-muted-foreground'>2 hours ago</p>
            </div>
          </div>
          <div className='flex items-start gap-4'>
            <Avatar className='size-12'>
              <Image src='/ava.png' fill alt='Avatar' />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className='flex-1'>
              <p>
                <span className='font-medium'>John Doe</span> shared a new poetry performance.
              </p>
              <p className='mt-1 text-sm text-muted-foreground'>1 day ago</p>
            </div>
          </div>
          <div className='flex items-start gap-4'>
            <Avatar className='size-12'>
              <Image src='/ava.png' fill alt='Avatar' />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className='flex-1'>
              <p>
                <span className='font-medium'>John Doe</span> joined the photography club.
              </p>
              <p className='mt-1 text-sm text-muted-foreground'>3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
