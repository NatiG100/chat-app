import Image from "next/image";

export default function({src,className}:{src:string,className?:string}){
    return (
        <Image 
            height="50" 
            width="50" 
            alt="profile" 
            src={src}
            className={`${className?className:"h-14 w-14"} rounded-full object-cover border-2 border-black/10 shrink-0`}
        />
    )
}