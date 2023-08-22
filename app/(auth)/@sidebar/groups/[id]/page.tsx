"use client"
import ListButton from "@/components/uiElements/buttons/ListButton";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import {FaUser,FaLock} from 'react-icons/fa';
import {RiAdminFill,RiShakeHandsFill} from 'react-icons/ri';
import {BiSolidGroup} from 'react-icons/bi'
import {MdOutlineLogout} from 'react-icons/md'
import { useDispatch } from "react-redux";
import {useMutation} from 'react-query'
import AuthService from "@/services/authService";
import { TypeErrorRes, TypeSuccessRes } from "@/types/api";
import { logout } from "@/store/authStore";
import { useRouter, useSearchParams } from "next/navigation";

export default function ChatSidebar({params}:{params:{id:string}}){
    const dispatch = useDispatch();
    const {data,mutate:reqLogout,isLoading,isError,error} = useMutation<TypeSuccessRes,TypeErrorRes>('logout',AuthService.logout)
    useEffect(()=>{
        if(data){
            dispatch(logout());
        }
    },[data]);
    const searchParams = useSearchParams()
    const router = useRouter()
    return(
        <div className="h-full w-full dark:bg-dark bg-light border-r-2 border-black/10">
            <div className="h-[65px] w-full flex items-center justify-start px-6 mb-6">
                <Image height={200} width={200} alt="icon" src={"/message-icon.png"} className="h-[35px] w-[35px]"/>
            </div>
            <ListButton 
                selected={
                    searchParams.get('tab')!=="members"&&
                    searchParams.get('tab')!=="admins"&&
                    searchParams.get('tab')!=="transfer"
                } 
                attr={{onClick:()=>{router.replace(`/groups/${params.id}?tab=profileg`)}}}
            >
                <BiSolidGroup/>
                <p>Group Profile</p>
            </ListButton>
            <ListButton 
                selected={searchParams.get('tab')==="members"} 
                attr={{onClick:()=>{router.replace(`/groups/${params.id}?tab=members`)}}}
            >
                <FaUser/>
                <p>Members</p>
            </ListButton>
            <ListButton 
                selected={searchParams.get('tab')==="admins"} 
                attr={{onClick:()=>{router.replace(`/groups/${params.id}?tab=admins`)}}}
            >
                <RiAdminFill/>
                <p>Admins</p>
            </ListButton>
            <ListButton 
                selected={searchParams.get('tab')==="transfer"} 
                attr={{onClick:()=>{router.replace(`/groups/${params.id}?tab=transfer`)}}}
            >
                <RiShakeHandsFill className="text-warning text-xl"/>
                <p className="text-warning">Transfer Ownership</p>
            </ListButton>
        </div>
    )
}