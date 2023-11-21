import Image from "next/image";

export default function Loading(){
    return(
        <div className="fixed top-0 left-0 h-screen w-screen bg-light dark:bg-dark flex items-center justify-center">
            <Image
                src={"/loading-animation.svg"}
                alt="loading"
                height={200}
                width={200}
                className="h-14 w-14 md:h-18 md:w-18 lg:h-32 lg:w-32"
            />
        </div>
    )
}