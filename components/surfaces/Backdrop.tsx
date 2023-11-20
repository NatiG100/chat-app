import { ReactNode } from "react"

type TypeBackdropProps = {
    onClose:()=>void
    children:ReactNode
    className?:string
    onAnimationEnd:React.AnimationEventHandler<HTMLDivElement>
}

export default function Backdrop({onClose,children,className,onAnimationEnd}:TypeBackdropProps){
    return(
        <div 
            className={`${className} fixed top-0 left-0 w-screen h-screen bg-black/60 backdrop-blur-sm z-50`} 
            onClick={onClose}
            onAnimationEnd={onAnimationEnd}
        >
            {children}
        </div>
    );
}