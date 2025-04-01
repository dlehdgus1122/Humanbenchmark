import { useCallback, useState } from "react";

import Start from "./memoryTest/Start";
import Fail from "./memoryTest/Fail";
import Input from "./memoryTest/Input";
import Number from "./memoryTest/Number";
import Success from "./memoryTest/Success";
import "./NumberMemory.css";

export type Page =
  | "startPage"
  | "numberPage"
  | "inputPage"
  | "successPage"
  | "failPage";

const NumberMemory = () => {
  const [page, setPage] = useState<Page>("startPage");
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [resetVariables, setResetVariables] = useState(false);
  const [resetScore, setResetScore] = useState(false);
  
  //function which renders the appropriate page depending on what value the page useState variable takes
  const renderPage = useCallback(
    (curPage: Page) => {
      switch (curPage) {
        case "startPage":
          return <Start setPage={setPage} setResetVariables={setResetVariables} setResetScore={setResetScore}/>;
        case "numberPage":
          return <Number setPage={setPage} numberPassed={setNumber} resetVariables={resetVariables}/>;
        case "inputPage":
          return <Input setPage={setPage} scorePassed={setScore} number={number} setResetVariables={setResetVariables} resetScore={resetScore} setResetScore={setResetScore}/>;
        case "successPage":
          return <Success setPage={setPage} score={score} />;
        case "failPage":
          return <Fail setPage={setPage} score={score}/>;
        default:
          return "no";
      }
    },
    [number, score, resetVariables, resetScore]
  );

  return (
    <>
      <div className="memory-test">{renderPage(page)}</div>
    </>
  );
};

export default NumberMemory;
