import axiosClient from "@/client";
import { APIFeatures, MultiResponse, TypeErrorRes, UpdateProfile } from "@/types/api";
import { TypeGroup, TypeUser } from "@/types/enteties";

export default class GroupService{
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
}