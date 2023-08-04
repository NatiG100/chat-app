"use client"
import Layout from '@/components/Layout'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { Provider,useSelector } from 'react-redux'
import store, { RootState } from '@/store'
import { TypePreference } from '@/store/preferenceSlice'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat app',
  description: 'A chat application',
}

export default function RootLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <Root children={children} sidebar={sidebar}/>
    </Provider>
  )
}

function Root({children,sidebar}:{
  children: React.ReactNode
  sidebar: React.ReactNode
}){
  const [isOpen,setIsOpen] = useState(false);
  const preference = useSelector<RootState,TypePreference>((state)=>(state.preference))
  return(
    <html lang="en" className={preference.theme}>
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
