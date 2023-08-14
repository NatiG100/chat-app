import Image from "next/image";

export default function({src}:{src:string}){
    return (
        <Image 
            height="1000" 
            width="1000" 
            alt="profile" 
            src={src}
            className='lg:h-14 lg:w-14 h-8 w-8 rounded-full object-cover border-2 border-black/10 shrink-0'
        />
    )
}