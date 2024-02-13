import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  //   setTimeout(onTimeout, timeout);

  useEffect(() => {
    console.log("setting timeout");
    const timer = setTimeout(onTimeout, timeout);

    // cleanup so there is only one interval is running up a time
    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    console.log("setting interval");
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    // cleaning up so there is only one interval is running up at a a point in time
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <progress id="question-time" max={timeout} value={remainingTime} />
    </>
  );
}
