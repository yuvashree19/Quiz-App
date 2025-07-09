export default function FinishScreen({points,totalPoints,dispatch,highScore}){
    const percentage = (points / totalPoints) * 100;
    return <div>
    <p  className="result">You Scored <strong>{points}</strong> out of {totalPoints} ({Math.ceil(percentage)}%)</p> 
    <p className="highscore"> High Score : {highScore}</p>
    <div className="start">
            <button className="btn btn-ui" onClick={()=>dispatch({type:"restart"})}> Restart Quiz </button>

    </div>
    </div>
}