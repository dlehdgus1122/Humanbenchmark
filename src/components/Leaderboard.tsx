import React, { useState, useEffect } from 'react';
import { Box, Tab, Tabs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const Leaderboard = () => {
    const [value, setValue] = useState(0);
    const [leaderboards, setLeaderboards] = useState({});
    const [error, setError] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // The games and their keys in the database
    const games = [
        { name: 'Reaction Time', key: 'reaction_time' },
        { name: 'Memory Test', key: 'memory_test' },
        { name: 'Sequence Memory', key: 'sequence_memory' },
        { name: 'Aim Trainer', key: 'aim_trainer' },
        { name: 'Typing Test', key: 'typing_test' }
    ];

    useEffect(() => {
        games.forEach(game => {
            // Fetch the scores for each game
            fetch(`/api/top10?game=${game.key}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setLeaderboards(prevState => ({
                        ...prevState,
                        [game.name]: data
                    }));
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    setError(error);
                });
        });
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>; // Basic error handling
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {games.map((game, index) => (
                        <Tab label={game.name} key={index} />
                    ))}
                </Tabs>
            </Box>
            {games.map((game, index) => (
                <TabPanel value={value} index={index} key={index}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell align="right">Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {leaderboards[game.name]?.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        <TableCell component="th" scope="row">
                                            {row.username} {/* Adjust based on your actual response structure */}
                                        </TableCell>
                                        <TableCell align="right">{row.score}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
            ))}
        </Box>
    );
};

export default Leaderboard;
