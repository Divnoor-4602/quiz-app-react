import React, { useState, useCallback } from "react";

import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

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

  return (
    <>
      <div id="quiz">
        <Question
          questionText={QUESTIONS[activeQuestionIndex].text}
          answers={[...QUESTIONS[activeQuestionIndex].answers]}
          onSelectAnswer={handleSelectAnswer}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          answerState={answerState}
          onSkipAnswer={handleSkipAnswer}
          key={activeQuestionIndex}
        />
      </div>
    </>
  );
}
