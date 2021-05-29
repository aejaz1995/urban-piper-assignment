import React,{ useEffect, useRef } from "react"

// down arrow button custom hook
export function useKeyDown(key, cb){

    const callbackRef = useRef(cb)
    
    useEffect(()=>{
    
        callbackRef.current = cb
    })

    useEffect(()=>{
        function handle(event){
            if(event.code === key)
            {
                callbackRef.current(key)
            }
        }
        document.addEventListener("keydown", handle)
        return ()=> document.removeEventListener("keydown", handle)
    }, [key])
    
}
// up arrow button custom hook
export function useKeyUp(key, cb){

    const callbackRef = useRef(cb)
    
    useEffect(()=>{
            callbackRef.current = cb
    })

    useEffect(()=>{
        function handle(event){
            if(event.code === key)
            {
                callbackRef.current(key)
            }
        }
        
        document.addEventListener("keyup", handle)   
        return ()=> document.removeEventListener("keydown", handle)
    }, [key])
    
}

// Enter custom hook
export function useEnter(key, cb){

    const callbackRef = useRef(cb)
    
    useEffect(()=>{
        callbackRef.current = cb
    })

    useEffect(()=>{
        function handle(event){
            if(event.code === key)
            {
                callbackRef.current(key)
            }
        }
        
        document.addEventListener("keypress", handle)   
        return ()=> document.removeEventListener("keypress", handle)
    }, [key])
    
}