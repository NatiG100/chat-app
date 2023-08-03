"use client"
import Layout from '@/components/Layout'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [isOpen,setIsOpen] = useState(false);
  return (
      <Layout
        body={<p onClick={()=>{setIsOpen(true)}}>body</p>}
        sidebar={<p>sidebar</p>}
        closeSideBar={()=>{setIsOpen(false)}}
        sidebarOpen={isOpen}
      />
  )
}
