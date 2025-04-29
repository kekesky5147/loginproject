// src/app/layout.tsx

import '../globals.css'
import TabBar from '@/components/tab-bar'

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head />
      <body>
        <div className='container mx-auto p-4'>{children}</div>
        <TabBar />
      </body>
    </html>
  )
}
