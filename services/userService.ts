import axiosClient from "@/client";
import { APIFeatures, MultiResponse, TypeErrorRes, UpdateProfile } from "@/types/api";
import { TypeUser } from "@/types/enteties";

export default class UserService{
    static async register(user:TypeUser){
        return axiosClient.post<TypeErrorRes,TypeUser>('/users',user,{});
    }
    static async changeProfile(profile:UpdateProfile){
        const form = new FormData();
        Object.keys(profile).forEach((key,index)=>{
            let value = Object.values(profile)[index];
            if (typeof value ==="number") value = value.toString();
            if(value){
                form.append(key,value)
            }
        })
        return axiosClient.patch<TypeErrorRes,TypeUser>('/users',form,{headers:{Authorization:true},withCredentials:true})
    }
    static async fetchUsers({select,...others}:APIFeatures<TypeUser>){
        return axiosClient.get<TypeErrorRes,MultiResponse<TypeUser>>(
            '/users',
            {
                params:{...others,select:Object.keys(select as object)},
                headers:{Authorization:true},
                withCredentials:true
            }
        )
    }
    static async fetchSingleUser(id:number){
        return axiosClient.get<TypeErrorRes,TypeUser>(
            `/users/${id}`
        )
    }
}