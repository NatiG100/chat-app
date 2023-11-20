"use client"
import ChatFolder from "@/components/ChatFolder";
import UserListItem from "@/components/UserListItem";
import LineTextfield from "@/components/uiElements/LineTextfield";
import ListButton from "@/components/uiElements/buttons/ListButton";
import Image from "next/image";

import {FaUser} from 'react-icons/fa'
import {BiSolidGroup,BiPlus} from 'react-icons/bi'
import {MdClose,MdCheck,MdOutlineCancel, MdCancel } from 'react-icons/md'
import { useMutation, useQuery } from "react-query";
import UserService from "@/services/userService";
import { ChatsRes, CreateGroup, MultiResponse, TypeErrorRes } from "@/types/api";
import { TypeGroup, TypeUser } from "@/types/enteties";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import ChatsService from "@/services/chatService";
import useUser from "@/hooks/useUser";
import { useSearchParams } from "next/navigation";
import GroupService from "@/services/groupService";
import useTab from "@/hooks/navigationHooks/useTab";
import Button from "@/components/uiElements/buttons";
import Modal from "@/components/uiElements/Modal";
import Input from "@/components/uiElements/Textfield";
import Textarea from "@/components/uiElements/Textarea";
import { useForm } from "react-hook-form";
import Link from "next/link";
import useCustomParams, { useManipQuery } from "@/hooks/navigationHooks/useCustomParams";
import BaseButton from "@/components/uiElements/buttons/BaseButton";
import { useDispatch } from "react-redux";
import { closeSidebar } from "@/store/layoutSlice";


export default function ChatSidebar(){
    const dispatch = useDispatch();
    //search string
    const [query,setQuery] = useState<string>("");
    const debouncedQuery = useDebounce(query,700);

    //fetch users from the api
    const {data,isLoading,isError,error} = useQuery<MultiResponse<TypeUser>>([debouncedQuery,'fetchUsers'],async ()=>UserService.fetchUsers({
        select:{firstName:"",lastName:"",id:1,profileImg:""},query:debouncedQuery===""?null:debouncedQuery
    }));
    //fetch groups from the api
    const {
        data:groups,
        isLoading:groupsIsLoading,
        isError:groupsIsError,
        error:groupsError
    } = useQuery<MultiResponse<TypeGroup>>([debouncedQuery,'fetchGroups'],async ()=>GroupService.fetchGroups({
        select:{name:"",link:"",id:1,profileImg:""},query:debouncedQuery===""?null:debouncedQuery
    }));

    //fetch chats based on the current tab(user or group)
    const searchParams = useSearchParams()
    const {
        data:myChats,
        isLoading:
        chatsLoading,
        isError:chatsIsError,
        error:chatsError
    } = useQuery<ChatsRes>(
        ['fetchUserChats',searchParams.get('tab')],
        async ()=>ChatsService.myChats(searchParams.get('tab')==="groups"?"group":"user")
    );

    
    const me = useUser();
    const tab = useTab();
    const [showModal,setShowModal] = useState(false);
    const onCloseCreateGroupModal = ()=>{
        setShowModal(false);
    }
    const onOpenCreateGroupModal = ()=>{
        setShowModal(true);
    }
    const manipQuery = useManipQuery();
    const {selectedChat,selectedGroup,selectedUser} = useCustomParams()
    return(
        <div className="h-screen w-full max-w-full dark:bg-dark bg-light border-r-2 border-black/10 grid grid-cols-[80px,1fr]">
            <div className="bg-black/20">
                <div className="h-[65px] w-full flex items-center justify-center px-1 mb-6">
                    <Image height={200} width={200} alt="icon" src={"/message-icon.png"} className="h-[35px] w-[35px]"/>
                </div>
                <ChatFolder 
                    active={searchParams.get('tab')!=="groups"}
                    href={"/?"+manipQuery('tab',"users")}
                    icon={<FaUser/>}
                    text="Users"
                />
                <ChatFolder 
                    active={searchParams.get('tab')==="groups"}
                    href={"/?"+manipQuery('tab',"groups")}
                    icon={<BiSolidGroup/>}
                    text="Groups"
                />
            </div>
            <div className="h-screen grid grid-rows-[65px,1fr]">
                <BaseButton 
                    attr={{
                        className:"self-end rounded-full w-max ml-auto mr-3 md:hidden",
                        onClick:()=>{dispatch(closeSidebar())}
                    }}
                >
                    <MdCancel className="text-red-400 h-7 w-7 opacity-40 hover:opacity-100" />
                </BaseButton>
                <div className="h-[65px] w-full flex items-baseline justify-center px-4 mb-6">
                    <LineTextfield attr={{placeholder:"Search",value:query,onChange:(e)=>{setQuery(e.target.value)}}}/>
                </div>
                <div className="h-full max-h-full overflow-auto">
                    {
                        tab!=="groups"&&(data?.data?.length as number>0)&&
                            <p className="text-sm px-4 my-2 text-light-text-lighter dark:text-dark-text-darker bg-white/10 py-1">
                                Users
                            </p>
                    }
                    {tab!=="groups"&&data?.data.map((user)=>(
                        <Link href={"/?"+manipQuery('user',user.id?.toString(),["group","chat"])} key={user.id}>
                            <UserListItem
                                firstName={user.firstName}
                                lastName={user.lastName}
                                selected={selectedUser===user.id}
                                profileImg={user.profileImg}
                            />
                        </Link>
                    ))}
                    {
                        tab==="groups"&&(groups?.data?.length as number>0)&&
                            <p className="text-sm px-4 my-2 text-light-text-lighter dark:text-dark-text-darker bg-white/10 py-1">
                                Groups
                            </p>
                    }
                    {tab==="groups"&&groups?.data.map((group)=>(
                        <Link href={"/?"+manipQuery('group',group.id?.toString(),["chat","user"])} key={group.id}>
                            <UserListItem
                                firstName={group.name}
                                lastMessage={group.link}
                                selected={selectedGroup===group.id}
                                profileImg={group.profileImg}
                            />
                        </Link>
                    ))}
                    {
                        (myChats?.length as number>0)&&
                            <p className="text-sm px-4 my-2 text-light-text-lighter dark:text-dark-text-darker bg-white/10 py-1">
                                {tab==="groups"?"Group":"User"} Chats
                            </p>
                    }
                    {myChats?.map((chat)=>(
                        <Link href={"/?"+manipQuery('chat',chat.id?.toString(),["group","user"])} key={chat.id}>
                            <UserListItem
                                firstName={chat.groupId===null?(me?.id===chat.user1.id?chat.user2.firstName:chat.user1.firstName):chat.group?.name}
                                lastName={chat.groupId===null?(me?.id===chat.user1.id?chat.user2.lastName:chat.user1.lastName):""}
                                selected={selectedChat===chat.id}
                                lastMessage={chat.messages[0]?.text||""}
                                lastMessageByYou={chat.messages[0]?.senderId===me?.id}
                                lastSent={chat.messages[0]?.updatedAt?new Date(chat.messages[0]?.updatedAt):new Date(chat.messages[0]?.timeStamp)}
                                profileImg={chat.groupId===null?(me?.id===chat.user1.id?chat.user2.profileImg:chat.user1.profileImg):undefined}
                            />
                        </Link>
                    ))}
                    {
                        tab==="groups"&&(
                            <div className="px-4">
                                <Button attr={{onClick:onOpenCreateGroupModal}}>
                                    <BiPlus className="text-2xl"/>
                                    Create Group
                                </Button>
                            </div>
                        )
                    }
                </div>
                {showModal&&<CreateGroupModal onClose={onCloseCreateGroupModal}/>}
            </div>
        </div>
    )
}

