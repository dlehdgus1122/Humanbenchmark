import React, { useCallback, useEffect, useState } from 'react';
import rank from '../static/rank';
import { Page } from '../types';
import { useKeydownEffect } from './useKeydownEffect';

type Props = {
  setPage: React.Dispatch<React.SetStateAction<Page>>;
  history: number[];
};

function Result({ setPage, history }: Props) {
  const [avgReactionTime] = useState(
    history.reduce((p, c) => p + c, 0) / history.length
  );
  const [msg, setMsg] = useState({ title: '-', desc: 'Calculating...' });

  const onReplayHandler = useCallback(() => {
    setPage('main');
  }, [setPage]);

  useKeydownEffect(() => {
    setPage('main');
  });

  useEffect(() => {
    const renderRsultMessage = () => {
      for (let index = 0; index < rank.length; index += 1) {
        const { time, title, desc } = rank[index];

        if (avgReactionTime <= time) {
          setMsg({ title, desc });
          return;
        }
      }

      const { title, desc } = rank[rank.length - 1];
      setMsg({ title, desc });
    };

    renderRsultMessage();
  }, [avgReactionTime]);

  return (
    <>

      <h2>Test Result</h2>

      <div className="result">
        <h1>{avgReactionTime.toFixed(2)}</h1>
        <span>ms</span>
      </div>

      <div className="msg">
        <p>Your Reaction Time</p>
        <p className="rank">{msg.title}</p>
        <p className="rank-msg">{msg.desc}</p>
      </div>

      <div className="replay">
        <button
          type="button"
          onClick={onReplayHandler}
          onKeyDown={(ev) => {
            console.log({ ev });
          }}
        >
          Try again
        </button>
      </div>
    </>
  );
}

export default Result;
