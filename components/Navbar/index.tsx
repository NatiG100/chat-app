import Image from 'next/image'
import {IoNotificationsOutline as NotificationIcon,IoMoonOutline as DarkIcon}  from 'react-icons/io5'
import BaseButton from '../uiElements/BaseButton'
type TypeNavbarProps = {
    children?:React.ReactNode
}

export default function Navbar({children}:TypeNavbarProps){
    return(
        <div className="h-[65px] px-8 py-2 flex items-center justify-between w-full dark:bg-dark bg-light border-b-2 dark:border-black/25">
            {children||<div></div>}
            <div className='flex gap-5 items-center text-[23px] text-light-text dark:text-dark-text'>
                <BaseButton>
                    <DarkIcon className="stroke-1"/>
                </BaseButton>
                <BaseButton>
                    <NotificationIcon className="stroke-1"/>
                </BaseButton>
                <Image 
                    height="1000" 
                    width="1000" 
                    alt="profile" 
                    src="/img.jpg"
                    className='h-14 w-14 rounded-full object-cover border-2 border-black/20'
                />
            </div>
        </div>
    )
}