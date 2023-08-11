export type TypeButtonProps = {
    children:React.ReactNode, 
    attr?:React.ButtonHTMLAttributes<HTMLButtonElement>
    my?:"my-1"|"my-2"|"my-4"|"my-6"|"my-8"
    className?:string
}
export default function Button ({attr,children,my="my-4",className}:TypeButtonProps){
    return(
        <button className={`
            dark:hover:bg-white/10 hover:bg-black/10 p-[6px] 
            transition-all hover:shadow-sm
            border-2 rounded-md  w-full py-[6px] text-base md:text-lg ${my}
            disabled:opacity-60 flex items-center justify-center gap-3
            border-primary text-primary ${className}
            `}
            {...attr}
        >
            {children}
        </button>
    )
}