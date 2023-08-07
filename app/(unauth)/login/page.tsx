"use client"
import Input from "@/components/uiElements/Textfield";
import Button from "@/components/uiElements/buttons";
import AuthService from "@/services/authService";
import { TypeErrorRes, TypeLogin } from "@/types/api";
import { TypeUser } from "@/types/enteties";
import {useForm} from 'react-hook-form'
import {useMutation} from 'react-query'

export default function Register(){
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
                    text="Create Password *"
                    error={errors.password?.message}
                />
                <Button>Sign In</Button>
                
            </form>
            <p className="mx-2 text-warning font-light animate-pulse">
                {error&&(Array.isArray(error.message)?error.message.join(',\n'):error.message)}
            </p>
        </> 
    );
}