"use client"
import Input from "@/components/uiElements/Textfield";
import Button from "@/components/uiElements/buttons";
import AuthService from "@/services/authService";
import { TypeErrorRes, TypeLogin } from "@/types/api";
import { TypeUser } from "@/types/enteties";
import Link from "next/link";
import {useForm} from 'react-hook-form'
import {useMutation} from 'react-query'
import {useRouter} from 'next/navigation'
import useUser from "@/hooks/useUser";
import { useEffect } from "react";
import useAuthRedirector from "@/hooks/useAuthRedirector";
import { useDispatch } from "react-redux";
import {login as loginAction} from '@/store/authStore'

export default function Login(){
    const {
        data,
        error,
        isLoading,
        mutate:login
    } = useMutation<TypeUser,TypeErrorRes,TypeLogin>('register',AuthService.login)
    const {register,handleSubmit,watch,formState:{errors},} = useForm<TypeLogin>();
    const onRegister = (user:TypeLogin)=>{
        login(user);
    }
    const dispatch = useDispatch()
    useEffect(()=>{
        if(data){
            dispatch(loginAction(data));
        }
    },[data])
    useAuthRedirector("unauth");
    return(
        <>
            <p className="text-primary text-lg md:text-xl mb-6">Login</p>
            {/* <p className="text-sm text-light-text-lighter dark:text-dark-text-darker">
                Register to chat app name and start chatting with your frieds 
            </p> */}
            <form onSubmit={handleSubmit(onRegister)}>
                <Input 
                    attr={{
                        placeholder:"Username",
                        id:"username",
                        ...register("username",{required:"Please provide your Username"})
                    }}
                    text="UserName *"
                    error={errors.username?.message}
                />
                <Input 
                    attr={{
                        placeholder:"Password",
                        id:"password",
                        type:"password",
                        disabled:isLoading,
                        ...register("password",{required:"Please provide your password"})
                    }}
                    text="Password *"
                    error={errors.password?.message}
                />
                <p className="mx-2 text-warning font-light animate-pulse">
                    {error&&(Array.isArray(error.message)?error.message.join(',\n'):error.message)}
                </p>
                <Button>Sign In</Button>
                <p className="text-sm font-light text-gray-600 dark:text-gray-300 ">Or
                    <Link href={"/register"} replace className=" text-primary font-semibold hover:underline transition-all ml-2">
                        Register
                    </Link> to create a new account
                </p>
            </form>
        </> 
    );
}