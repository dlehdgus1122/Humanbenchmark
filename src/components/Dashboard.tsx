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

  function createData(test: string) {
    return { test };
  }
  
  const rows = [
    createData('Reaction time'),
    createData('Memory test '),
    createData('Sequence memory '),
    createData('Aim trainer'),
    createData('Typing test'),
  ];

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
    <Card sx={{margin:"0 auto", marginBottom:2.5, maxWidth: 700, border: 1, borderColor:"#9dabb3", padding: 2.5 }}>
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
              <StyledTableCell align="right">Actions</StyledTableCell>
              <StyledTableCell align="right">Score</StyledTableCell>
              <StyledTableCell align="right">Percentile</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.map((row) => (
              <StyledTableRow  key={row.test}>
                <StyledTableCell component="th" scope="row">
                  {row.test}
                </StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
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
