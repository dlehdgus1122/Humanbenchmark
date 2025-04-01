import Button from '@mui/material/Button';

import {Page} from "../NumberMemory.tsx";

type Props = {
    setPage: React.Dispatch<React.SetStateAction<Page>>;
    score: number;
  };

const Success = ({ setPage, score }: Props) => {

    return (
        <div className="success">
            <h1 id="text">Score: <h2 id="score">{score}</h2></h1>
            <h1 id="successText">Correct!</h1> 
            <Button id="btnNext" onClick={() => setPage("numberPage")} variant="contained" color="success" size="large">
                Next
            </Button>
        </div>
    )
}

export default Success;