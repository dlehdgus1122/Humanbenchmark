import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./AimTrainer.css";
import useCountdown from "./AimTrainerCountdown";
const AimTrainer = () => {
  const [nameStart, setNameStart] = useState("aim-trainer");
  const [nameTime, setNameTime] = useState("aim-trainer");
  const [nameDifficulty, setNameDifficulty] = useState("aim-trainer");
  const [nameTimeEl, setNameTimeEl] = useState("time");
  const [nameBoard, setNameBoard] = useState("aim-trainer");
  const [timez, setTimez] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  // const { secondsLeft, start } = useCountdown();
  const [unlimited, setUnlimited] = useState("false");
  const [secondsLeft, setSecondsLeft] = useState(0);
  // const [playing, setPlaying] = useState("false");
  const [circle, setCircle] = useState("circle");
  // const [difficulty, setDifficulty] = useState("0");
  const [left, setLeft] = useState(null);
  const [top, setTop] = useState(null);

  const [hitsOver, setHitsOver] = useState(0);
  const [accuracyOver, setAccuracyOver] = useState(0);

  const [hitz, setHits] = useState(0);
  const [missed, setMissed] = useState(0);
  const [diff, setDiff] = useState("0");
  const [accuracy, setAccuracy] = useState(0);
  const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();

  let difficulty = "0";
  let time = 0;
  let interval;
  // let circle = "circle";
  let playing = "false";

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timeout = setTimeout(() => {
      setSecondsLeft(secondsLeft - 0.01);

      if (missed > 0 || hitz > 0) {
        setAccuracy((hitz / (hitz + missed)) * 100);
      } else {
        setAccuracy(0);
      }

      if (secondsLeft.toFixed(1) === "0.0") {
        finishGame();
        console.log("GAME FINISHED");
      }
    }, 10);

    return () => clearTimeout(timeout);
  }, [secondsLeft]);

  const startGame = () => {
    setNameStart("aim-trainer up");
  };

  function start(seconds: number) {
    setSecondsLeft(seconds);
  }

  const finishGame = () => {
    playing = "false";
    setTimez(0);
    setCircle("");
    start(0);
    setNameBoard("aim-trainer up");
    setAccuracy(0);
    setAccuracyOver(accuracy);
    setHitsOver(hitz);
  };

  async function restartGame() {
    const savehitz = hitz;

    finishGame();
    setNameStart("aim-trainer");
    setNameTime("aim-trainer");
    setNameDifficulty("aim-trainer");
    setNameBoard("aim-trainer");
    setTimez(0);
    setDiff("0");
    setHits(0);
    setMissed(0);
    setAccuracy(0);
    playing = "false";
    setUnlimited("false");

    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      await fetch(
        "/api/scores",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            game: "aim_trainer",
            score: savehitz,
            user: user.sub,
          }),
        }
      );
    }
  }

  function playGame() {
    playing = "true";
    setDiff(difficulty);
    if (secondsLeft === 1) {
    }
    if (difficulty === "1") {
      setCircle("circlediff1");
    } else if (difficulty === "2") {
      setCircle("circlediff2");
    } else {
      setCircle("circle");
    }

    start(timez);
  }

  function selectTime(e) {
    console.log("upp");
    if (e.target.classList.contains("time-btn")) {
      time = parseInt(e.target.getAttribute("data-time"));
      setTimez(time);
      setUnlimited(e.target.getAttribute("data-unlimited"));
      setNameTime("aim-trainer up");
    }
  }

  function selectDifficulty(e) {
    if (e.target.classList.contains("difficulty-btn")) {
      difficulty = e.target.getAttribute("data-difficulty");
      setNameDifficulty("aim-trainer up");
      playGame();
    }
  }

  function countHits(event) {
    event.stopPropagation();
    setHits(hitz + 1);
    console.log("hits= " + hitz);
  }

  const getPosition = () => {
    if (diff === "1") {
      console.log("ITS ONEEEE");
      setCircle("circlediff1");
      console.log("Circle diff1= " + circle);
    } else if (diff === "2") {
      setCircle("circlediff2");
      console.log("diff2");
    } else {
      console.log("default= " + circle);
      setCircle("circle");
    }
    let leftPosition = getRandomNumber(5, 35);
    let topPosition = getRandomNumber(10, 45);
    setLeft(leftPosition);
    setTop(topPosition);
  };

  function countMiss() {
    setMissed(missed + 1);
    console.log("MISSED= " + missed);
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <>
      <div className="aim-body">
        <div className={nameStart}>
          <h1>Aim Trainer</h1>
          <button className="btn" id="start" onClick={startGame}>
            Start Game
          </button>
        </div>
        <div className={nameTime}>
          <h1>Choose a Time</h1>
          <ul className="list" id="time-list">
            <li>
              <button
                className="btn time-btn"
                data-time="10"
                onClick={selectTime}
              >
                10 sec
              </button>
            </li>
            <li>
              <button
                className="btn time-btn"
                data-time="30"
                onClick={selectTime}
              >
                30 sec
              </button>
            </li>
            <li>
              <button
                className="btn time-btn"
                data-time="60"
                onClick={selectTime}
              >
                1 min
              </button>
            </li>
            <li>
              <button
                className="btn time-btn"
                data-time="120"
                onClick={selectTime}
              >
                2 min
              </button>
            </li>
          </ul>
        </div>
        <div className={nameDifficulty}>
          <h1>Choose a Difficulty</h1>
          <ul className="list" id="difficulty-list">
            <li>
              <button
                className="btn difficulty-btn"
                data-difficulty="0"
                onClick={selectDifficulty}
              >
                Easy
              </button>
            </li>
            <li>
              <button
                className="btn difficulty-btn"
                data-difficulty="1"
                onClick={selectDifficulty}
              >
                Medium
              </button>
            </li>
            <li>
              <button
                className="btn difficulty-btn"
                data-difficulty="2"
                onClick={selectDifficulty}
              >
                Hard
              </button>
            </li>
          </ul>
        </div>

        <div className={nameBoard}>
          <div className="stats">
            <div className="info">
              <p className={nameTimeEl}>
                Time:{" "}
                <span id="time">
                  {secondsLeft > 0 && `${secondsLeft.toFixed(1)} s`}
                </span>
              </p>
              <p>
                Hits: <span id="hits">{hitz}</span>
              </p>
              <p>
                Accuracy: <span id="accuracy">{`${accuracy.toFixed(2)}%`}</span>
              </p>
            </div>
          </div>
          <div
            className={"aim-board"}
            id="aim-board"
            onClick={() => {
              countMiss();
            }}
          >
            <div
              className={circle}
              style={{
                position: "relative",
                left: `${left}%`,
                top: `${top}%`,
              }}
              onClick={(event) => {
                getPosition();
                countHits(event);
              }}
            ></div>
          </div>
          <div className="options">
            <button className="btn restart" onClick={restartGame}>
              Restart
            </button>
            {/* <button className="btn" id="fullscreen">
              Full Screen
            </button>
            <button className="btn" id="minimise">
              Minimise
            </button> */}
          </div>
        </div>

        <div className="aim-trainer">
          <h1>Game Over</h1>
          <div className="results">
            <p>
              Hits: <span id="hits-over">{hitsOver}</span>
            </p>
            <p>
              Accuracy:{" "}
              <span id="accuracy-over">{accuracyOver.toFixed(2)}%</span>
            </p>
          </div>
          <button className="btn restart" onClick={restartGame}>
            Restart
          </button>
        </div>
      </div>
    </>
  );
};

export default AimTrainer;
