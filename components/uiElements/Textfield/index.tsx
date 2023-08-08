export type TypeInputProps = {
    attr:React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,HTMLInputElement>
    error?:string
    text?:string
    my?:"my-1"|"my-2"|"my-4"|"my-6"|"my-8"
}

export default function Input({attr,error,text,my="my-4"}:TypeInputProps){
    return(
        <div className={`w-full ${my}`}>
            {text&&<p className="text-sm md:text-base text-light-text dark:text-gray-200  mb-1">{text}</p>}
            <input
                className="
                    transition-colors duration-300
                    border-2 border-gray-400 dark:border-gray-500 focus:dark:border-primary bg-transparent dark:text-gray-400 text-gray-700
                    focus:border-primary focus:dark:text-white focus:text-light-text
                    h-max p-2 rounded w-full ring-0 outline-none py-2 font-light placeholder:text-gray-500/90
                " 
                {...attr}
            />
            {error&&<p className="text-sm text-warning mt-2">{error}</p>}
        </div>
    );
}