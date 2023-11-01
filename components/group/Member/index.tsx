import Avatar from "@/components/uiElements/Avatar";
import { GET_IMG_URL } from "@/constants";
import { TypeMember } from "@/types/api";
import { ReactNode } from "react";

export default function Member({
    user,blocked,isSuperAdmin,action=<></>,
}:TypeMember&{isSuperAdmin:boolean,action?:ReactNode,groupId?:number}){
    
    return(
        <div className="w-full gap-8 grid grid-cols-[2fr,5fr,3fr]">
            <Avatar 
                src={`${GET_IMG_URL(user.profileImg)||'/noProfile.png'}`}
                className="h-16 w-16"
            />
            <div className="flex flex-col justify-center shrink-0">
                <p className="text-light-text dark:text-dark-text">
                    {user.firstName+" "+user.lastName}
                    {isSuperAdmin&&
                        <span className="text-xs rounded-full ml-2 font-light px-2 bg-primary text-white">SA</span>
                    }
                </p>
                <p className="text-light-text-lighter dark:text-dark-text-darker">
                    {user.username}
                </p>
            </div>
            {
                action
            }
        </div>
    );
}

