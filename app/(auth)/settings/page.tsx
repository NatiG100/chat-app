"use client"
import SingleImageUpload from "@/components/SingleImageUpload";
import Input from "@/components/uiElements/Textfield";
import Button from "@/components/uiElements/buttons";
import useUser from "@/hooks/useUser";
import AuthService from "@/services/authService";
import UserService from "@/services/userService";
import { TypeChangePassword, TypeErrorRes, TypeSuccessRes, UpdateProfile } from "@/types/api";
import { TypeUser } from "@/types/enteties";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef,useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

export default function Setting() {
  const searchParams = useSearchParams();
  return (
      <div className=' w-full bg-light-surfce dark:bg-dark-surface'>
        {(searchParams.get('tab')==="password")? <PasswordSetting/>:<ProfileSetting/>}
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
                    placeholder:"Current Password",
                    id:"oldPassword",
                    type:"password",
                    ...register("oldPassword",{required:"Old password is a required field"})
                }}
                text="Current Password *"
                error={errors.oldPassword?.message}
            />
           <Input 
                attr={{
                    placeholder:"New Password",
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
                    placeholder:"Confirm Password",
                    id:"confirmPassword",
                    type:"password",
                    disabled:isLoading,
                    ...register("confirmPassword",{
                      required:"Please confirm your password",
                      validate:value=>value===newPassword.current ||"The passwords do not match"
                    })
                }}
                text="Confirm Password *"
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
function ProfileSetting(){
//image 
const [image,setImage] = useState<string|null>(null);
const [imageFile,setImageFile] = useState<File|null>(null);
const {
    data,
    error,
    isLoading,
    mutate:reqRegister
  } = useMutation<TypeUser,TypeErrorRes,UpdateProfile>('changeProfile',UserService.changeProfile)
  let user = useUser();
  useEffect(()=>{
    if(user){
        let value:string|null;
        if(!user.profileImg){
            value = null
        }else{
            value = "https://ucarecdn.com/"+user.profileImg+"/"
        }
        setImage(value)
    }
  },[user])
  const {register,handleSubmit,watch,formState:{errors,touchedFields}} = useForm<UpdateProfile>({defaultValues:{
    firstName:user?.firstName,
    lastName:user?.lastName,
    phoneNumber:user?.phoneNumber,
    username:user?.username
  }});
  const onRegister = (user:UpdateProfile)=>{
    user.profileImg = imageFile
      reqRegister(user);
  }
  
  return(
      <div className="max-w-2xl m-6 lg:m-16 my-3 lg:my-8 max-h-full overflow-y-auto">
          <p className="text-primary text-lg md:text-xl mb-6">Register</p>
          {/* <p className="text-sm text-light-text-lighter dark:text-dark-text-darker">
              Register to chat app name and start chatting with your frieds 
          </p> */}
        <form onSubmit={handleSubmit(onRegister)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-x-6 gap-y-0 py-0 my-0 h-max">
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
            </div>
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
              <p className="mx-2 text-warning font-light animate-pulse">
                  {error&&(Array.isArray(error.message)?error.message.join(',\n'):error.message)}
              </p>
              <p className="text-sm md:text-base text-light-text dark:text-gray-200  my-3">Profile Image</p>
                <SingleImageUpload img={image} setImg={setImage} setFile={setImageFile}/>
                <div className="w-full max-w-[230px] float-right">
                    <Button attr={{disabled:isLoading}}>Save changes</Button>
                </div>
          </form>
      </div> 
  );
}