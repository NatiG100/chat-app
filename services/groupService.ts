import axiosClient from "@/client";
import { APIFeatures, CreateGroup, MultiResponse, TypeErrorRes, UpdateGroup, UpdateProfile } from "@/types/api";
import { TypeGroup, TypeUser } from "@/types/enteties";

export default class GroupService{
    static async create(groupData:CreateGroup){
        return axiosClient.post<TypeErrorRes,TypeGroup>(
            '/groups',
            groupData,
            {
                headers:{Authorization:true},
                withCredentials:true
            }
        )
    }
    static async fetchGroups({select,...others}:APIFeatures<TypeGroup>){
        return axiosClient.get<TypeErrorRes,MultiResponse<TypeGroup>>(
            '/groups',
            {
                params:{...others,select:Object.keys(select as object)},
                headers:{Authorization:true},
                withCredentials:true
            }
        )
    }
    static async fetchSingleGroup(id:number){
        return axiosClient.get<TypeErrorRes,TypeGroup>(
            `/groups/${id}`
        )
    }
    static async updateGroup({id,...newData}:UpdateGroup&{id:number}){
        const form = new FormData();
        Object.keys(newData).forEach((key,index)=>{
            let value = Object.values(newData)[index];
            if (typeof value ==="number") value = value.toString();
            if(value){
                form.append(key,value)
            }
        })
        return axiosClient.patch<TypeErrorRes,TypeGroup>(`/groups/${id}`,form,{headers:{Authorization:true},withCredentials:true})
    }
}