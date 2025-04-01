import { useCallback, useState } from 'react';
import './ReactionTest.css';
import Main from './reactiontime/Main';
import Start from './reactiontime/Start';
import Result from './reactiontime/Result';
import { Page } from './types';
import GameOver from './reactiontime/Gameover';

function ReactionTest() {
  const [page, setPage] = useState<Page>('main');
  const [history, setHistory] = useState<number[]>([]);

  const renderPage = useCallback(
    (curPage: Page) => {
      switch (curPage) {
        case 'main':
          return <Main setPage={setPage} />; // Render the main page.
          case 'start':
        case 'start':
          return <Start setPage={setPage} setRootHistory={setHistory} />; // Render the start page.
        case 'result':
          return <Result setPage={setPage} history={history} />; // Render the result page.
        case 'gameover':
          return <GameOver setPage={setPage} />; // Render the game over page.
        default:
          return 'no';
      }
    },
    [history]
  );

  return (
    <>
      <div className="ReactionTest">{renderPage(page)}</div>
    </>
  );
}

export default ReactionTest;