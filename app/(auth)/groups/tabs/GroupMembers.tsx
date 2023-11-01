import Member from "@/components/group/Member"
import Button from "@/components/uiElements/buttons"
import GroupService from "@/services/groupService"
import { TypeErrorRes, TypeFetchMembersRes, TypeFetchUsersRes, TypeSuccessRes, permissions } from "@/types/api"
import { group } from "console"
import { useMutation, useQuery, useQueryClient } from "react-query"
import {BiPlus} from 'react-icons/bi'
import Modal from "@/components/uiElements/Modal"
import { useCallback, useMemo, useState } from "react"
import useUser from "@/hooks/useUser"
import UserService from "@/services/userService"

export default function GroupMembers({groupId}:{groupId:number}){
    //state logic to control add member modal visibility
    const [showAddMember,setShowAddMember] = useState(false);
    const showAddMemberModal = ()=>{
        setShowAddMember(true);
    }
    const hideAddMemberModal = ()=>{
        setShowAddMember(false);
    }

    //get user data
    const user = useUser();

    //api call to group members
    const {
        data:members,
        isLoading,
        isError,
        refetch:refetchMembers,
    } = useQuery<TypeFetchMembersRes,TypeErrorRes>(
        ["fetchMembers",groupId],
        ()=>GroupService.fetchGroupMembers(groupId),
    );
    function isUserSuperAdmin(){
        if(user&&members){
            return members.superAdmin.id===user.id;
        }
    };
    function canUserDo (requiredPermission:permissions){
        if(isUserSuperAdmin()) return true;
        else if(members&&user){
            let foundAdmin = members.admins.filter((admin)=>(admin.userId===user.id));
            if(foundAdmin.length===0)return false;
            return foundAdmin[0].permissions.filter(
                (permission)=>(permission.permission===requiredPermission)
            ).length!==0;
        }
        return false;
    };
    
    if(isLoading) return <p>Loading ...</p>
    if(isError) return <p className="text-red-600">Error!</p>
    return (
        <div className="w-full max-w-max">
            {
                showAddMember&&
                <AddMemberModal 
                    onClose={hideAddMemberModal} 
                    groupId={groupId}
                    excludeIds={[
                        members?.superAdmin.id,
                        ...members?members.admins.map((member)=>(member.userId)):[],
                        ...members?members.members.map((member)=>(member.user.id)):[]
                    ]}
                    refetchMembers={refetchMembers}
                />}
            <div className="max-w-2xl m-6 lg:m-16 my-3 lg:my-8 max-h-full overflow-y-auto">
                <p className="text-primary text-lg md:text-xl mb-6">Group Members</p>
                {members?.members.map((member)=>(
                    <Member
                        key={member.user.id}
                        isSuperAdmin={members.superAdmin.id===member.user.id}
                        {...member}
                        showActions={canUserDo(permissions.CHANGE_MEMBER_STATUS)}
                    />
                ))}
                {
                    canUserDo(permissions.ADD_MEMBER)&&
                    <div className="mt-8">
                        <Button attr={{onClick:showAddMemberModal}}>
                            <BiPlus className="text-2xl"/>
                            Add Member
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}

const AddMemberModal = ({
    onClose,
    groupId,
    excludeIds,
    refetchMembers
}:{
    onClose:()=>void,
    groupId:number,
    excludeIds:(number|undefined)[],
    refetchMembers:()=>void
})=>{

    //fetch users
    const {
        data:users,
        error,
        isLoading,
        refetch:refetchUsers
    } = useQuery<TypeFetchUsersRes,TypeErrorRes>(
        ['fetchUsers',groupId],
        ()=>UserService.fetchUsers({
            page:0,
            limit:1000,
            select:{
                firstName:"true",
                lastName:"true",
                profileImg:"true",
                phoneNumber:"true",
                username:"true"
            }
        },)
    );

    //add-member mutation

    const {
        mutate:addMember,
        isLoading:isAdding,
        isError:isErrorAdding
    } = useMutation<TypeSuccessRes,TypeErrorRes,{userId:number,groupId:number}>
        (['addUserToGroup',groupId],GroupService.addGroupMember);

    const queryClient = useQueryClient();
    function handleAddMember(userId:number){
        addMember({userId,groupId});
        queryClient.invalidateQueries({queryKey:['fetchUsers',groupId]});
        queryClient.invalidateQueries({queryKey:["fetchMembers",groupId]});
        refetchMembers();
        refetchUsers();
    }
    let usersNotInGroup = users?.data.filter((user)=>(
        !excludeIds.includes(user.id)
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
                    usersNotInGroup?.map((user)=>(
                        <Button 
                            key={user.id} 
                            attr={{
                                onClick:()=>{user.id?handleAddMember(user.id):()=>{}},
                                disabled:isAdding
                            }}
                            className="border-none text-start"
                        >
                            <Member 
                                user={user} 
                                blocked={false} 
                                isSuperAdmin={false} 
                                showActions={false}
                            />
                        </Button>
                    ))
                }
            </div>
        </Modal>
    )
}