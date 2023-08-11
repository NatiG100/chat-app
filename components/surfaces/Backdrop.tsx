import { ReactNode } from "react"

type TypeBackdropProps = {
    onClose:()=>void
    children:ReactNode
    className?:string
}

export default function Backdrop({onClose,children,className,}:TypeBackdropProps){
    return(
        <div 
            className={`${className} fixed top-0 left-0 w-screen h-screen bg-black/60 backdrop-blur-sm`} 
            onClick={onClose}
        >
            {children}
        </div>
    );
}