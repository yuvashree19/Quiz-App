import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./main";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import Questions from "./Question";
import StartScreen from "./StartScreen";
import FinishScreen from "./FinishScreen";

const initialState={
  questions:[],
  // loading,error,ready,active,finished
  status:"loading",
  index:0,
  answer:null,
  points:0,
  highScore:0,
  secondsRemaining:0
}
const SECS_PER_QUESTION=30;
function reducer(state,action){
  switch(action.type){
    case "dataReceived":
      return {
        ...state,
        questions:action.payload,
        status:"ready",
      };
      case "dataFailed":
        return {
          ...state,
          status:"error"
        };
      case "startQuiz":
        return {
          ...state,
          status:"active",
          secondsRemaining: state.questions.length * SECS_PER_QUESTION
          
        }
        case "newAnswer":
          const question=state.questions.at(state.index)
          return{
            ...state,
            answer:action.payload,
            points: action.payload === question.correctOption ? state.points + question.points : state.points
          };
          case "nextQuestion":
            return{
              ...state,
              index:state.index+1,
              answer:null
            }
            case "finish":
              return {
                ...state,
                status:"finished",
                highScore: state.points > state.highScore ? state.points : state.highScore
              }
            case "restart":
              return{
                ...state,
                questions:state.questions,
                // loading,error,ready,active,finished
                status:"ready",
                index:0,
                answer:null,
                points:0
               
                
              }
            case "tick":
              return {
                ...state,
                secondsRemaining:state.secondsRemaining-1,
                status: state.secondsRemaining ===0 ? "finished" : "active"
              }
    default:
      throw new Error("Action Unknown")
  }

}
export default function App(){

  const [{questions,status,index,answer,points,highScore,secondsRemaining},dispatch]=useReducer(reducer,initialState)
  const numQuestions=questions.length
  const totalPoints=questions.reduce((acc , curr)=> acc + curr.points,0)

  function handleStartQuiz(){
    dispatch({type:"startQuiz"})
  }
  useEffect(function(){
    fetch("http://localhost:8000/questions")
    .then(res=>res.json())
    .then(data=>dispatch({type:"dataReceived",payload:data}))
    .catch(error=>dispatch({type:"dataFailed"}))
  },[]);
  return( <div className="app">
    <Header/>
    <Main>
      { status === "loading" && <Loader/>}
      { status === "error" && <ErrorMessage><p>Error Occured while fetching questions from api</p></ErrorMessage>}
      {status ==="ready" && <StartScreen numQuestions={numQuestions} onHandleStartQuiz={handleStartQuiz}/>}
      {status==="active" && <Questions question={questions[index]} answer={answer} dispatch={dispatch} points={points} totalPoints={totalPoints} index={index} numQuestions={numQuestions} secondsRemaining={secondsRemaining}/>}
      {status==="finished" && <FinishScreen points={points} totalPoints={totalPoints} dispatch={dispatch} highScore={highScore}/>}
    </Main>
  </div>)
}