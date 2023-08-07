"use client"
import BaseButton from "@/components/uiElements/buttons/BaseButton";
import { ReactNode } from "react";
import {IoMoonOutline as DarkIcon}  from 'react-icons/io5'
import {FiSun as LightIcon} from 'react-icons/fi'
import { useDispatch, useSelector } from "react-redux";
import { AppDispath, RootState } from "@/store";
import { TypePreference, toggleTheme } from "@/store/preferenceSlice";

export default function UnautLayout({children}:{children:ReactNode}){
    const dispatch = useDispatch<AppDispath>();
    const preference = useSelector<RootState,TypePreference>((state)=>state.preference)
    return (
        <div className="transition-all h-screen w-screen bg-light-surfce dark:bg-dark flex items-center justify-center">
            <div className="fixed right-2 top-2 lg:text-[23px] text-[18px] text-light-text dark:text-dark-text">
                <BaseButton attr={{onClick:(e)=>{dispatch(toggleTheme())}}}>
                    {preference.theme==="dark"?<DarkIcon className="stroke-1"/>:<LightIcon className="stroke-1"/>}
                </BaseButton>
            </div>
            <div className="transition-all w-full max-w-xl bg-light dark:bg-dark-surface p-9 shadow-lg h-full max-h-[680px] overflow-y-auto">
                {children}
            </div>
        </div>
    )
}