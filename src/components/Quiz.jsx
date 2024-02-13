import React, { useState, useCallback } from "react";
import QuestionTimer from "./QuestionTimer.jsx";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevAns) => [...prevAns, selectedAnswer]);
  },
  []);

  // if the timer expired skip answer
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  //   as answers are selected the state length increase and the active question changes with it
  const activeQuestionIndex = userAnswers.length;

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
          <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer} />
          <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
          <ul id="answers">
            {shuffledAnswers.map((answer) => (
              <li className="answer" key={Math.random()}>
                <button onClick={() => handleSelectAnswer(answer)}>
                  {answer}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
