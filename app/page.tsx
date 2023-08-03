"use client"
import Layout from '@/components/Layout'
import Navbar from '@/components/Navbar';
import { useState } from 'react'

export default function Home() {
  const [isOpen,setIsOpen] = useState(false);
  return (
      <Layout
        body={
          <div className='h-full w-full'><Navbar><p onClick={()=>{setIsOpen(true)}}>Back</p></Navbar></div>
        }
        sidebar={<p>sidebar</p>}
        closeSideBar={()=>{setIsOpen(false)}}
        sidebarOpen={isOpen}
      />
  )
}
