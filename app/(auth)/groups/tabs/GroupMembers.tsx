import Member from "@/components/group/Member"
import Button from "@/components/uiElements/buttons"
import GroupService from "@/services/groupService"
import { TypeErrorRes, TypeFetchMembersRes } from "@/types/api"
import { group } from "console"
import { useQuery } from "react-query"
import {BiPlus} from 'react-icons/bi'
import Modal from "@/components/uiElements/Modal"
import { useState } from "react"

export default function GroupMembers({groupId}:{groupId:number}){
    const [showAddMember,setShowAddMember] = useState(false);
    const showAddMemberModal = ()=>{
        setShowAddMember(true);
    }
    const hideAddMemberModal = ()=>{
        setShowAddMember(false);
    }
    const {
        data:members,
        isLoading,
        isError
    } = useQuery<TypeFetchMembersRes,TypeErrorRes>(
        ["fetchMembers",groupId],
        ()=>GroupService.fetchGroupMembers(groupId)
    )
    if(isLoading) return <p>Loading ...</p>
    if(isError) return <p className="text-red-600">Error!</p>
    return (
        <div className="w-full max-w-max">
            {showAddMember&&<AddMemberModal onClose={hideAddMemberModal}/>}
            <div className="max-w-2xl m-6 lg:m-16 my-3 lg:my-8 max-h-full overflow-y-auto">
                <p className="text-primary text-lg md:text-xl mb-6">Group Members</p>
                {members?.members.map((member)=>(
                    <Member
                        key={member.user.id}
                        isSuperAdmin={members.superAdmin.id===member.user.id}
                        {...member}
                    />
                ))}
                <div className="mt-8">
                    <Button attr={{onClick:showAddMemberModal}}>
                        <BiPlus className="text-2xl"/>
                        Add Member
                    </Button>
                </div>
            </div>
        </div>
    )
}

const AddMemberModal = ({onClose}:{onClose:()=>void})=>{
    // const {
    //     data,
    //     error,
    //     isLoading,
    //     mutate
    // } = useMutation<TypeGroup,TypeErrorRes,CreateGroup>('createGroup',GroupService.create)
    // const {register,handleSubmit,watch,formState:{errors},} = useForm<CreateGroup>();
    // const onRegister = (user:CreateGroup)=>{
    //     mutate(user);
    // }
    return(
        <Modal onClose={onClose}>
            <p className="text-primary text-lg md:text-xl mb-6">Select Member</p>
            
        </Modal>
    )
}