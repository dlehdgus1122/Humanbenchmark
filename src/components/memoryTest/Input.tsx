import React, { useState } from "react";
import {Page} from "../NumberMemory.tsx";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type Props = {
    setPage: React.Dispatch<React.SetStateAction<Page>>;
};

const Input = ({ setPage }: Props) => {
    const [userInput, setUserInput] = useState(0);
    const number = JSON.parse(localStorage.getItem('numberDisplayed') || '{}');
    
    const handleChange = (e: any) => {
        setUserInput(Number(e.target.value))
    }

    const generateResult = () => {
        if (number === userInput) {
            setPage("successPage");
        } else {
            setPage("failPage");
        }
    }

    return (
        <div className="input">
            <h1 id="text">Enter the number you saw</h1>
            <TextField style={{backgroundColor: "white"}}
            onChange={handleChange}
            value={userInput}
            sx={{input: {textAlign: "center"}}}
            InputProps={{ style: { fontSize: 40} }}
            id="outlined"
        />
        <Button id="btnSubmit" onClick={() => generateResult()} variant="contained" size="large">
            Submit
        </Button>
        </div>
    )
}



export default Input;