const CreateGroupModal = ({onClose}:{onClose:()=>void})=>{
    const {
        data,
        error,
        isLoading,
        mutate
    } = useMutation<TypeGroup,TypeErrorRes,CreateGroup>('createGroup',GroupService.create)
    const {register,handleSubmit,watch,formState:{errors},} = useForm<CreateGroup>();
    const onRegister = (user:CreateGroup)=>{
        mutate(user);
    }
    return(
        <Modal onClose={onClose}>
            <p className="text-primary text-lg md:text-xl mb-6">Create group</p>
            <form onSubmit={handleSubmit(onRegister)}>
                <Input 
                    attr={{
                        placeholder:"Group Name",
                        id:"name",
                        ...register("name",{required:"Group name is required"})
                    }} 
                    text="Group Name *"
                    error={errors.name?.message}
                />
                <Input 
                    attr={{
                        placeholder:"Link",
                        id:"link",
                        ...register("link",{required:"Group link is required"})
                    }} 
                    text="Group Link *"
                    error={errors.link?.message}
                />
                <Textarea
                    attr={{
                        placeholder:"A short description for the group",
                        onResize:()=>{},
                        ...register("description")
                    }}
                    text="Description"
                />
                <p className="mx-2 text-warning font-light animate-pulse">
                    {error&&(Array.isArray(error.message)?error.message.join(',\n'):error.message)}
                </p>
                <div className="w-full flex gap-4 max-w-sm float-right">
                    <Button className="border-warning text-warning" attr={{onClick:onClose}}>
                        Cancel
                        <MdClose className="text-xl"/>
                    </Button>
                    <Button attr={{type:"submit"}}>
                        Create
                        <MdCheck className="text-xl"/>
                    </Button>
                </div>
            </form>
        </Modal>
    )
}