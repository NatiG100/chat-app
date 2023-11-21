import { permissions } from "./types/api";

export const BASE_URL = "http://172.20.101.174:4000";
export const GET_IMG_URL = (imgId?:string)=>{
    if(!imgId){return undefined}
    return "https://ucarecdn.com/"+imgId+'/'
}

export type TypePermissionDetail = {
    permission:permissions,
    title:string,
    description:string,
    id:number,
}

export const permissiosDetail:TypePermissionDetail[]= [
    {
        permission:permissions.ADD_MEMBER,
        title:"Add Member",
        description:"Admins with this permission in a group can add members to that group.",
        id:1,
        
    },
    {
        permission:permissions.CHANGE_MEMBER_STATUS,
        title:"Change Member Status",
        description:"Admins with this permission in a group can block/unblock users in that group.",
        id:2,
    },
    {
        permission:permissions.ADD_ADMIN,
        title:"Add Admin",
        description:"Admins with this permission in a group can add admins to that group.",
        id:3,
    },
    {
        permission:permissions.REMOVE_ADMIN,
        title:"Remove Admin",
        description:"Admins with this permission can remove admins",
        id:4,
    },
    {
        permission:permissions.CHANGE_ADMIN_STATUS,
        title:"Change Admin Permission",
        description:"Admins with this permission can change the permissions of admins in that group",
        id:5,
    },
    {
        permission:permissions.FETCH_ADMINS,
        title:"View Admins",
        description:"Admins with this permission can view other admins in that group",
        id:6,
    },
]