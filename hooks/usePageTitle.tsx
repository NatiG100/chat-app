import {usePathname} from 'next/navigation'
import { useEffect, useState } from 'react'
export default function(){
    const [title,setTitle] = useState("")
    const pathname = usePathname();
    useEffect(()=>{
        if(pathname){
            switch(pathname){
                case "/settings":
                    setTitle("Settings")
                    break;
                default:
                    setTitle("")
            }
        }
    },[pathname])
    return title;
}