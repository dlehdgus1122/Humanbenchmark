import React, { useCallback } from "react";
import { Page } from "../NumberMemory.tsx";

type Props = {
  setPage: React.Dispatch<React.SetStateAction<Page>>;
  setResetVariables: React.Dispatch<React.SetStateAction<boolean>>;
  setResetScore: React.Dispatch<React.SetStateAction<boolean>>;
};

//clicking the start button will run a handler function that
//calls the reset use states and sets them to true to indicate that
//game is starting from a clean slate. It also calls
//setPage useState to pass the name of the next page to render.
const Start = ({ setPage, setResetVariables, setResetScore }: Props) => {
  const onClickHandler = useCallback(() => {
    setResetVariables(true);
    setResetScore(true);
    setPage("numberPage");
  }, [setPage]);

  return (
    <div className="start">
      <h1 id="title">Number Memory Test</h1>
      <button onClick={() => onClickHandler()} className="btn">
        Start Game
      </button>
    </div>
  );
};

export default Start;
