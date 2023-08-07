"use client"
import Input from "@/components/uiElements/Textfield";
import Button from "@/components/uiElements/buttons";
import UserService from "@/services/userService";
import { TypeErrorRes } from "@/types/api";
import { TypeUser } from "@/types/enteties";
import Link from "next/link";
import {useForm} from 'react-hook-form'
import {useMutation} from 'react-query'

export default function Register(){
    const {
        data,
        error,
        isLoading,
        mutate:reqRegister
    } = useMutation<TypeUser,TypeErrorRes,TypeUser>('register',UserService.register)
    const {register,handleSubmit,watch,formState:{errors},} = useForm<TypeUser>();
    const onRegister = (user:TypeUser)=>{
        reqRegister(user);
    }
    return(
        <>
            <p className="text-primary text-lg md:text-xl mb-6">Register</p>
            {/* <p className="text-sm text-light-text-lighter dark:text-dark-text-darker">
                Register to chat app name and start chatting with your frieds 
            </p> */}
            <form onSubmit={handleSubmit(onRegister)}>
                <Input 
                    attr={{
                        placeholder:"Your First Name",
                        id:"firstName",
                        ...register("firstName",{required:"First name is a required field"})
                    }}
                    text="First Name *"
                    error={errors.firstName?.message}
                />
                <Input 
                    attr={{
                        placeholder:"Your Last Name (optional)",
                        id:"lastName",
                        ...register("lastName")
                    }}
                    text="Last Name"
                    error={errors.lastName?.message}
                />
                <Input 
                    attr={{
                        placeholder:"username",
                        id:"username",
                        ...register("username",{required:"User name is a required field"})
                    }}
                    text="Username *"
                    error={errors.username?.message}
                />
                <Input 
                    attr={{
                        placeholder:"Your phone number",
                        id:"phoneNumber",
                        type:"tel",
                        ...register("phoneNumber",{required:"Phone number is a required field"})
                    }}
                    text="Phone Number *"
                    error={errors.phoneNumber?.message}
                />
                <Input 
                    attr={{
                        placeholder:"Password",
                        id:"password",
                        type:"password",
                        disabled:isLoading,
                        ...register("password",{required:"Password is a required field"})
                    }}
                    text="Create Password *"
                    error={errors.password?.message}
                />
                <p className="mx-2 text-warning font-light animate-pulse">
                    {error&&(Array.isArray(error.message)?error.message.join(',\n'):error.message)}
                </p>
                <Button>Register</Button>
            </form>
            <p className="text-sm font-light text-gray-600 dark:text-gray-300">Or
                <Link href={"/login"} className=" text-primary font-semibold hover:underline transition-all ml-2" replace>
                    Sign in
                </Link> if you already have an account
            </p>
        </> 
    );
}