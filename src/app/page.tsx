import Link from 'next/link'

export default function HomePage () {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <div className='bg-white p-6 rounded shadow-md w-full max-w-md'>
        <h1 className='flex items-center justify-center text-2xl font-bold mb-4'>
          W E L C O M E !
        </h1>
        <p className='flex items-center justify-center mb-4 text-gray-700'>
          계정이 있으시면 로그인하거나, 새 계정을 생성하세요.
        </p>
        <div className='flex flex-col gap-2'>
          <Link
            href='/log-in'
            className='w-full bg-red-500 text-white p-2 rounded-md text-center hover:bg-red-600 focus:outline-none focus:ring-2 '
          >
            Log in
          </Link>
          <Link
            href='/create-account'
            className='w-full bg-green-500 text-white p-2 rounded-md text-center hover:bg-green-600 focus:outline-none focus:ring-2 '
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  )
}
