import Button, { TypeButtonProps } from "../buttons"

export interface DialogBoxProps{
    title:string,
    body:React.ReactNode,
    actions:React.ReactNode,
    actionClassName?:string,
    titleClassName?:string,
    className?:string,
    color?: "primary"|"success"|"warning"|"error"|"default",
}

export default function DialogBox(props:DialogBoxProps){
    return (
        <div 
            onClick={(event)=>{event.stopPropagation()}}
        >
            <p className={`
                text-lg font-semibold
                mb-2
                ${
                    props.color==='primary'?'text-primary':
                    props.color==='success'?'text-green-600':
                    props.color==='warning'?'text-yellow-600':
                    props.color==='error'?'text-red-500':
                    'text-gray-600'
                }
            `}>{props.title}</p>
            <div className="w-full h-max dark:text-gray-300">{props.body}</div>
            <div className={`flex gap-2 items-end justify-end pt-2 mt-4 ${props.actionClassName}`}>
                {
                    props.actions
                }
            </div>
        </div>
    )
}