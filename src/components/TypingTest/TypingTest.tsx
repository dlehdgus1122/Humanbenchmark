import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./TypingTest.css";

//Text for the typing test
const testText = () =>
  `Sub-tick updates are the heart of Counter-Strike 2 Previously the server only evaluated the world in discrete time intervals (called ticks). Thanks to Counter-Strike 2’s sub-tick update architecture servers know the exact instant that motion starts a shot is fired or a ‘nade is thrown
  As a result regardless of tick rate your moving and shooting will be equally responsive and your grenades will always land the same way 
  Your CS Rating is a visible measurement of your Counter-Strike performance, and it will determine where you stand on global and regional leaderboards. 
  To get your CS Rating, play matches in the updated Premier mode`
    .split(" ")
    .sort(() => (Math.random() > 0.5 ? 1 : -1));

function Word(props: { text: any; active: any; correct: any }) {
  const { text, active, correct } = props;
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  if (correct === true) {
    return <span className="correct">{text} </span>;
  }

  if (active) {
    return <span className="active">{text} </span>;
  }

  return <span>{text} </span>;
}

//function calculates and displays time taken along with the users' WPM and CPM
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

const onReplay = async (user, isAuthenticated, getAccessTokenSilently, setPage) => {
  setPage("main");
  
  const score = parseInt(document.querySelector(".wpm b").innerHTML);
  //send score to backend (to be saved) using auth0 access token as bearer auth

  if (isAuthenticated) {
    const token = await getAccessTokenSilently();
    fetch("/api/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        game: "typing_test",
        score: score,
        user: user.sub,
      }),
    });
  }
};

const Typing = () => {
  const [userInput, setUserInput] = useState("");
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);
  const [correctWordArray, setCorrectWordArray] = useState<string[]>([]);
  const [startCounting, setStartCounting] = useState(false);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const text = useRef(testText());

  //checks to see if user input is correct or incorrect
  //adds the input to a correct word array, which will be used to determine the users' WPM and CPM
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
        return newResult;
      });
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
              onClick={() =>
                onReplay(user, isAuthenticated, getAccessTokenSilently, setPage)
              }
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
