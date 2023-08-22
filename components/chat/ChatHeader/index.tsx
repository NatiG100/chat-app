"use client"

import Avatar from "@/components/uiElements/Avatar"
import useUser from "@/hooks/useUser"
import ChatsService from "@/services/chatService"
import GroupService from "@/services/groupService"
import UserService from "@/services/userService"
import { TypeErrorRes } from "@/types/api"
import { TypeChat, TypeGroup, TypeUser } from "@/types/enteties"
import Link from "next/link"
import {AiOutlineMenu} from 'react-icons/ai'
import { useQuery } from "react-query"

type ChatHeaderProps = {
    groupId?:number
    chatId?:number
    userId?:number
}
export default function ChatHeader({userId,chatId,groupId}:ChatHeaderProps){
    const user = useUser();
    const {data:chat} = useQuery<TypeChat,TypeErrorRes>(
        [chatId,"userChat"],()=>ChatsService.getChat(chatId as number),
        {enabled:!!chatId}
    )
    const {data:selectedUser} = useQuery<TypeUser,TypeErrorRes>(
        [userId,"fetchuser"],
        ()=>UserService.fetchSingleUser(userId as number),
        {enabled:!!userId}
    )
    const {data:group} = useQuery<TypeGroup,TypeErrorRes>(
        [groupId,"fetchgroup"],
        ()=>GroupService.fetchSingleGroup(groupId as number),
        {enabled:!!groupId}
    )
    function getChatProfile(chat?:TypeChat){
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
    if(!(chat||selectedUser||group)) return (<div></div>);
    return(
        <div className="w-full flex items-center justify-start py-1 px-6 gap-3 bg-black/5 dark:bg-white/5 sticky ">
            {(chat||selectedUser||group)&&<Avatar
                src={`${(getChatProfile(chat)?.profileImg)?("https://ucarecdn.com/"+getChatProfile(chat)?.profileImg+"/"):
                        (selectedUser?.profileImg)?("https://ucarecdn.com/"+selectedUser.profileImg+"/"):
                        (group?.profileImg)?("https://ucarecdn.com/"+group.profileImg+"/"):("/noProfile.png")}`}
            />}

            <div className="flex flex-col justify-center">
                <p className="text-light-text dark:text-dark-text text-lg">
                    {
                        chat?(getChatProfile(chat)?.title):
                        selectedUser?(selectedUser.firstName+" "+selectedUser.lastName):
                        group?group.name:""
                    }
                </p>
                <p className="text-light-text-lighter dark:text-dark-text-darker">
                    {
                        chat?(getChatProfile(chat)?.subTitle):
                        selectedUser?selectedUser.username:
                        group?group.link:""
                    }
                </p>
            </div>
            <div className="flex-1"></div>
            {(group||chat?.groupId)&&
                <Link href={`/groups/${group?group?.id:chat?.groupId}`} className="opacity-70 hover:opacity-100 transition-opacity duration-300">
                    <AiOutlineMenu/>
                </Link>
            }
        </div>
    )
}
