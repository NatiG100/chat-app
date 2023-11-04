import Member from "@/components/group/Member"
import Button from "@/components/uiElements/buttons"
import GroupService, { PermissionParams } from "@/services/groupService"
import { TypeErrorRes, TypeFetchAdminsRes, TypeFetchMembersRes, TypeFetchUsersRes, TypeSuccessRes, permissions } from "@/types/api"
import { useMutation, useQuery, useQueryClient } from "react-query"
import {BiPlus} from 'react-icons/bi'
import Modal from "@/components/uiElements/Modal"
import { useState } from "react"
import useUser from "@/hooks/useUser"
import UserService from "@/services/userService"
import Admin from "@/components/group/Admin"
import {useFetchAdmins} from "@/services/useGroupService";

export default function GroupAdmins({groupId}:{groupId:number}){
    //state logic to control add member modal visibility
    const [showAddAdmin,setShowAddAdmin] = useState(false);
    const showAddAdminModal = ()=>{
        setShowAddAdmin(true);
    }
    const hideAddAdminModal = ()=>{
        setShowAddAdmin(false);
    }

    const {data:admins,isLoading,isError,refetch:refetchAdmins,canUserDo} = useFetchAdmins(groupId);

    //mutations to handle permission change
    const revokeMutation = useMutation<TypeSuccessRes,TypeErrorRes,PermissionParams>(['changePermission'],GroupService.revokePermission);
    const grantMutation = useMutation<TypeSuccessRes,TypeErrorRes,PermissionParams>(['changePermission'],GroupService.grantPermission);
    //reflect updates
    const queryClient = useQueryClient();
    function reflectChanges() {
        queryClient.invalidateQueries({queryKey:["fetchAdmins",groupId]}).then(()=>{
            refetchAdmins();
        });
    }
    
    if(isLoading) return <p>Loading ...</p>
    if(isError) return <p className="text-red-600">Error!</p>
    return (
        <div className="w-full max-w-max">
            {
                showAddAdmin&&
                <AddAdminModal 
                    onClose={hideAddAdminModal} 
                    groupId={groupId}
                    excludeIds={[
                        ...admins?admins.admins.map((admin)=>(admin.user.id)):[],
                    ]}
                    refetchAdmins={refetchAdmins}
                />
            }
            <div className="max-w-2xl m-6 lg:m-16 my-3 lg:my-8 max-h-full overflow-y-auto">
                <p className="text-primary text-lg md:text-xl mb-6">Group Admins</p>
                {admins?.admins?.map((admin)=>(
                    <Admin
                        key={admin.user.id}
                        user={admin.user}
                        permissions={admin.permissions}
                        showActions={false}
                        groupId={groupId}
                        revokeMutation={revokeMutation}
                        grantMutation={grantMutation}
                        refetch={reflectChanges}
                    />
                ))}
                {
                    canUserDo(permissions.ADD_ADMIN)&&
                    <div className="mt-8">
                        <Button attr={{onClick:showAddAdminModal}} className="px-5">
                            <BiPlus className="text-2xl"/>
                            Add Admin
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
    
}

const AddAdminModal = ({
    onClose,
    groupId,
    excludeIds,
    refetchAdmins
}:{
    onClose:()=>void,
    groupId:number,
    excludeIds:(number|undefined)[],
    refetchAdmins:()=>void
})=>{

    //fetch members
    const {
        data:members,
        error,
        isLoading,
        refetch:refetchMembers
    } = useQuery<TypeFetchMembersRes,TypeErrorRes>(
        ['fetchMembers',groupId],
        ()=>GroupService.fetchGroupMembers(groupId)
    );

    //add-member mutation

    const {
        mutate:addAdmin,
        isLoading:isAdding,
        isError:isErrorAdding
    } = useMutation<TypeSuccessRes,TypeErrorRes,{userId:number,groupId:number}>
        (['addAdminToGroup',groupId],GroupService.addGroupAdmin);

    const queryClient = useQueryClient();
    function handleAddAdmin(userId:number){
        addAdmin({userId,groupId});
        queryClient.invalidateQueries({queryKey:['fetchMembers',groupId]}).then(()=>{
            refetchMembers();
        });
        queryClient.invalidateQueries({queryKey:["fetchAdmins",groupId]}).then(()=>{
            refetchAdmins();
        });
    }
    let usersNotInGroup = members?.members.filter((user)=>(
        !excludeIds.includes(user.user.id)
    ));
    if(isLoading) return(
        <Modal onClose={onClose}>
                <p>Loading....</p>:
        </Modal>
    )
    if(error) return(
        <Modal onClose={onClose}>
                <p>Error</p>:
        </Modal>
    )
    return(
        <Modal onClose={onClose}>   
            <p className="text-primary text-lg md:text-xl mb-6">
                Select Member
            </p>
            <div>
                {
                    usersNotInGroup?.map((admin)=>(
                        <Button 
                            key={admin.user.id} 
                            attr={{
                                onClick:()=>{admin.user.id?handleAddAdmin(admin.user.id):()=>{}},
                                disabled:isAdding
                            }}
                            className="border-none text-start"
                        >
                            <Member 
                                user={admin.user} 
                                blocked={false} 
                                isSuperAdmin={false}
                            />
                        </Button>
                    ))
                }
            </div>
        </Modal>
    )
}