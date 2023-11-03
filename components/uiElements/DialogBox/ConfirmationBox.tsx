import DialogBox from ".";
import {useRef, useEffect} from 'react';
import Button from "../buttons";

export interface ConfirmationBoxProps{
    callBack:(confirmed:boolean)=>void,
    title:string,
    prompt:string,
    color?: "primary"|"success"|"warning"|"error"|"default",
}

export default function(props:ConfirmationBoxProps){
    const buttonRef = useRef<HTMLButtonElement>(null);
    useEffect(()=>{
        if(buttonRef){
            buttonRef.current?.focus();
        }
    },[buttonRef]);
    return(
        <DialogBox
            title={props.title}
            body={<p>{props.prompt}</p>}
            color={props.color}
            actions={
                <>
                    <Button 
                        className="border-green-500 text-green-500"
                        attr={{
                            onClick:()=>{props.callBack(true)}
                        }}
                    >Yes</Button>
                    <Button 
                        className="border-red-500 text-red-500"
                        attr={{
                            onClick:()=>{props.callBack(false)}
                        }}
                    >Yes</Button>
                </>
            }
        />
    )
}