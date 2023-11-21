import { useRouter } from "next/navigation";
import useUser from "./useUser";
import { useEffect,useState } from "react";
import { getPath } from "@/utils";

export default function useAuthRedirector(pageType:"unauth"|"inactive"|"auth"){
    const router = useRouter();
    const user = useUser();
    const [loading,setLoading] =useState(true);
    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false);
        },1000)
    },[user]);
    useEffect(()=>{
        switch(user?.status){
            case "ACTIVE":
                if(pageType!=="auth"){
                    const path = getPath("/login");
                    if(path==="/login"||path==="/register"){
                        router.replace("/");
                    }else{
                        router.replace(getPath("/"));
                    }
                }
                break;
            case "INACTIVE":
                if(pageType!=="inactive"){
                    router.replace('/activate');
                }
                break;
            default:
                if(pageType!=="unauth"){
                    const path = getPath("/login");
                    if(path!=="/login"&&path!=="/register"){
                        router.replace("/login")
                    }else{
                        router.replace(path);
                    }
                }
                break;
        }
    },[user]);
    return {loading};
}