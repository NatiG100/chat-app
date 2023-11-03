import Member from "@/components/group/Member"
import Button from "@/components/uiElements/buttons"
import GroupService from "@/services/groupService"
import { TypeErrorRes, TypeFetchMembersRes, TypeSuccessRes, } from "@/types/api"
import { useMutation, useQuery, useQueryClient } from "react-query"
import useUser from "@/hooks/useUser"

export default function TransferOwnership({groupId}:{groupId:number}){
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
    
    //api call to transferOwnership
    const {
        isLoading:isTransferLoading,
        isError:isTransferError,
        mutate:transferOwnership
    } = useMutation<TypeSuccessRes,TypeErrorRes,{userId: number, groupId: number}>('transferOwnership',GroupService.transferOwnership);
    const queryClient = useQueryClient();

    const handleTransferOwnership = (userId?:number)=>()=>{
        if(userId){
            transferOwnership({userId,groupId});
            queryClient.invalidateQueries({queryKey:["fetchMembers",groupId]}).then(()=>{
                refetchMembers();
            });
        }
    }

    
    if(isLoading) return <p>Loading ...</p>
    if(isError) return <p className="text-red-600">Error!</p>
    return (
        <div className="w-full max-w-max">
            <div className="max-w-2xl m-6 lg:m-16 my-3 lg:my-8 max-h-full overflow-y-auto">
                <p className="text-primary text-lg md:text-xl mb-6">Transfer Ownership To</p>
                {members?.members.map((member)=>(
                    <Button 
                        className="border-none text-start" my="my-1"
                        attr={{
                            onClick:handleTransferOwnership(member.user.id),
                            disabled:isTransferLoading,
                        }}
                    >
                        <Member
                            key={member.user.id}
                            isSuperAdmin={members.superAdmin.id===member.user.id}
                            {...member}
                        />
                    </Button>
                ))}
            </div>
        </div>
    )
}