"use client"
import Layout from '@/components/Layout'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat app',
  description: 'A chat application',
}

export default function RootLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode,
  sidebar: React.ReactNode,
}) {
  const [isOpen,setIsOpen] = useState(false);
  return (
    <html lang="en" className='dark'>
      <body className={inter.className}>
        <Layout
          body={children}
          sidebar={sidebar}
          closeSideBar={()=>{setIsOpen(false)}}
          sidebarOpen={isOpen}
        />
      </body>
    </html>
  )
}
