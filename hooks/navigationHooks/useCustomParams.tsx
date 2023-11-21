import {useState,useEffect, useCallback} from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
type CustomSearchParams = {
    selectedUser?:number,
    selectedGroup?:number,
    selectedChat?:number
}
export default function useCustomParams(){
    const [customSearchParams,setCustomSearchParams] = useState<CustomSearchParams>({})
    const searchParams = useSearchParams();
    useEffect(()=>{
        if(searchParams){
            let user = parseInt(searchParams.get('user')||"0")||0;
            let group = parseInt(searchParams.get('group')||"0")||0;
            let chat = parseInt(searchParams.get('chat')||"0")||0;
            setCustomSearchParams({selectedChat:chat,selectedGroup:group,selectedUser:user});
        }
    },[searchParams])
    return customSearchParams;
}

export function useManipQuery(){
    const query = useSearchParams();
    const manipQuery = useCallback((key:string,value?:string,queriesToRemove?:string[])=>{
      const params = new URLSearchParams(query as any);
        if(value){
            params.set(key,value);
        }
        if(queriesToRemove){
            queriesToRemove?.forEach((key)=>{
                params.delete(key);
            })
        }
        return params.toString();
    },[query]);
    return manipQuery;
}