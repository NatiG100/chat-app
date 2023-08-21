"use client"
import { useManipQuery } from '@/hooks/navigationHooks/useCustomParams';
import MessageService from '@/services/MessageService';
import ChatsService from '@/services/chatService';
import { SendMessage, TypeErrorRes } from '@/types/api';
import { TypeChat, TypeMessage } from '@/types/enteties';
import { useRouter } from 'next/navigation';
import { useEffect, useState,useCallback } from 'react';
import { useForm } from 'react-hook-form';
import {IoMdSend} from 'react-icons/io'
import { useMutation, useQuery, useQueryClient } from "react-query";

type ChatSenderProps ={
    anotherUserId?:number,
    chatId?:number,
    groupId?:number
}

export default function ChatSender({chatId,anotherUserId,groupId}:ChatSenderProps){
    const queryClient = useQueryClient()
    const {mutate:sendToChat,isLoading} = useMutation<TypeMessage,TypeErrorRes,SendMessage>('sendMessage',MessageService.sendToChat)
    const {
        mutate:sendToUser,
        isLoading:toUserLoading
    } = useMutation<TypeMessage,TypeErrorRes,SendMessage>(
        'sendMessageToUser',
        MessageService.sendToUser
    )
    const {
        mutate:sendToGroup,
        isLoading:toGroupLoading
    } = useMutation<TypeMessage,TypeErrorRes,SendMessage>(
        'sendMessageToGroup',
        MessageService.sendToGroup
    )
    const {register,handleSubmit,watch,setValue,} = useForm<{text:string}>();
    const manipQuery = useManipQuery();
    const router = useRouter();
    const [sendTo,setSendTo] = useState<"chat"|"user"|"group"|null>(null);

    //if user id is provided
    //fetch chat with user if it exists and redirect to the chat
    //else send to the user directly
    const {
        isLoading:chatWithUserLoading,
        error:chatWithUserError,
        refetch:refetchChatWithUser,
        isRefetching:chatWithUserRefetching,
        isRefetchError:chatWithUserRefetchingError,
    } = useQuery<TypeChat,TypeErrorRes>(
        [anotherUserId,"getchChatWithUser"],
        ()=>ChatsService.getChatWithUser(anotherUserId as number),
        {enabled:!!anotherUserId,onSuccess(data) {
            if(data.id){router.replace('/?'+manipQuery('chat',data.id.toString(),['user','group']))}
            else{setSendTo("user");}
        },}
    );

    //if group id is provided
    //fetch chat in group if it exists and redirect to the chat
    //else send in the group directly
    const {
        isLoading:chatInGroupLoading,
        error:chatInGroupError,
        refetch:refetchChatInGroup,
        isRefetching:chatInGroupRefetching,
        isRefetchError:chatInGroupRefetchingError
    } = useQuery<TypeChat,TypeErrorRes>(
        [groupId,"getchChatInGroup"],
        ()=>ChatsService.getChatInGroup(groupId as number),
        {
            enabled:!!groupId,
            onSuccess(data) {
                if(data.id){router.replace('/?'+manipQuery('chat',data.id.toString(),['user','group']))}
                else{setSendTo("group")}
            },
            cacheTime:0
        }
    );

    //send to a chat if chat id was supplied
    useEffect(()=>{if(chatId){setSendTo("chat")}},[chatId])

    const handleSend = useCallback(({text}:{text:string})=>{
        switch(sendTo){
            case "chat":
                if(chatId&&text!==""){
                    sendToChat({text,type:"TEXT",chatId});
                    setValue('text',"")
                }
                break;
            case "user":
                if(anotherUserId&&text!==""){
                    sendToUser({text,type:"TEXT",userId:anotherUserId});
                    setValue('text',"");
                    queryClient.invalidateQueries([anotherUserId,"getchChatWithUser"])
                    queryClient.invalidateQueries(["fetchUserChats","groups"]);
                    queryClient.invalidateQueries(["fetchUserChats","users"]);
                    refetchChatWithUser();
                }
                break;
            case "group":
                if(groupId&&text!==""){
                    sendToGroup({text,type:"TEXT",groupId});
                    queryClient.invalidateQueries([groupId,"getchChatInGroup"])
                    queryClient.invalidateQueries(["fetchUserChats","groups"]);
                    queryClient.invalidateQueries(["fetchUserChats","users"]);
                    
                }
                break;
            default:
                break;
        }
    },[chatId,sendTo,anotherUserId,groupId,sendToChat,sendToGroup,sendToUser,refetchChatWithUser,refetchChatInGroup,queryClient ])

    if(
        chatWithUserLoading||
        chatInGroupLoading||
        chatWithUserRefetching||
        chatInGroupRefetching
    ) return <p>Loading</p>
    if(
        (chatWithUserError&&chatWithUserError.message!=="Chat not found")||
        (chatInGroupError&&chatInGroupError.message!=="Chat not found")||
        (chatWithUserRefetchingError&&chatWithUserError.message!=="Chat not found")||
        (chatInGroupRefetchingError&&chatInGroupError.message!=="Chat not found")
    ) return <p className='text-red-600'>Error</p>
    return(
        <form onSubmit={handleSubmit(handleSend)} className='w-full relative h-32 lg:h-40'>
            <textarea 
                className="
                    text-sm lg:text-lg h-full
                    transition-colors duration-300 align-top pt-3
                    w-full focus:outline-none bg-[#e4e4e4] dark:bg-[#282f3e]
                    m-0 mb-0 pl-4 resize-none overflow-y-auto border-none border-t-2 border-black/10
                    focus:text-light-text focus:dark:text-dark-text
                    text-light-text-lighter dark:text-dark-text-darker
                    placeholder:dark:text-gray-600 placeholder:text-gray-400 pr-24
                "
                {...register("text",{required:""})}
                placeholder="type a message here"
            />
            <div className="absolute bottom-4 right-6">
                <button type="submit">
                    <IoMdSend className="text-primary text-3xl opacity-60 hover:opacity-100 transition-all duration-300"/>
                </button>
            </div>
        </form>
    );
}