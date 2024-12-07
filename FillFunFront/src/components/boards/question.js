import './question.css';
import React, { useState, useEffect, useRef } from 'react';

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

        const listItems = document.querySelectorAll('.list-group-item');
        listItems.forEach((item) => {
            item.classList.remove('correct', 'wrong');
        });
    }, [question]);

    const checkAnswer = (e, answer) => {
        if (lock === false) {
            if (answer === question.correct_answer) {
                e.target.classList.add('correct');
                setScore((prevScore) => prevScore + 1);
                setlock(true);
            } else {
                e.target.classList.add('wrong');
                setlock(true);
                optionArr[answers.indexOf(question.correct_answer)].current.classList.add('correct');
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="card text-center">
                <div className="card-header bold">{question.question}</div>
                <div className="card-body">
                    <ul className="list-group">
                        {answers.map((answer, index) => (
                            <li
                                key={index}
                                className="list-group-item"
                                onClick={(e) => checkAnswer(e, answer)}
                                ref={optionArr[index]}
                            >
                                {answer}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Question;
