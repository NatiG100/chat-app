"use client"
import Image from 'next/image'
import {IoNotificationsOutline as NotificationIcon,IoMoonOutline as DarkIcon}  from 'react-icons/io5'
import {FiSun as LightIcon} from 'react-icons/fi'
import BaseButton from '../uiElements/buttons/BaseButton'
type TypeNavbarProps = {
    children?:React.ReactNode
}
import {useDispatch,useSelector} from 'react-redux'
import { TypePreference, toggleTheme } from '@/store/preferenceSlice'
import { AppDispath, RootState } from '@/store'
import Link from 'next/link'
import useUser from '@/hooks/useUser'
export default function Navbar({children}:TypeNavbarProps){
    const user = useUser();
    const dispatch = useDispatch<AppDispath>();
    const preference = useSelector<RootState,TypePreference>((state)=>state.preference)
    return(
        <div className="h-[65px] px-4 sm:px-8 py-2 flex items-center justify-between w-full dark:bg-dark bg-light border-b-2 border-black/10">
            {children||<div></div>}
            <div className='flex sm:gap-5 gap-2 items-center lg:text-[23px] text-[18px] text-light-text dark:text-dark-text'>
                <BaseButton attr={{onClick:(e)=>{dispatch(toggleTheme())}}}>
                    {preference.theme==="dark"?<DarkIcon className="stroke-1"/>:<LightIcon className="stroke-1"/>}
                </BaseButton>
                <BaseButton>
                    <NotificationIcon className="stroke-1"/>
                </BaseButton>
                <div className='flex items-center gap-2'>
                    <div className='flex flex-col items-end'>
                        <p className='text-base hidden sm:block'>{user?.firstName} {user?.lastName}</p>
                        <p className='text-sm font-extralight italic dark:text-gray-400 text-gray-600 hidden lg:block'>{user?.phoneNumber}</p>
                    </div>
                    <Link href={"/settings"}>
                        <Image 
                            height="1000" 
                            width="1000" 
                            alt="profile" 
                            src={`${user?.profileImg?"https://ucarecdn.com/"+user.profileImg+"/":"/noProfile.png"}`}
                            className='lg:h-14 lg:w-14 h-8 w-8 rounded-full object-cover border-2 border-black/20'
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}