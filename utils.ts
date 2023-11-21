import { permissiosDetail } from "./constants";
import { permissions } from "./types/api";

export function getPermissionDetail(permission:permissions){
    return permissiosDetail.filter((per)=>(per.permission===permission))[0]
}
export function savePath(path:string){
    localStorage.setItem("path",path);
}
export function getPath(defaultPath:string){
    return localStorage.getItem("path")||defaultPath;
}

export function saveQuery(query:string){
    localStorage.setItem("query",query);
}
export function getQuery(){
    return localStorage.getItem("query")||"";
}