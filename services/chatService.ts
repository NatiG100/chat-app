import axiosClient from "@/client";
import {ChatsRes, TypeErrorRes } from "@/types/api";
import { TypeChat } from "@/types/enteties";

export default class ChatsService{
    static async myChats(type:"group"|"user"){
        return axiosClient.get<TypeErrorRes,ChatsRes>(
            '/chat',
            {
                params:{type},
                headers:{Authorization:true},
                withCredentials:true
            }
        )
    }
    static async getChat(id:number){
        return axiosClient.get<TypeErrorRes,TypeChat>(
            `chat/${id}`,
            {
                headers:{Authorization:true},
                withCredentials:true
            }
        )
    }
    static async getChatWithUser(userId:number){
        return axiosClient.get<TypeErrorRes, TypeChat>(
            `chat/withuser/${userId}`,
            {
                headers:{Authorization:true},
                withCredentials:true
            }
        )
    }
    static async getChatInGroup(groupId:number){
        return axiosClient.get<TypeErrorRes, TypeChat>(
            `chat/ingroup/${groupId}`,
            {
                headers:{Authorization:true},
                withCredentials:true
            }
        )
    }
}