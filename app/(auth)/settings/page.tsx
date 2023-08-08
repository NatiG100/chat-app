"use client"
import Input from "@/components/uiElements/Textfield";
import Button from "@/components/uiElements/buttons";
import AuthService from "@/services/authService";
import UserService from "@/services/userService";
import { TypeChangePassword, TypeErrorRes, TypeSuccessRes } from "@/types/api";
import { TypeUser } from "@/types/enteties";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

export default function Setting() {
  const searchParams = useSearchParams();
  return (
      <div className='h-full w-full bg-light-surfce dark:bg-dark-surface'>
        {(searchParams.get('tab')==="password")&& <PasswordSetting/>}
      </div>
  )
}

function PasswordSetting(){
  const {
    data,
    error,
    isLoading,
    mutate:reqRegister
} = useMutation<TypeSuccessRes,TypeErrorRes,TypeChangePassword>('changePassword',AuthService.changePassword)
const {register,handleSubmit,watch,formState:{errors},} = useForm<TypeChangePassword>();
const onRegister = (user:TypeChangePassword)=>{
    reqRegister(user);
}
const newPassword = useRef({})
newPassword.current = watch("newPassword","");
return(
    <div className="max-w-2xl m-6 lg:m-16 my-3 lg:my-8 max-h-full overflow-y-auto">
        <p className="text-primary text-lg md:text-xl mb-6">Register</p>
        {/* <p className="text-sm text-light-text-lighter dark:text-dark-text-darker">
            Register to chat app name and start chatting with your frieds 
        </p> */}
        <form onSubmit={handleSubmit(onRegister)}>
            <Input 
                attr={{
                    placeholder:"Your First Name",
                    id:"oldPassword",
                    type:"password",
                    ...register("oldPassword",{required:"Old password is a required field"})
                }}
                text="Old Password *"
                error={errors.oldPassword?.message}
            />
           <Input 
                attr={{
                    placeholder:"Password",
                    id:"newPassword",
                    type:"password",
                    disabled:isLoading,
                    ...register("newPassword",{
                      required:"New password is a required field",
                      minLength:{value:6,message:"Password must have at least 6 characters"}
                    })
                }}
                text="New Password *"
                error={errors.newPassword?.message}
            />
            <Input 
                attr={{
                    placeholder:"Password",
                    id:"confirmPassword",
                    type:"password",
                    disabled:isLoading,
                    ...register("confirmPassword",{
                      required:"Please confirm your password",
                      validate:value=>value===newPassword.current ||"The passwords do not match"
                    })
                }}
                text="Create Password *"
                error={errors.confirmPassword?.message}
            />
            <p className="mx-2 text-warning font-light animate-pulse">
                {error&&(Array.isArray(error.message)?error.message.join(',\n'):error.message)}
            </p>
            <Button>Change Password</Button>
        </form>
    </div> 
);
}