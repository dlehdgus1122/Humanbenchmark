import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Visual.module.scss";
import "./Visual.module.scss";
import gsap from "gsap";

function Visual() {
   // 'start' and 'roundRunning' are booleans for the game status
  const [start, setStart] = useState<boolean>(false);
  const [cardEls, setCardEls] = useState<any>([]);
  const cards = useMemo(
    () => Array.from(new Array(cardEls.length), (x, i) => i + 1),
    [cardEls]
  );
   // 'round', 'life', 'displayRound', 'difficulty', 'answerCount', 'clickCount', 'countdown' are numbers for the game control
  const [round, setRound] = useState<number>(1);
  const [life, setLife] = useState<number>(1);
  const [displayRound, setDisplayRound] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<number>(3);
  const [roundRunning, setRoundRunning] = useState<boolean>(false);
  // 'answer', 'clickedCards', 'animations' are arrays for game data
  const [answer, setAnswer] = useState<Array<string | number>>([""]);
  const [answerCount, setAnswerCount] = useState<number>(1);
  const [clickCount, setClickCount] = useState<number>(0);
  const [clickedCards, setClickedCards] = useState<Array<string>>([]);
  // 'isFail', 'isSuccess', 'gameClear' are booleans for game result
  const [isFail, setIsFail] = useState<boolean>(false);
  const [isSuccess, setIsSuccesss] = useState<boolean>(false);
  const [gameClear, setGameClear] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(4);
  // 'endCountdownClear', 'difficultyUpDelayClear' are for clearing timeouts
  const [endCountdownClear, setEndCountdownClear] = useState<any>(() => {});
  const [difficultyUpDelayClear, setDifficultyUpDelayClear] = useState<any>(
    () => {}
  );
  const [animations, setAnimations] = useState<Array<any>>([]);
  const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();

    // Function 'clear' for clearing the game
  const clear = useCallback(() => {
    setGameClear(true);
    setStart(false);
    setRoundRunning(false);
  }, []);

    // Function 'restart' for restarting the game
  const restart = async () => {
    const oldround = round ? round-1 : 0;
    cardEls.forEach((el: any) => {
      el.style.backgroundColor = "whitesmoke";
      el.style.boxShadow = "none";
      el.style.borderColor = "whitesmoke";
    });
    setGameClear(false);
    setDisplayRound(0);
    setClickedCards([]);
    setClickCount(0);
    setRound(1);
    setLife(1);
    setAnswerCount(1);
    setDifficulty(3);
    setIsFail(false);
    setStart(false);
    setCountdown(4);

    // Save the score to the database
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
              game: "sequence_memory",
              score: oldround,
              user: user.sub,
              }),
          }
      )
  }
  };

  // Function 'nextRound' for moving to the next round
  const nextRound = useCallback(() => {
    clearTimeout(endCountdownClear);
    setClickCount(0);
    setClickedCards([]);
    setCountdown(4);
    setRoundRunning(false);
    setLife(1);
    setRound((prev) => prev + 1);
    setAnswerCount((prev) => prev + 1);
  }, [endCountdownClear]);

    // Function 'gameover' for handling game over
  const gameover = useCallback(() => {
    cardEls.forEach((el: any) => {
      if (answer.indexOf(el.id) !== -1 && clickedCards.indexOf(el.id) === -1) {
        el.style.backgroundColor = "whitesmoke";
        el.style.boxShadow = "0px 0px 15px orange, 0px 0px 30px whitesmoke";
        el.style.borderColor = "orange";
      } else if (answer.indexOf(el.id) !== -1) {
        el.style.backgroundColor = "whitesmoke";
        el.style.boxShadow = "0px 0px 15px #48cae4, 0px 0px 30px whitesmoke";
        el.style.borderColor = "#48cae4";
      } else if (
        answer.indexOf(el.id) === -1 &&
        clickedCards.indexOf(el.id) !== -1
      ) {
        el.style.backgroundColor = "whitesmoke";
        el.style.boxShadow = "0px 0px 15px #bf1f1f, 0px 0px 30px whitesmoke";
        el.style.borderColor = "#bf1f1f";
      }
    });
    setIsFail(true);
    setRoundRunning(false);
    setClickCount(0);
  }, [answer, cardEls, clickedCards]);

    // Function 'onCardClick' for handling card click event
  const onCardClick = useCallback(
    (e: any) => {
      if (!roundRunning || clickedCards.indexOf(e.target.id) !== -1) {
        return;
      }

      setClickedCards((prev) => [...prev, e.target.id]);

      
      if (answer.indexOf(e.target.id) === -1) {
        e.target.style.backgroundColor = "whitesmoke";
        e.target.style.boxShadow =
          "0px 0px 15px #bf1f1f, 0px 0px 30px whitesmoke";
        e.target.style.borderColor = "#bf1f1f";

        if (life !== 0) {
          setLife(0);
        } else {
          gameover();
          clearTimeout(endCountdownClear);
        }

        return;
      } else {
        e.target.style.backgroundColor = "whitesmoke";
        e.target.style.boxShadow =
          "0px 0px 15px #48cae4, 0px 0px 30px whitesmoke";
        e.target.style.borderColor = "#48cae4";
      }

      if (clickCount + 1 === answer.length) {
        setIsSuccesss(true);

        if (round === 4 || round === 12 || round === 24) {
          const difficultyUpDelay = setTimeout(() => {
            nextRound();
          }, 1000);

          setDifficultyUpDelayClear(difficultyUpDelay);

          return;
        }

        if (round === 49) {
          clear();

          return;
        }

        nextRound();
      } else {
        setClickCount((prev) => prev + 1);
      }
    },
    [answer, clear, clickCount, clickedCards, endCountdownClear, gameover, life, nextRound, round, roundRunning]
  );

    // Function 'endCountdown' for ending the countdown
  const endCountdown = useCallback((time: number) => {
    const endTimer = setTimeout(() => {
      gameover();
    }, time);

    setEndCountdownClear(endTimer);
  }, []);

    // Function 'changeDifficulty' for changing the difficulty level
  const changeDifficulty = useCallback(
    (num: number) => {
      cardEls.forEach((el: any) => {
        el.style.backgroundColor = "whitesmoke";
        el.style.boxShadow = "none";
        el.style.borderColor = "whitesmoke";
      });

      setAnswerCount(1);
      setDifficulty(num);
    },
    [cardEls]
  );
  // Function 'roundStart' for starting a round
  const roundStart = useCallback(() => {
    if (!start) {
      return;
    }

    let delay = 0;

    if (round === 5) {
      delay = 1000;
      setCountdown(5);
      changeDifficulty(4);
      setDisplayRound(5);
    } else if (round === 13) {
      delay = 1000;
      setCountdown(5);
      changeDifficulty(5);
      setDisplayRound(13);
    } else if (round === 25) {
      delay = 1000;
      setCountdown(5);
      changeDifficulty(6);
      setDisplayRound(25);
    }

    const prepareTimer = setTimeout(() => {
      setIsSuccesss(false);

      if (round !== 5 && round !== 13 && round !== 21) {
        setDisplayRound((prev) => prev + 1);
      }

      cardEls.forEach((el: any) => {
        el.style.backgroundColor = "whitesmoke";
        el.style.boxShadow = "none";
        el.style.borderColor = "whitesmoke";
      });

      const newAnswer = [...cards].map((card) => card.toString());
      for (
        let i = difficulty ** 2 - answerCount, j = difficulty ** 2 - 1;
        i !== 0;
        i--, j--
      ) {
        const pick = Math.round(Math.random() * j);
        newAnswer.splice(pick, 1);
      }

      setAnswer(newAnswer);

      cardEls.forEach((el: any) => {
        if (newAnswer.indexOf(el.id) !== -1) {
          el.style.backgroundColor = "whitesmoke";
          el.style.boxShadow = "0px 0px 15px #48cae4, 0px 0px 30px whitesmoke";
          el.style.borderColor = "#48cae4";
        } else {
          el.style.backgroundColor = "black";
          el.style.borderColor = "black";
        }
      });
    }, 1000 + delay);

    const countdown = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const colorTimer = setTimeout(() => {
      cardEls.forEach((el: any) => {
        el.style.backgroundColor = "whitesmoke";
        el.style.boxShadow = "none";
        el.style.borderColor = "whitesmoke";
      });
    }, 3000 + delay);

    const startTimer = setTimeout(() => {
      setRoundRunning(true);
      setCountdown(0);
      clearTimeout(countdown);
    }, 4000 + delay);

    endCountdown(34000 + delay);

    delay = 0;

    return { colorTimer, startTimer, countdown, delayTimer: prepareTimer };
  }, [
    answerCount,
    cardEls,
    cards,
    changeDifficulty,
    difficulty,
    endCountdown,
    round,
    start,
  ]);

    // Effect hook for setting card elements
  useEffect(() => {
    setCardEls(document.querySelectorAll(`.${styles.card}`));
  }, [difficulty]);

  
  // Effect hook for clearing timeouts
  useEffect(() => {
    return () => {
      clearTimeout(endCountdownClear);
      clearTimeout(difficultyUpDelayClear);
    };
  });

    // Effect hook for handling round start
  useEffect(() => {
    if (!start) {
      return;
    }

    const { colorTimer, startTimer, countdown, delayTimer }: any = roundStart();

    return () => {
      clearTimeout(colorTimer);
      clearTimeout(startTimer);
      clearTimeout(countdown);
      clearTimeout(delayTimer);
    };
  }, [roundStart, start]);

    // Function 'rowsGenerator' for generating rows
  const rowsGenerator = useCallback(() => {
    const rowsReturn: Array<any> = [];

    const cardsGenerator = (i: number) => {
      const cardsReturn: Array<any> = [];

      for (let j = 1; j <= difficulty; j++) {
        const id = -difficulty + j + difficulty * i;
        cardsReturn.push(
          <div
            id={`${id}`}
            key={`${id}`}
            className={styles.card}
            onClick={onCardClick}
          ></div>
        );
      }

      return cardsReturn;
    };

    for (let i = 1; i <= difficulty; i++) {
      rowsReturn.push(
        <div key={i} className={styles.row}>
          {}
          {cardsGenerator(i)}
        </div>
      );
    }

    return rowsReturn;
  }, [difficulty, onCardClick]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.round}>Round {displayRound}</div>
        <div className={styles.level}>
          {displayRound >= 25
            ? "Expert"
            : displayRound >= 13
            ? "Hard"
            : displayRound >= 5
            ? "Normal"
            : "Easy"}
        </div>
      </div>

      <div className={styles.content}>
        {(!start || isFail || gameClear) && (
          <div className={styles.start}>
            {(isFail || gameClear) && (
              <div className={styles["result"]}>
                {gameClear && (
                  <div className={styles["clear"]}>Congratulation!</div>
                )}
                <div className={styles["score__text"]}>Score</div>
                <div className={styles["score__round"]}>{round}</div>
              </div>
            )}
            <span
              className={styles["start__text"]}
              style={{ fontSize: gameClear || isFail ? "5vmin" : "10vmin" }}
              onClick={() => {
                animations.forEach((el) => {
                  el.kill();
                });
                if (isFail || gameClear) {
                  restart();
                } else {
                  setStart(true);
                }
              }}
            >
              {isFail || gameClear ? "Restart" : "Start"}
            </span>
          </div>
        )}
        <div className={styles.status}>
          {isFail
            ? ""
            : isSuccess
            ? round !== 5 && round !== 13 && round !== 25
              ? "Success"
              : "Level up"
            : start &&
              (countdown === 0 ? "Click!" : countdown !== 4 && countdown)}
        </div>
        <div className={styles.board}>{rowsGenerator()}</div>
      </div>
    </div>
  );
}

export default Visual;
