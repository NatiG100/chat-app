"use client"
import Layout from '@/components/Layout'
import { useSelector,useDispatch } from 'react-redux'
import { AppDispath, RootState } from '@/store'
import { TypeLayout, closeSidebar, openSidebar } from '@/store/layoutSlice'
import BaseButton from '@/components/uiElements/buttons/BaseButton'
import Navbar from '@/components/Navbar'
import {HiMenu} from 'react-icons/hi'
import {MdArrowBack} from 'react-icons/md'
import usePageTitle from '@/hooks/usePageTitle'
import { useRouter } from 'next/navigation'
import useAuthRedirector from '@/hooks/useAuthRedirector'


export default function AuthLayout({children,sidebar}:{
  children: React.ReactNode
  sidebar: React.ReactNode
}){
  const layout = useSelector<RootState,TypeLayout>((state)=>state.layout)
  const dispatch = useDispatch<AppDispath>()
  const title = usePageTitle();
  const router = useRouter();
  useAuthRedirector("auth");
  return(
      <Layout
        body={
          <div className='h-full w-full bg-light-surfce dark:bg-dark-surface grid grid-rows-[max-content,1fr]'>
            <Navbar>
                <div className="flex items-center gap-1 sm:gap-3">
                  <div className="md:hidden block">
                      <BaseButton 
                        attr={{onClick:()=>{dispatch(openSidebar())}}}
                      >
                        <HiMenu className="text-base sm:text-xl text-primary"/>
                      </BaseButton>
                  </div>
                  <BaseButton 
                      attr={{onClick:router.back}}
                  >
                      <MdArrowBack className="text-base sm:text-xl text-light-text dark:text-dark-text"/>
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
  )
}
