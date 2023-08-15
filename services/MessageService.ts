import axiosClient from "@/client";
import {ChatsRes, SendMessage, TypeErrorRes } from "@/types/api";
import { TypeChat, TypeMessage } from "@/types/enteties";

export default class MessageService{
    static async messages(chatId:number){
        return axiosClient.get<TypeErrorRes,TypeMessage[]>(
            '/message',
            {
                params:{chatId},
                headers:{Authorization:true},
                withCredentials:true
            }
        )
    }
    static async sendToChat({chatId,...message}:SendMessage){
        return axiosClient.post<TypeErrorRes,TypeMessage>(
            `/message/${chatId}`,
            message,
            {
                params:{chatId},
                headers:{Authorization:true},
                withCredentials:true
            }
        )
    }
}