"use client"
import MessageService from "@/services/MessageService";
import { TypeErrorRes } from "@/types/api";
import { TypeMessage } from "@/types/enteties";
import { useQuery } from "react-query";
import ChatMessage from "./ChatMessage";

type ChatProps = {
    chatId?:number,
}
export default function Chat({chatId}:ChatProps){
    const {data:messages} = useQuery<TypeMessage[],TypeErrorRes>([chatId,"fetchChatMessages"],()=>MessageService.messages(chatId as number),{enabled:!!chatId})
    return (
        <div className="h-full w-full block">
            {messages?.map((message)=>(<ChatMessage {...message} key={message.id}/>))}
        </div>       
    );
}