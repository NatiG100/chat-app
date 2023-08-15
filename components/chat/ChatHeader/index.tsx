"use client"

import Avatar from "@/components/uiElements/Avatar"
import useUser from "@/hooks/useUser"
import ChatsService from "@/services/chatService"
import { TypeErrorRes } from "@/types/api"
import { TypeChat } from "@/types/enteties"
import Image from "next/image"
import { useEffect } from "react"
import { useQuery } from "react-query"

type ChatHeaderProps = {
    groupId?:number
    chatId?:number
    userId?:number
}
export default function ChatHeader({userId,chatId,groupId}:ChatHeaderProps){
    const user = useUser();
    const {data:chat} = useQuery<TypeChat,TypeErrorRes>([chatId,"userChat"],()=>ChatsService.getChat(chatId as number),{enabled:!!chatId})
    function getProfileOfFriend(chat?:TypeChat){
        if(!chat) return undefined;
        if(chat.groupId){
            return {
                profileImg:chat.group?.profileImg,
                title:chat.group?.name,
                subTitle:chat.group?.link
            }
        }
        return (user?.id===chat.user1Id)?{
            profileImg:chat.user2?.profileImg,
            title:(chat.user2)?chat.user2?.firstName+" "+chat.user2?.lastName:undefined,
            subTitle:chat.user2?.username
        }:
        {
            profileImg:chat.user1?.profileImg,
            title:(chat.user1)?chat.user1?.firstName+" "+chat.user1?.lastName:undefined,
            subTitle:chat.user1?.username
        };
    }
    useEffect(()=>{
        console.log(userId,chatId,groupId)
    },[userId,chatId,groupId])
    if(!(chatId||userId||groupId)) return (<div></div>);
    return(
        <div className="w-full flex items-center justify-start py-1 px-6 gap-3 bg-black/5 dark:bg-white/5 sticky ">
            {chat&&<Avatar
                src={`${getProfileOfFriend(chat)?.profileImg?"https://ucarecdn.com/"+getProfileOfFriend(chat)?.profileImg+"/":"/noProfile.png"}`}
            />}

            <div className="flex flex-col justify-center">
                <p className="text-light-text dark:text-dark-text text-lg">{getProfileOfFriend(chat)?.title}</p>
                <p className="text-light-text-lighter dark:text-dark-text-darker">{getProfileOfFriend(chat)?.subTitle}</p>
            </div>
        </div>
    )
}
