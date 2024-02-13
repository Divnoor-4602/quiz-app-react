import React, { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef();

  // fisher yates algorithm to shuffle the answers on every reload
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [array[i], array[random]] = [array[random], array[i]];
    }
  }

  //   shuffling answers
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffle(shuffledAnswers);
  }

  return (
    <>
      <ul id="answers">
        {shuffledAnswers.current.map((answer) => {
          let cssClass = "";
          {
            /* answer selected by the user */
          }
          const isSelected = selectedAnswer === answer;

          if (answerState === "answered" && isSelected) {
            cssClass = "selected";
          }

          if (
            (answerState === "correct" || answerState === "wrong") &&
            isSelected
          ) {
            cssClass = answerState;
          }
          return (
            <li className="answer" key={answer}>
              <button onClick={() => onSelect(answer)} className={cssClass}>
                {answer}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
