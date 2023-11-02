import {useState} from 'react';

export interface ToggleBtnProps{
    disabled?:boolean,
    isOn:boolean,
    onClick:()=>void,
}

export default function ToggleBtn({disabled=false,isOn=false,onClick}:ToggleBtnProps){
    return(   
        <div 
            onClick={onClick}
            className={`
            relative w-[32px] h-[16px] rounded-full ${isOn?"bg-primary":"bg-slate-200 border"}
            cursor-pointer ${disabled&&"opacity-60"} self-center mr-3
        `}>
            <div className={`
                absolute ${isOn?"right-0 top-[-1px]":"left-0 top-[-2px]"}  
                h-[18px] w-[18px] rounded-full ${isOn?"border-primary":"border-slate-300"} 
                bg-white shadow
                border border-slate-300
            `}></div>
        </div>
    )
}