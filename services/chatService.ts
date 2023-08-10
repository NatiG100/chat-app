import axiosClient from "@/client";
import {ChatsRes, TypeErrorRes } from "@/types/api";

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
}