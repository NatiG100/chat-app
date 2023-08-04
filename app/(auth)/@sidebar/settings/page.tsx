import ListButton from "@/components/uiElements/buttons/ListButton";
import Image from "next/image";
import {FaUser,FaLock} from 'react-icons/fa'
import {MdOutlineLogout} from 'react-icons/md'

export default function ChatSidebar(){
    
    return(
        <div className="h-full w-full dark:bg-dark bg-light border-r-2 border-black/20">
            <div className="h-[65px] w-full flex items-center justify-start px-6 mb-6">
                <Image height={200} width={200} alt="icon" src={"/message-icon.png"} className="h-[35px] w-[35px]"/>
            </div>
            <ListButton selected={true}>
                <FaUser/>
                <p>Edit Profile</p>
            </ListButton>
            <ListButton selected={false}>
                <FaLock/>
                <p>Change Password</p>
            </ListButton>
            <ListButton selected={false}>
                <MdOutlineLogout className="text-warning text-xl"/>
                <p className="text-warning">Logout</p>
            </ListButton>
        </div>
    )
}