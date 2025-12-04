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

/*
here i want to undersant the differnce betwen how i am callinng the onChnage like here it sis like <button onClick={handleNextClick}>Next</button> not <button onClick={(e) => handleNextClick()}>Next</button> and here it is onClick={() => handleOptionSelect(option)} not onClick={handleOptionSelect(option)} What is the differenc ebetween these logic of writig in react

This difference is all about when a function is executed vs passing a function reference to onClick

When we write 
<button onClick={handleNextClick}>Next</button>
we are passing function refernce  -- React will call handleNextClick only when the click happens.
If i would have used <button onClick={handleNextClick()}>Next</button>  -- then Then handleNextClick() will run immediately during render, NOT on click.

Why is this correct?

Because React expects a function, not the result of a function.

✔ onClick={handleNextClick} → You're giving React a function.

❌ onClick={handleNextClick()} → You're giving React the returned value from handleNextClick().

------------------------------------------

Case 2:
✔ onClick={() => handleOptionSelect(option)}
❌ NOT: onClick={handleOptionSelect(option)}

This is different.

Why do we use an arrow function here?

Because we need to pass an argument (option) to the handler

onClick={() => handleOptionSelect(option)}  ---> This means Create a function. When clicked, execute handleOptionSelect(option) with the right option. 


If we write this onClick={handleOptionSelect(option)}  --What happens?

handleOptionSelect(option) runs immediately — during render!

The result (probably undefined) gets assigned to onClick

Your click handler becomes undefined — nothing happens when clicking.




Why do we need the arrow function?

If your function needs extra data, e.g., the selected option:

handleOptionSelect(option)


You need to wrap the call inside another function:

onClick={() => handleOptionSelect(option)}


Because onClick must be a function, not the result of a function.




Final Takeaway

Use function reference when no arguments → onClick={fn}

Use arrow function when passing arguments → onClick={() => fn(arg)}

Never write onClick={fn()} unless you want it to run immediately.
*/