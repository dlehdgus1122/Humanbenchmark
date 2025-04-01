import Button from '@mui/material/Button';

import {Page} from "../NumberMemory.tsx";

type Props = {
    setPage: React.Dispatch<React.SetStateAction<Page>>;
  };

const Fail = ({ setPage }: Props) => {
    
    return (
        <div className="fail">
            <h1 id="failText">Wrong</h1>
            <Button id="btnTryAgain" onClick={() => window.location.reload()} variant="contained" size="large">
                Try Again?
            </Button>
        </div>
    )
}

export default Fail;