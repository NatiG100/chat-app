import {FiSearch} from 'react-icons/fi'
import BaseButton from '../buttons/BaseButton';
export type TypeInputProps = {
    attr:React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,HTMLInputElement>
    my?:"my-1"|"my-2"|"my-4"|"my-6"|"my-8"
}

export default function LineTextfield({attr,my="my-4"}:TypeInputProps){
    return(
        <div className={`w-full relative ${my}`}>
            <FiSearch 
                className=" cursor-pointer text-xl absolute right-2 bottom-3 text-light-text dark:text-dark-text opacity-50 hover:opacity-100 transition-all"
            />
            <input
                className="
                    transition-colors duration-300
                    border-b border-gray-400 dark:border-gray-500 focus:dark:border-primary bg-transparent dark:text-gray-400 text-gray-700
                    focus:border-primary focus:dark:text-white focus:text-light-text
                    h-max p-2 w-full ring-0 outline-none py-2 font-light placeholder:text-gray-500/90 pr-8
                " 
                {...attr}
            />
        </div>
    );
}