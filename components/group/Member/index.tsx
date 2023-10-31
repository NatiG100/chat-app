import Avatar from "@/components/uiElements/Avatar";
import Button from "@/components/uiElements/buttons";
import { GET_IMG_URL } from "@/constants";
import { TypeMember } from "@/types/api";
import { TypeUser } from "@/types/enteties";

export default function Member({
    user,blocked,isSuperAdmin,showActions
}:TypeMember&{isSuperAdmin:boolean,showActions:boolean}){
    
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
                showActions&&
                <Button 
                    className={`w-32 ${blocked?"text-yellow-500 border-yellow-500":"text-warning border-warning"}`}
                    attr={{disabled:isSuperAdmin}}
                >
                    {blocked?"Unblock":"Block"}
                </Button>
            }
        </div>
    );
}