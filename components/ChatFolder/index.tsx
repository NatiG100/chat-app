import Link from "next/link";
import { ReactNode } from "react";

export type ChatFolderProps = {
    href:string,
    text:string,
    icon:ReactNode,
    active:boolean
}
export default function ChatFolder({href,text,icon,active}:ChatFolderProps){
    return(
        <Link 
            href={href} 
            replace 
            className={`
                w-full flex items-center flex-col gap-2 py-2
                ${active?"text-light-text dark:text-dark-text":"text-light-text-lighter dark:text-dark-text-darker"} 
                transition-all duration-300 hover:bg-black/20
            `}
        >
            <span className="text-2xl">{icon}</span>
            <p className="text-sm">{text}</p>
        </Link>
    )
}