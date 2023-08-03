import { ReactElement, ReactNode, useEffect } from "react"
import Backdrop from "../surfaces/Backdrop"
import useAnimateOnWillUnmount from "@/hooks/useAnimateOnWillUnmount"

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
        <div className="transition-all duration-400 grid grid-cols-1 md:grid-cols-[2fr,3fr] lg:grid-cols-[2fr,5fr] xl:grid-cols-[1fr,3fr] 2xl:grid-cols-[1fr,4fr] h-screen">
            <div className="bg-red-600 hidden md:block w-full h-full">
                {sidebar}
            </div>
            {shouldRender&&<Backdrop 
                className={`block md:hidden ${show?'animate-slide-in':'animate-slide-out'}`} 
                onClose={closeSideBar}
                onAnimationEnd={onAnimationEnd}
            >
                <div className="bg-red-600 w-full max-w-md h-full" onClick={(e)=>{e.stopPropagation()}}>
                    {sidebar}
                </div>
            </Backdrop>}
            <div className="bg-yellow-600 w-full h-full">
                {body}
            </div>
        </div>
    )
}