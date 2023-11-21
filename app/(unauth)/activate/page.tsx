"use client"
import Loading from "@/components/uiElements/Loading";
import Input from "@/components/uiElements/Textfield";
import Button from "@/components/uiElements/buttons";
import useAuthRedirector from "@/hooks/useAuthRedirector";
import AuthService from "@/services/authService";
import { TypeErrorRes, TypeLogin, TypeSuccessRes } from "@/types/api";
import { TypeUser } from "@/types/enteties";
import Link from "next/link";
import {useForm} from 'react-hook-form'
import {useMutation} from 'react-query'

export default function Activate(){
    const {
        data,
        error,
        isLoading,
        mutate:login
    } = useMutation<TypeSuccessRes,TypeErrorRes,{code:number}>('activate',AuthService.activate)
    const {register,handleSubmit,watch,formState:{errors},} = useForm<{code:number}>();
    const onRegister = (code:{code:number})=>{
        login(code);
    }
    const {loading} = useAuthRedirector("inactive");
    if(loading) return <Loading/>
    return(
        <>
            <p className="text-primary text-lg md:text-xl mb-6">Activate</p>
            <p className="text-light-text-lighter dark:text-dark-text-darker mb-6">
                To activate your account, send us the 6 digit activation code we text you!
            </p>
            {/* <p className="text-sm text-light-text-lighter dark:text-dark-text-darker">
                Register to chat app name and start chatting with your frieds 
            </p> */}
            <form onSubmit={handleSubmit(onRegister)}>
                <Input 
                    attr={{
                        placeholder:"XXXXXX",
                        id:"code",
                        ...register("code",{
                            required:"Please provide the code",
                            pattern:{value:/^[1-9]{6,6}$/,message:"Invalid code"}
                        })
                    }}
                    error={errors.code?.message}
                />
                <p className="mx-2 text-warning font-light animate-pulse">
                    {error&&(Array.isArray(error.message)?error.message.join(',\n'):error.message)}
                </p>
                <Button>Activate account</Button>
            </form>
        </> 
    );
}