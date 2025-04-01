import { useCallback, useState } from 'react';
import './ReactionTest.css';
import Main from './visualtest/Main';
import Visual from './visualtest/Visual';
import { Page } from './types';

function VisualTest() {
  const [page, setPage] = useState<Page>('main');
  const [history, setHistory] = useState<number[]>([]);

  const renderPage = useCallback(
    (curPage: Page) => {
      switch (curPage) {
        case 'main':
          return <Main setPage={setPage} />;
        case 'start':
          return <Visual setPage={setPage} setRootHistory={setHistory} />;
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

export default VisualTest;