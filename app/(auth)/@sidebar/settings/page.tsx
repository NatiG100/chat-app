"use client"
import ListButton from "@/components/uiElements/buttons/ListButton";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import {FaUser,FaLock} from 'react-icons/fa'
import {MdOutlineLogout} from 'react-icons/md'
import { useDispatch } from "react-redux";
import {useMutation} from 'react-query'
import AuthService from "@/services/authService";
import { TypeErrorRes, TypeSuccessRes } from "@/types/api";
import { logout } from "@/store/authStore";
import { useRouter, useSearchParams } from "next/navigation";

export default function ChatSidebar(){
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
        <div className="h-full w-full dark:bg-dark bg-light border-r-2 border-black/20">
            <div className="h-[65px] w-full flex items-center justify-start px-6 mb-6">
                <Image height={200} width={200} alt="icon" src={"/message-icon.png"} className="h-[35px] w-[35px]"/>
            </div>
            <ListButton selected={searchParams.get('tab')!=="password"} attr={{onClick:()=>{router.push('/settings?tab=profile')}}}>
                <FaUser/>
                <p>Edit Profile</p>
            </ListButton>
            <ListButton selected={searchParams.get('tab')==="password"} attr={{onClick:()=>{router.push('/settings?tab=password')}}}>
                <FaLock/>
                <p>Change Password</p>
            </ListButton>
            <ListButton selected={false} attr={{onClick:()=>reqLogout()}}>
                <MdOutlineLogout className="text-warning text-xl"/>
                <p className="text-warning">Logout</p>
            </ListButton>
        </div>
    )
}