import Textarea from "@/components/uiElements/Textarea";
import Input from "@/components/uiElements/Textfield";
import Button from "@/components/uiElements/buttons";
import GroupService from "@/services/groupService";
import { useFetchAdmins } from "@/services/useGroupService";
import { TypeErrorRes, TypeSuccessRes, UpdateGroup, permissions } from "@/types/api";
import { TypeGroup } from "@/types/enteties";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

export default function GroupProfile({groupId}:{groupId:number}){
    const {isUserSuperAdmin} = useFetchAdmins(groupId);
    const canUserUpdateProfile = isUserSuperAdmin();

    //fetch group
    const {
        data:group,
        isLoading:groupIsLoading,
        isError:groupIsError
    } = useQuery<TypeGroup,TypeErrorRes>(
        [groupId,"fetchGroup"],
        ()=>GroupService.fetchSingleGroup(groupId)
    );
    //update group mutation
    const {
        data,
        error,
        isLoading,
        mutate:updateGroup
    } = useMutation<TypeGroup,TypeErrorRes,UpdateGroup&{id:number}>('changePassword',GroupService.updateGroup);

    //form hook
    const {register,handleSubmit,formState:{errors},setValue} = useForm<UpdateGroup>({defaultValues:{
        name:group?.name,
        description:group?.description,
    },});
    useEffect(()=>{
        if(group){
            setValue('name',group.name)
            setValue('description',group.description)
        }
    },[group]);
    //handle form submit
    const onRegister = (user:UpdateGroup)=>{
        updateGroup({...user,id:groupId});
    }
    if(groupIsLoading) return <p>Loading...</p>
    return(
        <div className="max-w-2xl m-6 lg:m-16 my-3 lg:my-8 max-h-full overflow-y-auto">
            <p className="text-primary text-lg md:text-xl mb-6">Update Group</p>
            <form onSubmit={handleSubmit(onRegister)}>
                <Input 
                    attr={{
                        placeholder:"Group Name",
                        id:"groupName",
                        ...register("name",{required:"Name is a required field"}),
                        disabled:!canUserUpdateProfile
                    }}
                    text="Group Name *"
                    error={errors.name?.message}
                />
                <Input 
                    attr={{
                        id:"link",
                        disabled:true,
                        value:group?.link
                    }}
                    text="Group Link"
                />
                <Textarea
                    attr={{
                        placeholder:"A short description for the group",
                        onResize:()=>{},
                        ...register("description"),
                        disabled:!canUserUpdateProfile
                        
                    }}
                    text="Description"
                />
                <p className="mx-2 text-warning font-light animate-pulse">
                    {error&&(Array.isArray(error.message)?error.message.join(',\n'):error.message)}
                </p>
                {/* <p className="text-sm md:text-base text-light-text dark:text-gray-200  my-3">Profile Image</p> */}
                {/* <SingleImageUpload img={image} setImg={setImage} setFile={setImageFile}/> */}
                {canUserUpdateProfile&&
                    <div className="w-full max-w-[230px] float-right">
                        <Button attr={{disabled:isLoading}}>Save changes</Button>
                    </div>
                }
            </form>
        </div> 
    )
}