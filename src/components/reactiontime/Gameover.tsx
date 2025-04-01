import React from "react";
import { Page } from "../types";

type Props = {
  setPage: React.Dispatch<React.SetStateAction<Page>>;
};

// Define the GameOver component. This component is displayed when the user clicks too fast.
function GameOver({ setPage }: Props) {
  return (
    <>
      <h1>Too Fast</h1>
      <button onClick={() => setPage('main')}>Try again</button>
    </>
  );
}

export default GameOver;