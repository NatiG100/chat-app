import {useState,useEffect} from 'react';
import {useSearchParams} from 'next/navigation'
export default function useTab(){
    const [tab,setTab] = useState<string|null>(null)
    const searchParams = useSearchParams();
    useEffect(()=>{
        if(searchParams){
            setTab(searchParams.get('tab')||null);
        }
    },[searchParams])
    return tab;
}