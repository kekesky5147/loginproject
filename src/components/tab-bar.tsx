'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TabBar () {
  const pathname = usePathname()

  return (
    <div className='fixed bottom-0 left-0 right-0 w-full bg-white border-t border-neutral-600'>
      <div className='mx-auto max-w-screen-md grid grid-cols-3 gap-4 px-5 py-3'>
        <Link href='/profile' className='flex flex-col items-center gap-1'>
          {pathname === '/profile' && (
            <span className='h-1 w-6 bg-violet-600 rounded' />
          )}
          <span
            className={
              pathname === '/profile'
                ? 'text-violet-600 font-semibold'
                : 'text-neutral-600'
            }
          >
            Profile
          </span>
        </Link>
        <Link href='/Tweet' className='flex flex-col items-center gap-1'>
          {pathname === '/Tweet' && (
            <span className='h-1 w-6 bg-violet-600 rounded' />
          )}
          <span
            className={
              pathname === '/Tweet'
                ? 'text-violet-600 font-semibold'
                : 'text-neutral-600'
            }
          >
            Tweet
          </span>
        </Link>
        <Link href='/chats' className='flex flex-col items-center gap-1'>
          {pathname === '/chats' && (
            <span className='h-1 w-6 bg-violet-600 rounded' />
          )}
          <span
            className={
              pathname === '/chats'
                ? 'text-violet-600 font-semibold'
                : 'text-neutral-600'
            }
          >
            Chats
          </span>
        </Link>
      </div>
    </div>
  )
}
