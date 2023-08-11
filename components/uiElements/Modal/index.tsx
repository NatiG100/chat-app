import Backdrop from "@/components/surfaces/Backdrop";
import { ReactNode } from "react";

export type ModalProps = {
    children:ReactNode,
    onClose:()=>void
}
export default function Modal({onClose,children}:ModalProps){
    return(
        <Backdrop onClose={onClose}>
            <div className="flex items-center justify-center h-full w-full">
                <div 
                    className='
                        transition-all w-full max-w-xl bg-light 
                        dark:bg-dark-surface p-9 shadow-md max-h-full  
                        overflow-y-auto rounded-none sm:rounded-md
                        mx-auto my-auto
                    '
                    onClick={(e)=>{e.stopPropagation()}}
                >
                    {children}
                </div>
            </div>
        </Backdrop>
    );
}