export type TypeButtonProps = {
    children:React.ReactNode, 
    attr?:React.ButtonHTMLAttributes<HTMLButtonElement>
    my?:"my-1"|"my-2"|"my-4"|"my-6"|"my-8"

}
export default function Button ({attr,children,my="my-4"}:TypeButtonProps){
    return(
        <button className={`
            dark:hover:bg-white/10 hover:bg-black/10 p-[6px] 
            transition-all hover:shadow-sm
            border-2 rounded-md border-primary text-primary w-full py-2 text-base md:text-lg ${my}
            `}
            {...attr}
        >
            {children}
        </button>
    )
}