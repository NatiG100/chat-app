import ChatFolder from "@/components/ChatFolder";
import UserListItem from "@/components/UserListItem";
import LineTextfield from "@/components/uiElements/LineTextfield";
import ListButton from "@/components/uiElements/buttons/ListButton";
import Image from "next/image";

import {FaUser} from 'react-icons/fa'
import {BiSolidGroup} from 'react-icons/bi'


export default function ChatSidebar(){
    return(
        <div className="h-full w-full max-w-full dark:bg-dark bg-light border-r-2 border-black/10 grid grid-cols-[80px,1fr]">
            <div className="bg-black/20">
                <div className="h-[65px] w-full flex items-center justify-center px-1 mb-6">
                    <Image height={200} width={200} alt="icon" src={"/message-icon.png"} className="h-[35px] w-[35px]"/>
                </div>
                <ChatFolder 
                    active={true}
                    href="#"
                    icon={<FaUser/>}
                    text="Users"
                />
                <ChatFolder 
                    active={false}
                    href="#"
                    icon={<BiSolidGroup/>}
                    text="Groups"
                />
            </div>
            <div>
                <div className="h-[65px] w-full flex items-baseline justify-center px-4 mb-6">
                    <LineTextfield attr={{placeholder:"Search"}}/>
                </div>
                <UserListItem
                    firstName="Natnael"
                    lastName="Gashu"
                    selected={true}
                    lastSent={new Date(Date.now())}
                    lastMessageByYou={true}
                    lastMessage="Hey brother, how are you asdf asdfa adf "
                />
                <UserListItem
                    firstName="Natnael"
                    lastName="Gashu"
                    selected={false}
                    lastSent={new Date(Date.now())}
                    lastMessageByYou={true}
                    lastMessage="Hey brother, how are you asdf asdfa adf "
                />
                <UserListItem
                    firstName="Natnael"
                    lastName="Gashu"
                    selected={false}
                    lastSent={new Date(Date.now())}
                    lastMessageByYou={true}
                    lastMessage="Hey brother, how are you asdf asdfa adf "
                />
                <UserListItem
                    firstName="Natnael"
                    lastName="Gashu"
                    selected={false}
                    lastSent={new Date(Date.now())}
                    lastMessageByYou={true}
                    lastMessage="Hey brother, how are you asdf asdfa adf "
                />
            </div>
        </div>
    )
}