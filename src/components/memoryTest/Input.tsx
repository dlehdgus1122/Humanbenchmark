import React, { useState } from "react";
import {Page} from "../NumberMemory.tsx";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type Props = {
    setPage: React.Dispatch<React.SetStateAction<Page>>;
    scorePassed: React.Dispatch<React.SetStateAction<number>>;
    number: number;
    setResetVariables: React.Dispatch<React.SetStateAction<boolean>>;
    resetScore: boolean;
    setResetScore: React.Dispatch<React.SetStateAction<boolean>>;
};

let scoreCounter = 0;
const Input = ({ setPage , scorePassed, number, setResetVariables, resetScore, setResetScore}: Props) => {
    const [userInput, setUserInput] = useState(0);

    console.log("passed num ",number)
    const handleChange = (e: any) => {
        setUserInput(Number(e.target.value))
    }

    const generateResult = () => {
        if (number === userInput) {
            if (resetScore === true) {
                scoreCounter = 0;
                setResetScore(false);
            }
            scoreCounter+=1;
            setResetVariables(false);
            scorePassed(scoreCounter);
            console.log(number);
            setPage("successPage");
        } else {
            scorePassed(scoreCounter);
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