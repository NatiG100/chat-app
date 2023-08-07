import axiosClient from "@/client";
import { TypeErrorRes } from "@/types/api";
import { TypeUser } from "@/types/enteties";

export default class UserService{
    static async register(user:TypeUser){
        return axiosClient.post<TypeErrorRes,TypeUser>('/users',user,{});
    }
}