"use client"
import Avatar from "@/components/uiElements/Avatar";
import useUser from "@/hooks/useUser";
import { TypeMessage } from "@/types/enteties";
import {BiCheck,BiCheckDouble} from 'react-icons/bi'

export default function ChatMessage({
    text,
    senderId,
    timeStamp,
    seen,
    user:sender
}:TypeMessage){
    const user = useUser();
    return (
        <div className="h-max px-7 m-1">
            <div className="flex items-center gap-2 font-light text-light-text-lighter dark:text-dark-text-darker">
                <Avatar src={`${sender.profileImg?"https://ucarecdn.com/"+sender?.profileImg+"/":"/noProfile.png"}`}/>
                <p>{sender.firstName} {sender.lastName}</p>
            </div>
            <div className={`
                text-[#0c0c0c]  p-5   my-2 max-w-xl font-light
                dark:text-white shadow-md cursor-pointer rounded-md min-w-[350px]
                ${senderId===user?.id?
                    "dark:bg-[#1d232f] bg-[#b6c0d4] self-end": 
                    "dark:bg-[#282f3e] bg-[#e4e4e4] self-end md:self-start md:ml-12"
                }
            `}>
                <p>{text}</p>
                <p className="opacity-40 text-xs float-right flex items-center gap-2">
                    {new Date(timeStamp).toLocaleTimeString()}{seen?<BiCheckDouble className="text-lg"/>:<BiCheck className="text-lg"/>}
                </p>
            </div>
        </div>
    )
}