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
            className={`
                grid grid-rows-autoRow p-4 rounded-lg bg-white min-w-[400px] shadow-lg
                ${
                    props.color==='primary'?'border-primary/60':
                    props.color==='success'?'border-green-300 border':
                    props.color==='warning'?'border-yellow-300 border':
                    props.color==='error'?'border-red-300 border':
                    'border-gray-400 border'
                }    
                ${props.className}`
            }
        >
            <p className={`
                text-lg font-semibold
                mb-2
                ${
                    props.color==='primary'?'text-primary':
                    props.color==='success'?'text-green-600':
                    props.color==='warning'?'text-yellow-600':
                    props.color==='error'?'text-red-600':
                    'text-gray-600'
                }
            `}>{props.title}</p>
            <div className="w-full h-max">{props.body}</div>
            <div className={`flex gap-2 items-center justify-end py-2 mt-4 ${props.actionClassName}`}>
                {
                    props.actions
                }
            </div>
        </div>
    )
}