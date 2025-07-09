export default function Progress({points,totalPoints,index,numQuestions,answer}){
    return <header className="progress"><progress max={numQuestions} value={index + Number(answer!==null)}></progress>
            <p>Question <strong>{index+1}/{numQuestions}</strong></p>
            <p>Points <strong>{points}/{totalPoints}</strong></p></header>
        

    

}