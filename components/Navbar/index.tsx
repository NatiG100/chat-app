import Image from 'next/image'
import {MdOutlineDarkMode as DarkIcon,MdNotificationsNone as NotificationIcon} from 'react-icons/md'
import BaseButton from '../uiElements/BaseButton'
type TypeNavbarProps = {
    children:React.ReactNode
}

export default function Navbar({children}:TypeNavbarProps){
    return(
        <div className="h-max px-8 py-2 flex items-center justify-between w-full dark:bg-dark bg-light">
            {children||<div></div>}
            <div className='flex gap-6 items-center text-[26px] text-light-text dark:text-dark-text'>
                <BaseButton>
                    <DarkIcon/>
                </BaseButton>
                <BaseButton>
                    <NotificationIcon/>
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