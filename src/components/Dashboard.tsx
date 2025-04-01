import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";
import { Button } from "@mui/material";

import KeyboardIcon from "@mui/icons-material/Keyboard";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import Filter7Icon from "@mui/icons-material/Filter7";
import WidgetsIcon from "@mui/icons-material/Widgets";

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

  const StyledCard = styled(Card)`
  ${({ theme }) => `
  cursor: pointer;
  background-color: ${theme.palette.primary.light};
  transition: ${theme.transitions.create(["background-color", "transform"], {
    duration: theme.transitions.duration.complex,
    easing: theme.transitions.easing.easeInOut,
  })};
  &:hover {
    
    transform: translate(0, -10px);
  }
  `}
`;

const customTheme = createTheme({
  palette: {
    primary: {
      light: "#ffffff",
      main: "#1976D2",
    },
    secondary: {
      main: blue[50],
    },
  },
});

  const games = [
    { name: 'Reaction Time', key: 'reaction_time' },
    { name: 'Memory Test', key: 'memory_test' },
    { name: 'Sequence Memory', key: 'sequence_memory' },
    { name: 'Aim Trainer', key: 'aim_trainer' },
    { name: 'Typing Test', key: 'typing_test' }
  ];

  const [rows, setRows] = useState<any[]>([]);
  
  // Create data from API call
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
    <Card sx={{margin:"0 auto", marginTop:"1%", marginBottom: "2.5%", maxWidth: 900, border: 1, borderColor:"#9dabb3", padding: 1.5 }}>
      <CardContent >
        <div style={userInfo}>
          {user ? <img style={profileStyle} src={user.picture} alt={user?.name}/>: ""}
          <Typography gutterBottom variant="h5" component="div">
            {user ? <p>Username: {user?.nickname}</p> : <p>Username: Guest User</p>}
          </Typography>
        </div>
        {!user && 
        <Typography variant="body2" color="text.secondary">
          <Button style={linkStyle} onClick={() => loginWithRedirect()}>Log in</Button> or <Button  style={linkStyle} onClick={() => loginWithRedirect({authorizationParams: {screen_hint:'signup'}})}>Sign up</Button> to save your results
        </Typography>
        }
      </CardContent>
    </Card>
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid container spacing={3} sx={{marginBottom: "2.5%", maxWidth: 900 }}>
        <Grid item xs sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Link to="/typing">
            <ThemeProvider theme={customTheme}>
              <StyledCard sx={{ minWidth: 240, maxHeight: 175, textAlign: "center", background: "linear-gradient(180deg, rgba(0,0,0,0.2), rgba(236, 69, 78, 1))" }}>
                <KeyboardIcon
                  color="primary"
                  sx={{ fontSize: 80, marginTop:"6%" }}
                ></KeyboardIcon>
                <CardContent>
                  <Typography gutterBottom sx={{ fontWeight: 'bold', m: 1 }} variant="h5" component="div">
                    Typing Test
                  </Typography>
                </CardContent>
              </StyledCard>
            </ThemeProvider>
          </Link>
        </Grid>
        <Grid item xs sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Link to="/reactiontest">
            <ThemeProvider theme={customTheme}>
              <StyledCard sx={{ minWidth: 240, maxHeight: 175, textAlign: "center", background: "linear-gradient(180deg, rgba(0,0,0,0.2), rgba(236, 175, 69, 1))" }}>
                <OfflineBoltIcon
                  color="primary"
                  sx={{ fontSize: 80, marginTop:"6%" }}
                ></OfflineBoltIcon>
                <CardContent>
                  <Typography gutterBottom sx={{ fontWeight: 'bold', m: 1 }} variant="h5" component="div">
                    Reaction Test
                  </Typography>
                </CardContent>
              </StyledCard>
            </ThemeProvider>
          </Link>
        </Grid>
        <Grid item xs sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Link to="/aim">
            <ThemeProvider theme={customTheme}>
              <StyledCard sx={{ minWidth: 240, maxHeight: 175, textAlign: "center", background: "linear-gradient(180deg, rgba(0,0,0,0.2), rgba(151, 69, 236, 1))" }}>
                <AdsClickIcon
                  color="primary"
                  sx={{ fontSize: 80, marginTop:"6%" }}
                ></AdsClickIcon>
                <CardContent>
                  <Typography gutterBottom sx={{ fontWeight: 'bold', m: 1 }} variant="h5" component="div">
                    Aim Trainer
                  </Typography>
                </CardContent>
              </StyledCard>
            </ThemeProvider>
          </Link>
        </Grid>
        <Grid item xs sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Link to="/numbermemory">
            <ThemeProvider theme={customTheme}>
              <StyledCard sx={{ minWidth: 240, maxHeight: 175, textAlign: "center", overflow:'hidden', whiteSpace:"nowrap", background: "linear-gradient(180deg, rgba(0,0,0,0.2), rgba(69, 236, 231, 1))" }}>
                <Filter7Icon
                  color="primary"
                  sx={{ fontSize: 80, marginTop:"6%" }}
                ></Filter7Icon>
                <CardContent>
                  <Typography gutterBottom sx={{ fontWeight: 'bold', m: 1 }} variant="h5" component="div">
                    Number Memory
                  </Typography>
                </CardContent>
              </StyledCard>
            </ThemeProvider>
          </Link>
        </Grid>
        <Grid item xs sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Link to="/visual">
            <ThemeProvider theme={customTheme}>
              <StyledCard sx={{ minWidth: 240, maxHeight: 175, textAlign: "center", overflow:'hidden', whiteSpace:"nowrap", background: "linear-gradient(180deg, rgba(0,0,0,0.2), rgba(69, 236, 133, 1))" }}>
                <WidgetsIcon
                  color="primary"
                  sx={{ fontSize: 80, marginTop:"6%" }}
                ></WidgetsIcon>
                <CardContent>
                  <Typography gutterBottom sx={{ fontWeight: 'bold', m: 1 }}  variant="h5" component="div">
                    Visual Memory
                  </Typography>
                </CardContent>
              </StyledCard>
            </ThemeProvider>
          </Link>
        </Grid>
      </Grid>
    </Box>
    {/* <Card sx={{margin:"0 auto", maxWidth: 800, border: 1, borderColor:"#9dabb3", padding: 2.5 }}> */}
      <TableContainer sx={{ maxWidth: 900, margin:"0 auto", marginBottom: "2.5%"}} component={Paper}>
        <Table  aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Test</StyledTableCell>
              <StyledTableCell align="center">Attempts</StyledTableCell>
              <StyledTableCell align="center">Average Score</StyledTableCell>
              <StyledTableCell align="center">Percentile</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.map((row) => (
              <StyledTableRow  key={row.game}>
                <StyledTableCell component="th" scope="row">
                  {row.game}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.attempts}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.average}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.percentile}
                </StyledTableCell>
              </StyledTableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    {/* </Card> */}
    </div>
  
  )
};

export default Dashboard;
