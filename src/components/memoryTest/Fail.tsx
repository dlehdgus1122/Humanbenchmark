import Button from "@mui/material/Button";
import { useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Page } from "../NumberMemory.tsx";

type Props = {
  setPage: React.Dispatch<React.SetStateAction<Page>>;
  score: number;
};

const Fail = ({ setPage, score }: Props) => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  //handleFail function checks if user is logged in, if so then
  //it stores the logged in user's score via a POST request
  const handleFail = async () => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      await fetch("/api/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          game: "memory_test",
          score: score,
          user: user?.sub,
        }),
      });
    }
  };

  //Called when user clicks "Try Again" button, and executed
  //after handleFail function finishes executing
  const onReplayHandler = useCallback(() => {
    setPage("startPage");
    handleFail(); //setPage sets startPage to be rendered next
  }, [setPage, handleFail]);

  return (
    <div className="fail">
      <h1 id="text">
        Score: <h2 id="failScore">{score}</h2>
      </h1>
      <h1 id="failText">Incorrect</h1>
      <Button
        id="btnTryAgain"
        onClick={onReplayHandler}
        variant="contained"
        size="large"
      >
        Try Again?
      </Button>
    </div>
  );
};

export default Fail;
