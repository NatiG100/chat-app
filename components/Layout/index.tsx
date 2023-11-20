import { ReactElement, ReactNode, useEffect } from "react"
import Backdrop from "../surfaces/Backdrop"
import useAnimateOnWillUnmount from "@/hooks/useAnimateOnWillUnmount"
import BaseButton from "../uiElements/buttons/BaseButton"

type TypeLayoutProps = {
    sidebar:ReactNode,
    body:ReactNode,
    sidebarOpen:boolean,
    closeSideBar:()=>void
}

export default function Layout({sidebar,body,sidebarOpen,closeSideBar}:TypeLayoutProps){
    const {onAnimationEnd,shouldRender,show} = useAnimateOnWillUnmount(false,sidebarOpen);
    useEffect(()=>{
        console.log(sidebarOpen);
    },[sidebarOpen])
    return(
        <div className=" w-full transition-all duration-400 grid grid-cols-1 md:grid-cols-[2fr,3fr] lg:grid-cols-[2fr,5fr] xl:grid-cols-[1fr,3fr] 2xl:grid-cols-[1fr,4fr] h-screen">
            <div className="hidden md:block w-full h-full overflow-x-hidden overflow-y-auto">
                {sidebar}
            </div>
            {shouldRender&&<Backdrop 
                className={`block md:hidden `} 
                onClose={closeSideBar}
                onAnimationEnd={onAnimationEnd}
            >
                <div className={`w-full max-w-md h-full ${show?'animate-slide-in':'animate-slide-out'}`} onClick={(e)=>{e.stopPropagation()}}>
                    {sidebar}
                </div>
            </Backdrop>}
            <div className="w-full h-full shrink-0">
                {body}
            </div>
        </div>
    )
}