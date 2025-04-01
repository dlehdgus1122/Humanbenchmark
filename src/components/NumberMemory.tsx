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

  const renderPage = useCallback(
    (curPage: Page) => {
      switch (curPage) {
        case "startPage":
          return <Start setPage={setPage} />;
        case "numberPage":
          return <Number setPage={setPage} />;
        case "inputPage":
          return <Input setPage={setPage} />;
        case "successPage":
          return <Success setPage={setPage} />;
        case "failPage":
          return <Fail setPage={setPage} />;
        default:
          return "no";
      }
    },
    []
  );

  return (
    <>
      <div className="memory-test">{renderPage(page)}</div>
    </>
  );
};

export default NumberMemory;
