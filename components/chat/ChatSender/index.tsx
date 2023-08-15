"use client"
import MessageService from '@/services/MessageService';
import { SendMessage, TypeErrorRes } from '@/types/api';
import { TypeMessage } from '@/types/enteties';
import { useForm } from 'react-hook-form';
import {IoMdSend} from 'react-icons/io'
import { useMutation } from "react-query";

export default function ChatSender({chatId}:{chatId?:number}){
    const {mutate:sendToChat,isLoading} = useMutation<TypeMessage,TypeErrorRes,SendMessage>('sendMessage',MessageService.sendToChat)
    const {register,handleSubmit,watch,setValue,} = useForm<{text:string}>();
    function handleSend({text}:{text:string}){
        if(chatId&&text!==""){
            sendToChat({text,type:"TEXT",chatId});
            setValue('text',"")
        }
    }
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