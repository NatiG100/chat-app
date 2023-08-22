"use client"
import { useSearchParams } from "next/navigation";
import GroupMembers from "../tabs/GroupMembers";
import GroupAdmins from "../tabs/GroupAdmins";
import TransferOwnership from "../tabs/TransferOwnership";
import GroupProfile from "../tabs/GroupProfile";

export default function GroupSetting({params}:{params:{id:string}}) {
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab');
    return (
        <div className=' w-full bg-light-surfce dark:bg-dark-surface'>
            {
                tab==="members"? <GroupMembers groupId={parseInt(params.id)}/>:
                tab==="admins"?<GroupAdmins groupId={parseInt(params.id)}/>:
                tab==="transfer"?<TransferOwnership groupId={parseInt(params.id)}/>:
                    <GroupProfile groupId={parseInt(params.id)}/>
            }
        </div>
    )
}
