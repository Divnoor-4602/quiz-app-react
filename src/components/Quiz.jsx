import React, { useState, useCallback } from "react";
import QuestionTimer from "./QuestionTimer.jsx";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");

  //   as answers are selected the state length increase and the active question changes with it
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      console.log(selectedAnswer);
      setAnswerState("answered");
      setUserAnswers((prevAns) => [...prevAns, selectedAnswer]);

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        console.log(answerState);

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );
  // active question index is a dependecy because as the index increase the function shoulf be re rendered

  // if the timer expired skip answer
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  //   quiz completion check
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length - 1;

  if (quizIsComplete) {
    return (
      <>
        <div id="summary">
          <h2>Quiz Complete</h2>
          <img src={quizCompleteImg} alt="trophy icon" />
        </div>
      </>
    );
  }

  //   shuffling answers
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffle(shuffledAnswers);

  // fisher yates algorithm to shuffle the answers on every reload
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [array[i], array[random]] = [array[random], array[i]];
    }
  }

  return (
    <>
      <div id="quiz">
        <div id="question">
          <QuestionTimer
            timeout={10000}
            onTimeout={handleSkipAnswer}
            key={activeQuestionIndex}
          />
          <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
          <ul id="answers">
            {shuffledAnswers.map((answer) => {
              let cssClass = "";
              {
                /* answer selected by the user */
              }
              const selectedAnswer =
                userAnswers[userAnswers.length - 1] === answer;

              if (answerState === "answered" && selectedAnswer) {
                cssClass = "selected";
              }

              if (
                (answerState === "correct" || answerState === "wrong") &&
                selectedAnswer
              ) {
                cssClass = answerState;
              }
              return (
                <li className="answer" key={answer}>
                  <button
                    onClick={() => handleSelectAnswer(answer)}
                    className={cssClass}
                  >
                    {answer}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
