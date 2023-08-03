import {useState,useCallback,useEffect} from 'react';
export default function(initial:boolean,showState?:boolean){
    const [show,setShow] = useState(initial);
    const [shouldRender,setShouldRender] = useState(initial);
    //if show state was provided use that to change 'show'
    useEffect(()=>{if(showState!==null&&showState!==undefined)setShow(showState);},[showState])
    const triggerRender = useCallback(()=>{setShow(true);},[]);
    const triggerRemove = useCallback(()=>{setShow(false);},[]);
    useEffect(()=>{if(show)setShouldRender(true);},[show]);
    const onAnimationEnd = useCallback(()=>{if(!show){setShouldRender(false);}},[show]);

    return{
        show,
        shouldRender,
        triggerRender,
        triggerRemove,
        onAnimationEnd,
    }
}