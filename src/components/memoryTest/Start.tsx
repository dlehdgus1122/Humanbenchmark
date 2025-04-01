import React, { useCallback } from "react";
import {Page} from "../NumberMemory.tsx";

type Props = {
    setPage: React.Dispatch<React.SetStateAction<Page>>;
  };

const Start = ({ setPage }: Props) => {
    const onClickHandler = useCallback(() => {
        setPage("numberPage");
      }, [setPage]);
    
    return (
    <div className="start">
        <h1 id="title">Number Memory Test</h1>
        <button onClick={() => onClickHandler()} id="btnStart">Start Game</button>
    </div>
    );
}

export default Start;