import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {FaWindowClose} from 'react-icons/fa'
import BaseButton from "../uiElements/buttons/BaseButton";
export interface TypeSingleImageUpload{
    img:string | null,
    setImg:(value:string|null)=>void,
    setFile?:(file:File|null)=>void
}

export default function SingleImageUpload({setFile=()=>{},setImg,img}:TypeSingleImageUpload){
    const onDrop = useCallback((acceptedFiles:File[])=>{
        setFile(acceptedFiles[0]);
        const reader = new FileReader();
        reader.onload = () =>{
            setImg(reader.result as string);
        }
        reader.readAsDataURL(acceptedFiles[0]);
    },[])
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept
    } = useDropzone({
            onDrop,
            accept:{
                'image/png':['.png'],
                'image/gif':['.gif'],
                'image/jpeg':['.jpg','.jpeg']
            },
            maxFiles:1,
        });
    return(
        <div {...getRootProps()} className="w-64 h-64 relative rounded-full">
            {img&&<div className="absolute top-0 right-0 text-warning/50 hover:text-warning z-50 transition-colors">
                <BaseButton attr={{onClick:(e)=>{
                    e.stopPropagation();
                    setFile(null);setImg(null)
                }}}><FaWindowClose/></BaseButton>
            </div>}
            <img
                src={img?img:"/noProfile.png"}
                alt=""
                width={400}
                height={400}
                className="absolute w-full h-full top-0 left-0 object-cover rounded-full"
            />
            <input {...getInputProps()}/>
            <div className="
                absolute top-0 right-0 w-full h-full flex items-center justify-center rounded-full
            ">
                {
                    !img&&
                    <div className="
                        absolute top-0 right-0 h-full w-full flex items-center justify-center
                        rounded-full
                    ">
                    </div>
                }
                {
                    
                    !isDragActive?
                        <div className="h-full w-full rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-all p-4">
                            <p className=" text-indigo-50 bg-primary/50 px-4 py-2 rounded-full">Drag 'n' drop an image here, or click</p>
                        </div>:
                    isDragAccept?
                        <div className="h-full w-full rounded-full flex items-center justify-center  bg-primary/50 border-2 border-dashed">
                            <p className=" text-primary dark:text-indigo-50">drop the image here</p>
                        </div>:
                        <div className="h-full w-full rounded-full flex flex-col items-center justify-center  bg-warning/50 border-2 border-warning border-dashed">
                            <p className=" text-warning dark:text-red-100">The file is not acceptable!</p>
                            <p className=" text-warning dark:text-red-100">check the file type</p>
                            <p className=" text-warning dark:text-red-100">(multiple files are not also acceptable)</p>
                        </div>
                }
            </div>
        </div>
    );
}