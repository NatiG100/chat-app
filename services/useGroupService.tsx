import {useQuery} from 'react-query';
import useUser from '../hooks/useUser';
import GroupService from './groupService';
import {TypeFetchAdminsRes,TypeErrorRes,permissions} from '../types/api'

export function useFetchAdmins(groupId:number){
    const user = useUser();
    //api call to group members
    const queryData = useQuery<TypeFetchAdminsRes,TypeErrorRes>(
        ["fetchAdmins",groupId],
        ()=>GroupService.fetchGroupAdmins(groupId),
    );
    function isUserSuperAdmin(){
        if(user&&queryData.data){
            return queryData.data.superAdmin.id===user.id;
        }
    };
    function canUserDo (requiredPermission:permissions){
        if(isUserSuperAdmin()) return true;
        if(queryData.data&&user){
            let foundAdmin = queryData.data.admins.filter((admin)=>(admin.user.id===user.id));
            if(foundAdmin.length===0)return false;
            return foundAdmin[0].permissions.filter(
                (permission)=>(permission.value===requiredPermission)
            ).length!==0;
        }
        return false;
    };
    return {
        ...queryData,
        isUserSuperAdmin,
        canUserDo,
    }
}