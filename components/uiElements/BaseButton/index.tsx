type TypeBaseButtonProps = {
    children:React.ReactNode, 
    attr?:React.ButtonHTMLAttributes<HTMLButtonElement>
}
export default function BaseButton ({attr,children}:TypeBaseButtonProps){
    return(
        <button className='dark:hover:bg-white/10 hover:bg-black/10 p-1 rounded-full transition-all hover:shadow-xl' {...attr}>
            {children}
        </button>
    )
}