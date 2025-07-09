export default function StartScreen({numQuestions,onHandleStartQuiz}){
    return <div className="start">
        <h2>Welcome to the React Quiz</h2>
        <h3>{`${numQuestions} questions to test your React mastery`}</h3>
        <button className="btn" onClick={onHandleStartQuiz}>Start Quiz</button>
    </div>
}