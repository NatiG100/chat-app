import axiosClient from "@/client";
import { APIFeatures, CreateGroup, MultiResponse, TypeErrorRes, UpdateProfile } from "@/types/api";
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
}