import React from "react"
import {useState} from "react";
import './Question.css'

const Question = () => {
    const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      answer: "Pacific",
    },
    {
      question: "Who wrote 'To be, or not to be'?",
      options: ["Shakespeare", "Hemingway", "Tolkien", "Twain"],
      answer: "Shakespeare",
    },
  ];

  const [activeQuesIndex, setActiveQuesIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(Array(questions.length).fill(""));
  const [currentScore, setCurrentScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const handleOptionSelect = (selectedOption) => {
    const newSelectedOptions = [...selectedOption];
    newSelectedOptions[activeQuesIndex] = selectedOption;
    setSelectedOption(newSelectedOptions);
  };

  const handlePrevClick = () => {
    setActiveQuesIndex(activeQuesIndex-1);
  }


  const handleNextClick = () =>{
    if(selectedOption[activeQuesIndex] == questions[activeQuesIndex].answer){
        setCurrentScore((prev) => prev+1);
    }
    setActiveQuesIndex(activeQuesIndex+1);
  };

  const handleCompleteClick = () => {
    if(selectedOption[activeQuesIndex] === questions[activeQuesIndex].answer){
        setCurrentScore((prev) => prev+1);
    }
    setGameComplete(true);
  };

  const handleGameRestart = () => {
    setGameComplete(false);
    setActiveQuesIndex(0);
    setCurrentScore(0);
    setSelectedOption(Array(questions.length).fill(""));
  };


  return (
    <div className="game-holder">
        {gameComplete ? (
            <div>
                <span className="score">Your Score: {currentScore}</span>
                <div className="result-holder">
                    {questions.map((question,index) => (
                    <div key={index} className="result-question">
                        <div><strong>{question.question}</strong></div>
                        <div>Your Answer : {selectedOption[index]}</div>
                        <div>Correct Answer : {question.answer}</div>
                    </div>
                ))};
                </div>
            </div>
        ) : (
            <>
            <div className="question-holder">
                <strong>Question</strong>
                <br/>
                {questions[activeQuesIndex].question}
            </div>
            <div className="option-holder">
                {questions[activeQuesIndex].options.map((option) => (
                    <div
                    key={option}
                    className="quiz-options"
                    style={{
                        backgroundColor : selectedOption[activeQuesIndex] === option ? "grey" :"",
                    }}
                    onClick={() => handleOptionSelect(option)}
                    >
                        {option}
                    </div>
                ))}
            </div>
            </>
        )}
        <div className="button-holder">
            {!gameComplete && (
                <button onClick={handlePrevClick} disabled={activeQuesIndex === 0}>Prev
                </button>
            )}
            {activeQuesIndex !== questions.length -1 && !gameComplete && (
                <button onClick={handleNextClick}>Next</button>
            )}
            {activeQuesIndex === questions.length -1 && !gameComplete && (
                <button onClick={handleCompleteClick}>Complete Quiz</button>
            )}
            {gameComplete && (
                <button onClick={handleGameRestart}>Restart</button>
            )}
        </div>
    </div>
  );

};


export default Question;

