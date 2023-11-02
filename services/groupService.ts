import axiosClient from "@/client";
import { APIFeatures, CreateGroup, MultiResponse, TypeErrorRes, TypeFetchAdminsRes, TypeFetchMembersRes, TypeSuccessRes, UpdateGroup, UpdateProfile } from "@/types/api";
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

    //Group members service
    static async fetchGroupMembers(groupId:number){
        return axiosClient.get<TypeErrorRes,TypeFetchMembersRes>(
            `/groups/${groupId}/members`
        )
    }


    
    static async addGroupMember({groupId,userId}:{groupId:number,userId:number}){
        return axiosClient.post<TypeErrorRes,TypeSuccessRes>(
            `/groups/${groupId}/members`,
            {
                userId
            },
            {
                headers:{Authorization:true},
                withCredentials:true
            }
        ) 
    }
    static async changeMemberStatus({groupId,userId,block}:{groupId:number,userId:number,block:boolean}){
        return axiosClient.patch<TypeErrorRes,TypeSuccessRes>(
            `/groups/${groupId}/members/${userId}`,
            {},
            {
                params:{
                    blocked:block,
                }
            }
        )
    }

    //admin
    static async fetchGroupAdmins(groupId:number){
        return axiosClient.get<TypeErrorRes,TypeFetchAdminsRes>(
            `/groups/${groupId}/admins`
        )
    }
    static async addGroupAdmin({groupId,userId}:{groupId:number,userId:number}){
        return axiosClient.post<TypeErrorRes,TypeSuccessRes>(
            `/groups/${groupId}/admins`,
            {
                userId
            },
            {
                headers:{Authorization:true},
                withCredentials:true
            }
        ) 
    }
    //permission
    static async grantPermission({groupId,adminId,permissionId}:PermissionParams){
        return axiosClient.post<TypeErrorRes,TypeSuccessRes>(
            `/groups/${groupId}/admins/${adminId}/permissions/${permissionId}`
        );
    }
    static async revokePermission({groupId,adminId,permissionId}:PermissionParams){
        return axiosClient.delete<TypeErrorRes,TypeSuccessRes>(
            `/groups/${groupId}/admins/${adminId}/permissions/${permissionId}`
        );
    }
}
export type PermissionParams = {
    groupId:number,adminId:number,permissionId:number
}