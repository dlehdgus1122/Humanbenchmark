import React, { useState, useEffect } from "react";
import {Page} from "../NumberMemory.tsx";

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

type Props = {
    setPage: React.Dispatch<React.SetStateAction<Page>>;
    numberPassed: React.Dispatch<React.SetStateAction<number>>;
    resetVariables: boolean;
};

let prevMultiplier = 1;
let multiplier = 1;
let flag = true; 
let count = 0;

let diff = 25;

let min = 1;
let max = 10;

const Number = ({ setPage , numberPassed, resetVariables}: Props) => {
    const [number, setNumber] = useState(0);
    const [progress, setProgress] = useState(0);
    const [clearVariables, setClearVariables] = useState(resetVariables);

    useEffect(() => {    

        if (clearVariables === true) {
            prevMultiplier = 1;
            multiplier = 1;
            flag = true; 
            count = 0;
            diff = 25;
            min = 1;
            max = 10;
            setClearVariables(false);
        }

        setNumber(Math.floor(Math.random() * (max - min) + min));
        

        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    count++;
                    flag = true;
                    setPage("inputPage");
                return 0;
                } else if (oldProgress === 0) {
                    if (flag === true) {
                        prevMultiplier = multiplier;
                        multiplier = multiplier * 10;
                        flag = false;
                    }
                }
                return Math.min(oldProgress + diff, 100);
            });
        }, 600);

        diff = diff - 1;
        
        return () => {
            clearInterval(timer);
        };
    }, []);

    if (flag === true && count === 1) {
        min = min * (multiplier/prevMultiplier);
        max = max * (multiplier/prevMultiplier);
        numberPassed(number);
        count = -1;
    }

    

    return (
        <div className="number">
            <h1 id="displayNumber">{number}</h1>
            <Box sx={{ width: '25%' }}>
                <LinearProgress variant="determinate" value={progress} />
            </Box>
        </div>
    );
}

export default Number;