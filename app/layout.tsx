"use client"
import Layout from '@/components/Layout'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { Provider,useSelector,useDispatch } from 'react-redux'
import store, { AppDispath, RootState } from '@/store'
import { TypePreference } from '@/store/preferenceSlice'
import { TypeLayout, closeSidebar, openSidebar } from '@/store/layoutSlice'
import BaseButton from '@/components/uiElements/buttons/BaseButton'
import Navbar from '@/components/Navbar'
import {HiMenu} from 'react-icons/hi'
import {MdArrowBack} from 'react-icons/md'
import usePageTitle from '@/hooks/usePageTitle'
import { useRouter } from 'next/navigation'

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
  const layout = useSelector<RootState,TypeLayout>((state)=>state.layout)
  const dispatch = useDispatch<AppDispath>()
  const preference = useSelector<RootState,TypePreference>((state)=>(state.preference))
  const title = usePageTitle();
  const router = useRouter();
  return(
    <html lang="en" className={preference.theme}>
      <body className={inter.className}>
        <Layout
          body={
            <div className='h-full w-full bg-light-surfce dark:bg-dark-surface grid grid-rows-[max-content,1fr]'>
              <Navbar>
                  <div className="flex items-center gap-3">
                    <div className="md:hidden block">
                        <BaseButton 
                          attr={{onClick:()=>{dispatch(openSidebar())}}}
                        >
                          <HiMenu className="text-xl text-primary"/>
                        </BaseButton>
                    </div>
                    <BaseButton 
                        attr={{onClick:router.back}}
                    >
                        <MdArrowBack className="text-xl text-light-text dark:text-dark-text"/>
                    </BaseButton>
                    <p className='text-light-text-lighter dark:text-dark-text-darker text-base sm:text-lg'>{title}</p>
                  </div>
              </Navbar>
              {children}
            </div>
          }
          sidebar={sidebar}
          closeSideBar={()=>{dispatch(closeSidebar())}}
          sidebarOpen={layout.sidebarOpen}
        />
      </body>
    </html>
  )
}
