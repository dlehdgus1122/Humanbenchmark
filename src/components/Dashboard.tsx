import { Link } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const {user, loginWithRedirect} = useAuth0();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#6d747a",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const games = [
    { name: 'Reaction Time', key: 'reaction_time' },
    { name: 'Memory Test', key: 'memory_test' },
    { name: 'Sequence Memory', key: 'sequence_memory' },
    { name: 'Aim Trainer', key: 'aim_trainer' },
    { name: 'Typing Test', key: 'typing_test' }
  ];

  const [rows, setRows] = useState<any[]>([]);

  const createData = async (game: string) => {
    if (!user) {
      return {game: game, attempts: 0, average: 0, percentile: 0}
    }
    const gameName = games.find(g => g.name === game)?.key
    const data = await fetch(`/api/scores?game=${gameName}`)
    .then(response => response.json())
    if (!data || data.length === 0) {
      return {game: game, attempts: 0, average: 0, percentile: 0}
    }
    let sum = 0;
    data.forEach((row: any) => {
      if (row.username === user.nickname) {
        sum += row.score;
      }
    })
    const average = sum / data.length;

    // what percentile is this average of all the scores?
    const scores = data.map((row: any) => row.score);
    scores.sort((a: number, b: number) => a - b);
    // average is not necessarily in the array, find where it should be to get the percentile
    let index = 0;
    while (index < scores.length && scores[index] < average) {
      index++;
    }
    const percentile = 100 - Math.round((index / scores.length) * 100);

    return {game: game, attempts: data.length, average: average, percentile: percentile}
  }

  useEffect(() => {
    const fetchData = async () => {
      const newRows: any[] = [];
      for (const game of games) {
        const row = await createData(game.name);
        newRows.push(row);
      }
      setRows(newRows);
    }
    fetchData();
  }, []);

  const profileStyle = {
    borderRadius: '60px',
    marginRight: '5%'
  }

  const userInfo = {
    display: 'flex',
    alignItems: 'center',
  }

  const linkStyle = {
    cursor: "pointer"
  }

  return (
    <div>
    <Card sx={{margin:"0 auto", marginTop:"1%", marginBottom: "1.5%", maxWidth: 700, border: 1, borderColor:"#9dabb3", padding: 2.5 }}>
      <CardContent >
        <div style={userInfo}>
          {user ? <img style={profileStyle} src={user.picture} alt={user?.name}/>: ""}
          <Typography gutterBottom variant="h5" component="div">
            {user ? <p>Username: {user?.nickname}</p> : <p>Username: Guest User</p>}
          </Typography>
        </div>
        {!user && 
        <Typography variant="body2" color="text.secondary">
          <Link style={linkStyle} onClick={() => loginWithRedirect()}>Log in</Link> or <Link  style={linkStyle} onClick={() => loginWithRedirect({authorizationParams: {screen_hint:'signup'}})}>Sign up</Link> to save your results
        </Typography>
        }
      </CardContent>
    </Card>
    <Card sx={{margin:"0 auto", maxWidth: 700, border: 1, borderColor:"#9dabb3", padding: 2.5 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Test</StyledTableCell>
              <StyledTableCell align="right">Attempts</StyledTableCell>
              <StyledTableCell align="right">Average Score</StyledTableCell>
              <StyledTableCell align="right">Percentile</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.map((row) => (
              <StyledTableRow  key={row.game}>
                <StyledTableCell component="th" scope="row">
                  {row.game}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.attempts}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.average}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.percentile}
                </StyledTableCell>
              </StyledTableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
    </div>
  
  )
};

export default Dashboard;
