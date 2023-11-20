import Avatar from "@/components/uiElements/Avatar";
import Modal from "@/components/uiElements/Modal";
import Button from "@/components/uiElements/buttons";
import ToggleBtn from "@/components/uiElements/buttons/ToggleButton";
import { GET_IMG_URL, TypePermissionDetail, permissiosDetail } from "@/constants";
import { PermissionParams } from "@/services/groupService";
import { TypeAdmin, TypeErrorRes, TypeMember, TypeSuccessRes } from "@/types/api";
import { getPermissionDetail } from "@/utils";
import { useState } from "react";
import { UseMutationResult, } from "react-query";

export default function Admin({
    user,permissions,showActions,groupId,revokeMutation,grantMutation,context,refetch
}:TypeAdmin&{
    showActions:boolean,groupId:number,
    revokeMutation:UseMutationResult<TypeSuccessRes,TypeErrorRes,PermissionParams>,
    grantMutation:UseMutationResult<TypeSuccessRes,TypeErrorRes,PermissionParams>,
    context?:any,
    refetch:()=>void
}){
    const [showPermissionsModal,setShowPermissionsModal] = useState(false);
    function openPermissionsModal(){
        setShowPermissionsModal(true);
    }
    function closePermissionsModal(){
        setShowPermissionsModal(false);
    }
    const {
        mutate:revokePermision,
        isLoading:isRevokeLoading,
        isError:isRevokeError,
    } = revokeMutation;
    const {
        mutate:grantPermission,
        isLoading:isGrantLoading,
        isError:isGrantError,
    } = grantMutation;
    function handleOnTogglePermission (permissionId:number){
        if(user.id){
            const userHasPermission = permissions.filter((per)=>(per.id===permissionId))[0];
            userHasPermission?revokePermision({adminId:user.id,groupId:groupId,permissionId:getPermissionDetail(permissionId).id}):
                grantPermission({adminId:user.id,groupId:groupId,permissionId:getPermissionDetail(permissionId).id});
            refetch();
        }
    }
    return(
        <div className="w-full gap-8 grid grid-cols-[2fr,5fr,3fr]">
            <Avatar 
                src={`${GET_IMG_URL(user.profileImg)||'/noProfile.png'}`}
                className="h-16 w-16"
            />
            <div className="flex flex-col justify-center shrink-0">
                <p className="text-light-text dark:text-dark-text">
                    {user.firstName+" "+user.lastName}
                    
                </p>
                <p className="text-light-text-lighter dark:text-dark-text-darker">
                    {user.username}
                </p>
            </div>
            <Button 
                className="px-2"
                attr={{
                    onClick:openPermissionsModal
                }}
            >
                Permissions
            </Button>
            {
                showPermissionsModal&&
                <Modal onClose={closePermissionsModal}>
                    <p className="text-dark dark:text-light-surfce text-md md:text-lg">
                        {user.firstName} {user.lastName} <span className="text-black/50 dark:text-white/50 text-sm xl:text-md">@{user.username}</span>
                    </p>
                    <p className="text-primary text-lg md:text-xl mb-6">
                        Permissions
                    </p>
                    {
                        permissiosDetail.map((per)=>(
                            <Permission 
                                permission={per} 
                                userHasPermission={permissions.filter((permission)=>(permission.id===per.id))[0]&&true}
                                disabled={isRevokeLoading||isGrantLoading||!context.canChangePermission}
                                onToggle={()=>{handleOnTogglePermission(per.id)}}
                            />
                        ))
                    }
                </Modal>
            }
        </div>
    );
}

function Permission({
    permission,
    userHasPermission,
    disabled,
    onToggle=()=>{},
}:{
    permission:TypePermissionDetail,
    userHasPermission:boolean,
    disabled:boolean,
    onToggle?:()=>void
}){
    return(
        <div className="my-2">
            <div className="grid grid-cols-[1fr,max-content] gap-3">
                <div className="px-4 my-2">
                    <p className="text-dark dark:text-light">
                        {permission.title}
                    </p>
                    <p className="text-gray-500 text-sm">
                        {permission.description}
                    </p>
                </div>
                <ToggleBtn
                    isOn={userHasPermission}
                    onClick={onToggle}
                    disabled={disabled}
                />
            </div>
            <hr className="border-black/10"/>
        </div>
    );
}
