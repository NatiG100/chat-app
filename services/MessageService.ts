import axiosClient from "@/client";
import {ChatsRes, SendMessage, TypeErrorRes } from "@/types/api";
import { TypeChat, TypeMessage } from "@/types/enteties";

export default class MessageService{
    static async messages(chatId:number){
        return axiosClient.get<TypeErrorRes,TypeMessage[]>(
            '/message',
            {
                params:{chatId},
            }
        )
    }
    static async sendToChat({chatId,...message}:SendMessage){
        return axiosClient.post<TypeErrorRes,TypeMessage>(
            `/message/${chatId}`,
            message,
            {
                params:{chatId},
            }
        )
    }
    static async sendToUser({userId,...message}:SendMessage){
        return axiosClient.post<TypeErrorRes,TypeMessage>(
            `/message/touser/${userId}`,
            message,
            {
                params:{userId},
            }
        )
    }
    static async sendToGroup({groupId,...message}:SendMessage){
        return axiosClient.post<TypeErrorRes,TypeMessage>(
            `/message/togroup/${groupId}`,
            message,
            {
                params:{groupId},
            }
        )
    }
}