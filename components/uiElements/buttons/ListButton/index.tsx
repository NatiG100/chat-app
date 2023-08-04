import { ReactNode } from "react"

export type TypeButtonProps = {
    children:React.ReactNode,
    attr?:React.ButtonHTMLAttributes<HTMLButtonElement>,
    selected:boolean,
}
export default function ListButton ({
    children,
    attr,
    selected,
}:TypeButtonProps){
    return(
        <button
            {...attr}
            className={`transition-all duration-300 w-full flex items-center justify-start gap-3 py-3 px-3 font-light
                ${selected?
                "text-light-text dark:text-dark-text bg-black/20 hover:bg-black/30":
                "text-light-text-lighter dark:text-dark-text-darker hover:bg-black/20"
                }`
            } 
        >
            {children}
        </button>
    );
}