import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Question from "./question";
import './question.css';
import confetti from "canvas-confetti";

function Quiz() {
  const location = useLocation();
  const { questions } = location.state || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lock, setlock] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [result, setResult] = useState(false);

  if (!questions || questions.length === 0) {
    return <div className="container text-center">No questions available</div>;
  }

  const handleNext = () => {
    if (!lock) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Auto-hide alert
    } else if (currentIndex < questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setlock(false);
    } else if (currentIndex === questions.length - 1) {
      setResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setlock(false);
    }
  };

  // Trigger confetti if score matches number of questions, only when result is true
  useEffect(() => {
    if (result && score === questions.length) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }, // Adjust origin for a better effect
      });
    }
  }, [result, score, questions.length]); // Dependency on result, score, and questions.length

  if (result) {
    return (
      <div className="section container m-5">
        <div className="quiz-header text-center">
          <div className="container mt-4">
            <div className="card text-center">
              <div className="card-header bold">Well Done</div>
              <div className="card-body">
                <h1>Your score is {score} / {questions.length}</h1>
                {score === questions.length && (
                  <h2 className="text-success">Perfect Score! 🎉</h2>
                )}
                <a href="/boards" className="btn btn-primary">
                  Go Back
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section container m-5">
      <div className="quiz-header text-center">
        <p>
          Question {currentIndex + 1} of {questions.length}
        </p>
      </div>

      {showAlert && (
        <div className="alert alert-warning text-center" role="alert">
          You need to answer the question first :)
        </div>
      )}

      <Question
        question={questions[currentIndex]}
        score={score}
        setScore={setScore}
        lock={lock}
        setlock={setlock}
      />

      <div className="quiz-navigation text-center mt-4">
        <button
          className="btn btn-secondary me-3"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={handleNext}
        >
          {currentIndex === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
