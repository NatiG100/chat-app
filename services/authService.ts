import axiosClient from "@/client";
import { TypeChangePassword, TypeErrorRes, TypeLogin, TypeSuccessRes } from "@/types/api";
import { TypeUser } from "@/types/enteties";

export default class AuthService{
    static async login(loginInfo:TypeLogin){
        return axiosClient.post<TypeErrorRes,TypeUser>('/auth',loginInfo,{headers:{Authorization:true},withCredentials:true});
    }
    static async me(){
        return axiosClient.get<TypeErrorRes,TypeUser>('/auth',{withCredentials:true,headers:{Authorization:true}})
    }
    static async logout(){
        return axiosClient.delete<TypeErrorRes,TypeSuccessRes>('/auth',{withCredentials:true,headers:{Authorization:true}})
    }
    static async activate({code}:{code:number}){
        return axiosClient.patch<TypeErrorRes,TypeSuccessRes>('/auth/activate',{code},{headers:{Authorization:true},withCredentials:true})
    }
    static async changePassword(data:TypeChangePassword){
        return axiosClient.patch<TypeErrorRes,TypeSuccessRes>('/auth',data,{headers:{Authorization:true},withCredentials:true});
    }
}