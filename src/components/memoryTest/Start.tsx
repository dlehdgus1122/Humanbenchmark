import React, { useCallback } from "react";
import {Page} from "../NumberMemory.tsx";

type Props = {
    setPage: React.Dispatch<React.SetStateAction<Page>>;
    setResetVariables:  React.Dispatch<React.SetStateAction<boolean>>;
    setResetScore: React.Dispatch<React.SetStateAction<boolean>>;
  };

const Start = ({ setPage, setResetVariables, setResetScore }: Props) => {
    const onClickHandler = useCallback(() => {
        setResetVariables(true);
        setResetScore(true);
        setPage("numberPage");
      }, [setPage]);
    
    return (
    <div className="start">
        <h1 id="title">Number Memory Test</h1>
        <button onClick={() => onClickHandler()} className="btn">Start Game</button>
    </div>
    );
}

export default Start;