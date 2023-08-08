import { useRouter } from "next/navigation";
import useUser from "./useUser";
import { useEffect } from "react";

export default function useAuthRedirector(pageType:"unauth"|"inactive"|"auth"){
    const router = useRouter();
    const user = useUser();
    useEffect(()=>{
        switch(user?.status){
            case "ACTIVE":
                if(pageType!=="auth"){
                    router.replace('/');
                }
                break;
            case "INACTIVE":
                if(pageType!=="inactive"){
                    router.replace('/activate');
                }
                break;
            default:
                if(pageType!=="unauth"){
                    router.replace('/login');
                }
                break;
        }
    },[user]);
}