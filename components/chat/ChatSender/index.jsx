import BaseButton from "@/components/uiElements/buttons/BaseButton";
import {IoMdSend} from 'react-icons/io'

export default function ChatSender(){
    return(
        <div className="w-full relative h-32 lg:h-40">
            <textarea 
                className="
                    text-sm lg:text-lg h-full
                    transition-colors duration-300 align-top pt-3
                    w-full focus:outline-none bg-[#e4e4e4] dark:bg-[#282f3e]
                    m-0 mb-0 pl-4 resize-none overflow-y-auto border-none border-t-2 border-black/10
                    focus:text-light-text focus:dark:text-dark-text
                    text-light-text-lighter dark:text-dark-text-darker
                    placeholder:dark:text-gray-600 placeholder:text-gray-400 pr-24
                "
                placeholder="type a message here"
            />
            <div className="absolute bottom-4 right-6">
                <button><IoMdSend className="text-primary text-3xl opacity-60 hover:opacity-100 transition-all duration-300"/></button>
            </div>
        </div>
    );
}