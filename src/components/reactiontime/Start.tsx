import React, { useCallback, useEffect, useState } from "react";
import { Page } from "../types";
import { useKeydownEffect } from "./useKeydownEffect";

// Define the type for the component's props.
type Props = {
  setPage: React.Dispatch<React.SetStateAction<Page>>;
  setRootHistory: React.Dispatch<React.SetStateAction<number[]>>;
};

// Define the Start component.
function Start({ setPage, setRootHistory }: Props) {
  // Define the state variables.
  const [isFirst, setIsFirst] = useState(true);
  const [state, setState] = useState(0);
  const [isClick, setIsClick] = useState(true);
  const [history, setHistory] = useState<number[]>([]);
  const [t0, setT0] = useState(0);
  const [isTooFast, setIsTooFast] = useState(false);

  // Define the process function. This function controls the test process.
  const process = useCallback(() => {
    setIsClick(false);

    if (isFirst) {
      setIsFirst(false);
      setIsTooFast(false);
      return;
    }

    if (!isClick) {
      setIsTooFast(true);
      setPage("gameover"); // Move to the gameover page if the click is too fast.
      return;
    }

    setIsTooFast(false);

    if (state + 1 >= 5) {
      setRootHistory(history);
      setPage("result");
      return;
    }

    // Add the click time to the history and increment the state.
    setHistory((prev) => {
      const newState = [...prev];
      newState.push(Date.now() - t0);
      return newState;
    });
    setState((prev) => prev + 1);
  }, [history, isClick, isFirst, setPage, setRootHistory, state, t0]);

  // Call the process function when a key is pressed.
  useKeydownEffect(() => {
    process();
  });

  // Define a function that generates the class name.
  const getClassName = useCallback(() => {
    const baseClassName = "start";

    if (isFirst) {
      return baseClassName;
    }

    if (isClick) {
      return `${baseClassName} go`;
    }

    return `${baseClassName} wait`;
  }, [isClick, isFirst]);

  // Define a function that renders the text.
  const renderText = useCallback(() => {
    const genText = () => {
      // Set the default text.
      let h1Text = "Click";
      let pText = "Please Click";

      if (isFirst) {
        h1Text = "Start";
        return { h1Text, pText };
      }

      if (isTooFast) {
        h1Text = "Too Fast";
        pText = "Wait for Green";
        return { h1Text, pText };
      }

      if (!isClick) {
        h1Text = "Ready";
        pText = "Click When Green";
        return { h1Text, pText };
      }

      return { h1Text, pText };
    };

    const { h1Text, pText } = genText();

    return (
      <>
        <h1>{h1Text}</h1>
        <p>{pText}</p>
      </>
    );
  }, [isClick, isFirst, isTooFast]);

  // Set the start time when the click is possible, and change to the click-possible state after a certain time.
  useEffect(() => {
    const sto = setTimeout(() => {
      setIsClick(true);
      setIsTooFast(false);
    }, 1000 + Math.random() * 4000);

    if (isClick) {
      setT0(Date.now());
    }

    return () => {
      clearTimeout(sto);
    };
  }, [isClick, state]);

  // Render the component.
  return (
    <>
      <div
        className={getClassName()}
        style={{
          backgroundColor: isClick ? "lime" : "",
          width: "100%",
          height: "100vh",
        }}
        aria-hidden
        onMouseDown={process}
      >
        <div
          style={{
            position: "relative",
            top: "400px",
          }}
        >
          <div className="label">{state}/5</div>
          <progress id="progress" max="5" value={state} />
          {renderText()}
          <div className="history">
            <div
              className="list"
              style={{ display: "flex", flexDirection: "column" }}
            >
              {history.map((value, idx) => {
                const key = value + idx;
                return (
                  <div className="item" key={key}>
                    {idx + 1} Attempts: {value}ms
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Start;
