import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { UserContextProvider } from '@/context/UserContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'METBOOK',
  description: 'Coded By: MD. Mahidun Nobi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          {children}
        </UserContextProvider>

      </body>
    </html>
  )
}
