import React, { useCallback } from "react";
import { Page } from "../types";
import { useKeydownEffect } from "./useKeydownEffect";

type Props = {
  setPage: React.Dispatch<React.SetStateAction<Page>>;
};

function Main({ setPage }: Props) {
  const onClickHandler = useCallback(() => {
    setPage("start");
  }, [setPage]);

  useKeydownEffect(() => {
    setPage("start");
  });

  return (
    <>
      <h1>Typing Test</h1>

      <button className="btn" id="start" onClick={onClickHandler}>
            Start Game
          </button>
    </>
  );
}

export default Main;
