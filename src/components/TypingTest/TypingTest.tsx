import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import "./TypingTest.css";

const testText = () =>
  `Sub-tick updates are the heart of Counter-Strike 2 Previously the server only evaluated the world in discrete time intervals (called ticks). Thanks to Counter-Strike 2’s sub-tick update architecture servers know the exact instant that motion starts a shot is fired or a ‘nade is thrown
As a result regardless of tick rate your moving and shooting will be equally responsive and your grenades will always land the same way`
    .split(" ")
    .sort(() => (Math.random() > 0.5 ? 1 : -1));

function Word(props: { text: any; active: any; correct: any }) {
  const { text, active, correct } = props;

  // const rerender = useRef(0);
  // useEffect(() => {
  //   rerender.current += 1;
  // });

  if (correct === true) {
    return <span className="correct">{text} </span>;
  }
  if (correct === false) {
    return <span className="incorrect">{text} </span>;
  }

  if (active) {
    return <span className="active">{text} </span>;
  }

  return <span>{text} </span>;
}

// Word = memo(Word);

function Timer(props) {
  const { correctWords, startCounting } = props;
  const [timeElapsed, setTimeElapsed] = useState(0);
  useEffect(() => {
    let id;
    if (props.startCounting) {
      id = setInterval(() => {
        setTimeElapsed((oldTime) => oldTime + 1);
      }, 10);
    }

    return () => {
      clearInterval(id);
    };
  }, [startCounting]);

  const minutes = timeElapsed / 60;

  return (
    <ul className="details">
      <li className="counter">
        <p>
          Counter: <b>{(timeElapsed / 100).toFixed(1)} s</b>
        </p>
      </li>
      <li className="wpm">
        <p>
          WPM: <b>{((correctWords / minutes) * 100 || 0).toFixed(0)}</b>
        </p>
      </li>
      <li className="cpm">
        <p>
          CPM: <b>{((correctWords / minutes) * 500 || 0).toFixed(0)}</b>
        </p>
      </li>
    </ul>
  );
}

const onReplay = () => {
  window.location.reload();
};

const Typing = () => {
  const [userInput, setUserInput] = useState("");
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);
  const [correctWordArray, setCorrectWordArray] = useState<string[]>([]);
  const [correct, setCorrect] = useState(false);
  const [startCounting, setStartCounting] = useState(false);
  const text = useRef(testText());

  function processInput(value: any) {
    if (!startCounting) {
      setStartCounting(true);
    }
    if (activeWordIndex === text.current.length) {
      return;
    }
    if (value.endsWith(" ")) {
      if (activeWordIndex === text.current.length - 1) {
        setStartCounting(false);
        setUserInput("You have finished the test.");
        return;
      } else {
        setUserInput("");
      }
      setActiveWordIndex((index) => index + 1);

      setCorrectWordArray((data) => {
        const word = value.trim();
        const newResult = [...data];
        if (word === text.current[activeWordIndex]) {
          newResult[activeWordIndex] = word;
        }

        // newResult[activeWordIndex] = word;
        console.log("word= " + word);
        console.log("newResult= " + newResult);
        // newResult[activeWordIndex] = true;
        return newResult;
      });
      console.log("ActiveWordIndex= " + activeWordIndex);
      console.log("CorrectWordArray= " + correctWordArray);
    } else {
      setUserInput(value);
    }
  }

  return (
    <div className="typing-test">
      <h1 className="title">Typing Test</h1>
      <div className="wrapper">
        <div className="content-box">
          <div className="typing-text">
            <p id="paragraph">
              {text.current.map((word, index) => {
                return (
                  <Word
                    text={word}
                    active={index === activeWordIndex}
                    correct={correctWordArray[index]}
                  />
                );
              })}
            </p>
          </div>
          <div className="content">
            <Timer
              startCounting={startCounting}
              correctWords={correctWordArray.filter(Boolean).length}
            />
            <input
              className="input-field"
              placeholder="Begin Typing..."
              type="text"
              value={userInput}
              onChange={(e) => processInput(e.target.value)}
            />{" "}
            <button
              type="button"
              onClick={onReplay}
              onKeyDown={(ev) => {
                console.log({ ev });
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Typing;
