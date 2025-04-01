import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import KeyboardIcon from "@mui/icons-material/Keyboard";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import Filter7Icon from "@mui/icons-material/Filter7";
import WidgetsIcon from "@mui/icons-material/Widgets";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

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

const StyledCard = styled(Card)`
  ${({ theme }) => `
  cursor: pointer;
  background-color: ${theme.palette.primary.light};
  transition: ${theme.transitions.create(["background-color", "transform"], {
    duration: theme.transitions.duration.complex,
    easing: theme.transitions.easing.easeInOut,
  })};
  &:hover {
    background-color: ${theme.palette.secondary.main};
    transform: translate(0, -10px);
  }
  `}
`;

const fontTheme = createTheme({
  typography: {
    fontFamily: ["Play", "sans-serif"].join(","),
  },
});

const headerStyle = {
  textAlign: "center" as "center",
};

const Home = () => {
  return (
    <>
      <div style={headerStyle} className="header">
        <ThemeProvider theme={fontTheme}>
          <Typography variant="h2">Welcome to Human Limits!</Typography>
        </ThemeProvider>
      </div>
      <Grid
        container
        sx={{ marginTop: "1%", marginBottom: "2%" }}
        spacing={6}
        columns={16}
        display="flex"
        justifyContent="center"
      >
        <Grid
          item
          xs={8}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Link to="/typing">
            <ThemeProvider theme={customTheme}>
              <StyledCard sx={{ maxWidth: 345, textAlign: "center" }}>
                <KeyboardIcon
                  color="primary"
                  sx={{ fontSize: 80 }}
                ></KeyboardIcon>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Typing Test
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Test your typing speed and accuracy with this quick typing
                    challenge!
                  </Typography>
                </CardContent>
              </StyledCard>
            </ThemeProvider>
          </Link>
        </Grid>
        <Grid
          item
          xs={8}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Link to="/reactiontest">
            <ThemeProvider theme={customTheme}>
              <StyledCard sx={{ maxWidth: 345, textAlign: "center" }}>
                <OfflineBoltIcon
                  color="primary"
                  sx={{ fontSize: 80 }}
                ></OfflineBoltIcon>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Reaction Test
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Put your reflexes to the test! How fast can you react?
                  </Typography>
                </CardContent>
              </StyledCard>
            </ThemeProvider>
          </Link>
        </Grid>
        <Grid
          item
          xs={8}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Link to="/aim">
            <ThemeProvider theme={customTheme}>
              <StyledCard sx={{ maxWidth: 345, textAlign: "center" }}>
                <AdsClickIcon
                  color="primary"
                  sx={{ fontSize: 80 }}
                ></AdsClickIcon>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Aim Trainer
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Test your reflexes and beat the clock! How quick are you?
                  </Typography>
                </CardContent>
              </StyledCard>
            </ThemeProvider>
          </Link>
        </Grid>
        <Grid
          item
          xs={8}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Link to="/numbermemory">
            <ThemeProvider theme={customTheme}>
              <StyledCard sx={{ maxWidth: 345, textAlign: "center" }}>
                <Filter7Icon
                  color="primary"
                  sx={{ fontSize: 75 }}
                ></Filter7Icon>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Number Memory
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Flex your memory muscles and see if you can remember the
                    numbers!
                  </Typography>
                </CardContent>
              </StyledCard>
            </ThemeProvider>
          </Link>
        </Grid>
        <Grid
          item
          xs={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to="/visual">
            <ThemeProvider theme={customTheme}>
              <StyledCard sx={{ maxWidth: 345, textAlign: "center" }}>
                <WidgetsIcon
                  color="primary"
                  sx={{ fontSize: 80 }}
                ></WidgetsIcon>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Visual Memory
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Unleash your visual memory skills and put them to the test!
                  </Typography>
                </CardContent>
              </StyledCard>
            </ThemeProvider>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
