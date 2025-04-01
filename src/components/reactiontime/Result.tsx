import React, { useCallback, useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import rank from '../static/rank';
import { Page } from '../types';
import { useKeydownEffect } from './useKeydownEffect';

type Props = {
  setPage: React.Dispatch<React.SetStateAction<Page>>;
  history: number[];
};
// Component to display the result.
function Result({ setPage, history }: Props) {
    // Calculate the average reaction time and store it in the state.
  const [avgReactionTime] = useState(
    history.reduce((p, c) => p + c, 0) / history.length
  ); 
  // State to manage the message.
  const [msg, setMsg] = useState({ title: "-", desc: "Calculating..." });
  // Load authentication information using Auth0.
  const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();
  
  // Event handler for when the Replay button is clicked.
  const onReplayHandler = useCallback(async () => {
    setPage('main');
    // If authenticated, get the token and send the score to the server.
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      await fetch(
        "/api/scores",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            game: "reaction_time",
            score: avgReactionTime.toFixed(2),
            user: user.sub,
          }),
        }
      );
    }
  }, [setPage, user, isAuthenticated, getAccessTokenSilently, avgReactionTime]);

    // Handle keyboard event.
  useKeydownEffect(() => {
    setPage("main");
  });

    // UseEffect to determine the message based on the average reaction time.
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

    // Return the JSX to display the result component.
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
          onClick={() => onReplayHandler()}
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
