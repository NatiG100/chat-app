"use client"
import ChatFolder from "@/components/ChatFolder";
import UserListItem from "@/components/UserListItem";
import LineTextfield from "@/components/uiElements/LineTextfield";
import ListButton from "@/components/uiElements/buttons/ListButton";
import Image from "next/image";

import {FaUser} from 'react-icons/fa'
import {BiSolidGroup} from 'react-icons/bi'
import { useQuery } from "react-query";
import UserService from "@/services/userService";
import { MultiResponse } from "@/types/api";
import { TypeUser } from "@/types/enteties";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";


export default function ChatSidebar(){
    const [query,setQuery] = useState<string>("");
    const debouncedQuery = useDebounce(query,700);
    const {data,isLoading,isError,error} = useQuery<MultiResponse<TypeUser>>([debouncedQuery,'fetchUsers'],async ()=>UserService.fetchUsers({
        select:{firstName:"",lastName:"",id:1,profileImg:""},query:debouncedQuery
    }));
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
                    <LineTextfield attr={{placeholder:"Search",value:query,onChange:(e)=>{setQuery(e.target.value)}}}/>
                </div>
                {data?.data.map((user)=>(
                    <UserListItem
                        firstName={user.firstName}
                        lastName={user.lastName}
                        selected={false}
                        key={user.id}
                        profileImg={user.profileImg}
                    />
                ))}
            </div>
        </div>
    )
}