import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Question from "./question";
import './question.css';
import confetti from "canvas-confetti";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import { useSpring, animated } from 'react-spring';


function Quiz() {
  const location = useLocation();
  const { questions, board } = location.state || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lock, setlock] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [result, setResult] = useState(false);


  useEffect(() => {


    if (result) {
      saveResult();
    }


    if (result && score === questions.length) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });


    }
  }, [result, score, questions.length]);


  const saveResult = async () => {
    try {
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        Swal.fire({
          icon: "error",
          title: "Please Log in",
          text: "Please log in to continue.",
        });

        return;
      }

      const response = await axiosInstance.post(`/board/addToHistory`, {
        user_id: userId,
        board_id: board.id,
        score: score
      }
      );

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message || "Failed to add history board.",
      });
    }
  };




  if (!questions || questions.length === 0) {
    return <div className="container text-center">No questions available</div>;
  }

  const handleNext = () => {
    if (!lock) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
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

  if (result) {
    return (
      <>

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
      </>
    );
  }

  return (
    <>


      <div className="section container m-5">


        <div className="quiz-header text-center">
          <p className="bold" style={{ fontFamily: "Comic Sans MS, cursive, sans-serif", fontSize: '2.3em' }}>
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>

        {showAlert && (
          <div className="alert alert-warning text-center" role="alert">
            You need to answer the question first
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
    </>
  );
}

export default Quiz;
