import {usePathname} from 'next/navigation'
import { useEffect, useState } from 'react'
export default function(){
    const [title,setTitle] = useState("")
    const pathname = usePathname();
    useEffect(()=>{
        if(pathname){
            if(pathname.includes("/settings")){
                setTitle("User Settings")
            }else if(pathname.includes("/groups")){
                setTitle("Group Settings")
            }else{
                setTitle("")
            }
        }
    },[pathname])
    return title;
}