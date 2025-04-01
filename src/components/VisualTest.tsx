import { useCallback, useState } from 'react';
import './VisualTest.css';
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
          return <Main setPage={setPage} />; // Render the main page.
        case 'start':
          return <Visual setPage={setPage} setRootHistory={setHistory} />; // Render the start page.
        default:
          return 'no';
      }
    },
    [history]
  );

  return (
    <>
      <div className="VisualTest">{renderPage(page)}</div>
    </>
  );
}

export default VisualTest;