import { permissiosDetail } from "./constants";
import { permissions } from "./types/api";

export function getPermissionDetail(permission:permissions){
    return permissiosDetail.filter((per)=>(per.permission===permission))[0]
}