import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Complaint Page',
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
    <div className="navbar bg-green-600 text-white">
      <p className="btn btn-ghost normal-case text-xl">Hostel-Admin</p>
      <Link href="/profile">
        <FontAwesomeIcon icon={faUser} className='absolute right-10 mb-1 h-5 w-5' />
      </Link>
    </div>
    <div>{children}</div>
    </body>
  </html>
  )
}
