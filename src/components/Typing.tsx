import { useCallback, useState } from "react";
import "./TypingTest/TypingTest.css";
import Main from "./TypingTest/Main";
import Start from "./TypingTest/TypingTest.tsx";
import { Page } from "./types";

function ReactionTest() {
  const [page, setPage] = useState<Page>("main");
  const [history, setHistory] = useState<number[]>([]);

  const renderPage = useCallback(
    (curPage: Page) => {
      switch (curPage) {
        case "main":
          return <Main setPage={setPage} />;
        case "start":
          return <Start setPage={setPage} setRootHistory={setHistory} />;
        default:
          return "no";
      }
    },
    [history]
  );

  return (
    <>
      <div className="TypingTest">{renderPage(page)}</div>
    </>
  );
}

export default ReactionTest;
