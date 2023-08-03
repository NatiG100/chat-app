import { ReactNode } from "react"

type TypeBackdropProps = {
    onClose:()=>void
    children:ReactNode
    className?:string
    onAnimationEnd?:()=>void
}

export default function Backdrop({onClose,children,className,onAnimationEnd=()=>{}}:TypeBackdropProps){
    return(
        <div 
            className={`${className} fixed w-screen h-screen bg-black/60 backdrop-blur-sm`} 
            onClick={onClose}
            onAnimationEnd={onAnimationEnd}
        >
            {children}
        </div>
    );
}