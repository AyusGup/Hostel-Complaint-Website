import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
      <div className="navbar bg-custom-primary text-primary-content">
        <p className="btn btn-ghost normal-case text-xl">Hostel-Admin</p>
        <Link href="/profile">
          <Image
            src="/avatar.png" 
            alt="Description of the image"
            width={50}
            height={50}
            className='absolute right-5'
          />
        </Link>
      </div>
      <div>{children}</div>
      </body>
    </html>
  )
}
