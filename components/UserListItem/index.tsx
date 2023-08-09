import { TypeUser } from "@/types/enteties"
import Image from "next/image";

export type UserListItemProps = Partial<TypeUser>&{
    lastSent?:Date,
    lastMessageByYou?:boolean,
    selected:boolean,
    lastMessage?:string,
}
export default function UserListItem(user:UserListItemProps){
    return(
        <div className={`cursor-pointer transition-all duration-300 w-full px-3 py-1 grid grid-cols-[max-content,minmax(20px,1fr),max-content] items-center gap-3 ${user.selected?"bg-[#3B82F6aa] hover:bg-[#3B82F677]":"hover:bg-black/10"}`}>
            <Image 
                height="1000" 
                width="1000" 
                alt="profile" 
                src={`${user?.profileImg?"https://ucarecdn.com/"+user.profileImg+"/":"/noProfile.png"}`}
                className='lg:h-12 lg:w-12 h-8 w-8 rounded-full object-cover border-2 border-black/10 shrink-0'
            />
            <div className="flex flex-col items-start justify-center shrink-0">
                <p className="text-light-text dark:text-dark-text text-sm truncate w-full">{user.firstName} {user.lastName}</p>
                <p className="text-light-text dark:text-dark-text-darker truncate font-light w-full">{user.lastMessage}</p>
            </div>
            <div className="flex flex-col items-end justify-center">
                <p className="text-light-text dark:text-dark-text-darker text-xs font-light">{user.lastSent?.toLocaleTimeString()}</p>
                <p className="text-primary  text-sm font-light">{user.lastMessageByYou&&"you"}</p>
            </div>
        </div>
    );
}