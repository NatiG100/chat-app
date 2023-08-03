import Image from 'next/image'
import {MdOutlineDarkMode as DarkIcon,MdNotificationsNone as NotificationIcon} from 'react-icons/md'
import BaseButton from '../uiElements/BaseButton'
type TypeNavbarProps = {
    children:React.ReactNode
}

export default function Navbar({children}:TypeNavbarProps){
    return(
        <div className="h-max px-8 py-2 flex items-center justify-between w-full bg-gray-900">
            {children||<div></div>}
            <div className='flex gap-6 items-center text-[25px] text-violet-500'>
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
                    className='h-14 w-14 rounded-full object-cover border border-black/20'
                />
            </div>
        </div>
    )
}