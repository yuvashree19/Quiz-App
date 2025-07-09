import { useEffect } from "react"

export default function Timer({dispatch,secondsRemaining}){
    const minutes=Math.floor(secondsRemaining/60);
    const secs=Math.ceil(secondsRemaining%60);
    useEffect(function(){
        const id = setInterval(()=>dispatch({type:"tick"}),1000)
        return ()=>clearInterval(id)
    })
    return <div className="timer">{minutes < 10 ? `0${minutes}` : minutes } : {secs < 10 ? `0${secs}` : secs}</div>
}