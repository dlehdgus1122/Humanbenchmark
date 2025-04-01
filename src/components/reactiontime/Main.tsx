import React, { useCallback } from "react";
import { Page } from "../types";
import { useKeydownEffect } from "./useKeydownEffect";

type Props = {
  setPage: React.Dispatch<React.SetStateAction<Page>>;
};
// Define the Main component. This component is displayed as the main page of the game.
function Main({ setPage }: Props) {
    // Define the click handler. This function sets the page state to 'start'.
  const onClickHandler = useCallback(() => {
    setPage("start");
  }, [setPage]);

    // Call the setPage function when a key is pressed.
  useKeydownEffect(() => {
    setPage("start");
  });

  return (
    <>
      <h1>Reaction Time Test</h1>

      <button className="btn" id="start" onClick={onClickHandler}>
            Start Game
          </button>
    </>
  );
}

export default Main;
