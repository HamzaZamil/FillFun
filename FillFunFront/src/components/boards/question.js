import "./question.css";
import React, { useState, useEffect, useRef } from "react";

function Question({ question, setScore, lock, setlock }) {
  const [answers, setAnswers] = useState([]);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  let optionArr = [Option1, Option2, Option3, Option4];

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  useEffect(() => {
    const shuffledAnswers = shuffle([
      question.correct_answer,
      ...question.incorrect_answers,
    ]);
    setAnswers(shuffledAnswers);

    const listItems = document.querySelectorAll(".funky-option");
    listItems.forEach((item) => {
      item.classList.remove(
        "correct",
        "wrong",
        "animate-correct",
        "animate-wrong"
      );
    });

    setlock(false);
  }, [question, setlock]);

  const checkAnswer = (e, answer) => {
    if (lock === false) {
      if (answer === question.correct_answer) {
        e.target.classList.add("correct", "animate-correct");
        setScore((prevScore) => prevScore + 1);
        setlock(true);
      } else {
        e.target.classList.add("wrong", "animate-wrong");
        setlock(true);
        optionArr[
          answers.indexOf(question.correct_answer)
        ].current.classList.add("correct", "animate-correct");
      }
    }
  };

  return (
    <>
      <div className="funky-container">
        <div className="funky-card">
          <div className="funky-question">{question.question}</div>
          <div className="funky-options">
            {answers.map((answer, index) => (
              <div
                key={index}
                className="funky-option"
                onClick={(e) => checkAnswer(e, answer)}
                ref={optionArr[index]}
              >
                {answer}
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
}

export default Question;
