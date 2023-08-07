import axiosClient from "@/client";
import { TypeErrorRes, TypeLogin } from "@/types/api";
import { TypeUser } from "@/types/enteties";

export default class AuthService{
    static async login(loginInfo:TypeLogin){
        return axiosClient.post<TypeErrorRes,TypeUser>('/auth',loginInfo,{});
    }
}