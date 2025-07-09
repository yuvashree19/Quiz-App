import { useEffect } from "react";
import Footer from "./Footer";
import NextButton from "./NextButton";
import Options from "./Options";
import Progress from "./Progress";
import Timer from "./Timer";

export default function Questions({question,answer,dispatch,points,totalPoints,index,numQuestions,secondsRemaining}){
    useEffect(function(){
        function callback(e){
            console.log(index)
            if(answer===null)return;
            if(e.code === "Enter"){
                if(index< numQuestions-1){
                    dispatch({type:"nextQuestion"});
                    
                }
                if(index === numQuestions-1){
                    console.log(index,"Finished")
                    dispatch({type:"finish"});
                }
            }
        }
        document.addEventListener("keydown",callback)
        return ()=>document.removeEventListener("keydown",callback)
    },[index,numQuestions,dispatch,answer])
    return <div>
        <Progress points={points} totalPoints={totalPoints} index={index} numQuestions={numQuestions} answer={answer}/>
        <h4>{question.question}</h4>
        <Options question={question} answer={answer} dispatch={dispatch}></Options>
        <Footer>
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions}/>
        </Footer>
        
    </div>
}