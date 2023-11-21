import { useRouter } from "next/navigation";
import useUser from "./useUser";
import { useEffect,useState } from "react";
import { getPath, getQuery } from "@/utils";

export default function useAuthRedirector(pageType:"unauth"|"inactive"|"auth"){
    const router = useRouter();
    const user = useUser();
    const [loading,setLoading] =useState(true);
    useEffect(()=>{
        if(user.loaded){
            setLoading(false);
        }
    },[user]);
    useEffect(()=>{
        if(!loading){
            switch(user?.status){
                case "ACTIVE":
                    if(pageType!=="auth"){
                        const path = getPath("/login");
                        const query = getQuery();
                        if(path==="/login"||path==="/register"){
                            router.replace("/");
                        }else{
                            router.replace(getPath("/")+query);
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
        }
    },[user]);
    return {loading};
}