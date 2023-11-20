import Member from "@/components/group/Member"
import Button from "@/components/uiElements/buttons"
import GroupService from "@/services/groupService"
import { TypeErrorRes, TypeFetchMembersRes, TypeFetchUsersRes, TypeSuccessRes, permissions } from "@/types/api"
import { useMutation, useQuery, useQueryClient } from "react-query"
import {BiPlus} from 'react-icons/bi'
import Modal from "@/components/uiElements/Modal"
import { useState } from "react"
import UserService from "@/services/userService"
import { useFetchAdmins } from "@/services/useGroupService"

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
    const {canUserDo} = useFetchAdmins(groupId);

    //api call to block and unblock user
    const {
        isLoading:isBlockLoading,
        isError:isBlockError,
        mutate:changeUserStatus
    } = useMutation<TypeSuccessRes,TypeErrorRes,{userId:number,block:boolean}>(
        ['changeMemberStatus',groupId],
        ({userId,block}:{userId:number,block:boolean})=>GroupService.changeMemberStatus({block,groupId,userId})
    );
    const queryClient = useQueryClient();
    function handleChangeStatus(userId:number,block:boolean){
        changeUserStatus({block,userId});
        queryClient.invalidateQueries({queryKey:["fetchMembers",groupId]}).then(()=>{
            refetchMembers();
        });
    }
    
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
                        action={
                            canUserDo(permissions.CHANGE_MEMBER_STATUS)&&
                            <Button 
                                className={`w-32 ${member.blocked?"text-yellow-500 border-yellow-500":"text-warning border-warning"}`}
                                attr={{
                                    disabled:members.superAdmin.id===member.user.id||isBlockLoading,
                                    onClick:()=>handleChangeStatus(member.user.id as number,!member.blocked)
                                }}
                            >
                                {member.blocked?"Unblock":"Block"}
                            </Button>
                        }
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
        queryClient.invalidateQueries({queryKey:['fetchUsers',groupId]}).then(()=>{
            refetchUsers();
        });
        queryClient.invalidateQueries({queryKey:["fetchMembers",groupId]}).then(()=>{
            refetchMembers();
        });
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
                            />
                        </Button>
                    ))
                }
            </div>
        </Modal>
    )
}