import { TypeUser } from "@/types/enteties"
import Image from "next/image";

export type UserListItemProps = Partial<TypeUser>&{
    lastSent?:Date,
    lastMessageByYou:boolean,
    selected:boolean,
    lastMessage:string,
}
export default function UserListItem(user:UserListItemProps){
    return(
        <div className={`w-full px-3 py-1 grid-cols-[max-content,1fr,max-content] items-center gap-3 ${user.selected?"bg-[#3B82F6aa] hover:bg-[#3B82F6]":"hover:bg-black/20"}`}>
            <Image 
                height="1000" 
                width="1000" 
                alt="profile" 
                src={`${user?.profileImg?"https://ucarecdn.com/"+user.profileImg+"/":"/noProfile.png"}`}
                className='lg:h-14 lg:w-14 h-8 w-8 rounded-full object-cover border-2 border-black/20'
            />
            <div className="flex flex-row items-start">
                <p className="text-light-text dark:text-dark-text">{user.firstName} ${user.lastName}</p>
                <p className="text-light-text dark:text-dark-text-darker">{user.lastMessage}</p>
            </div>
            <div className="flex flex-row items-start">
                <p className="text-light-text dark:text-dark-text-darker">{user.firstName} ${user.lastName}</p>
                <p className="text-primary">{user.lastMessageByYou&&"you"}</p>
            </div>
        </div>
    );
}