//import viteLogo from "/vite.svg";
import "./App.css";
//import React, { useState, useEffect } from "react";
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard.tsx";
import Leaderboard from "./components/Leaderboard.tsx";
import Home from "./components/Home.tsx";
import Typing from "./components/Typing.tsx";
import ReactionTest from "./components/ReactionTest.tsx";
import AimTrainer from "./components/AimTrainer.tsx";
import NumberMemory from "./components/NumberMemory.tsx";
import VisualTest from "./components/VisualTest.tsx";
import Stats from "./components/Stats.tsx";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import LoginButton from "./components/LoginButton.tsx";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useAuth0 } from "@auth0/auth0-react";

function App() {
  
  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth0();

  const profileStyle = {
    borderRadius: '60px',
    width: "50%",
    height: "auto",
    cursor: "pointer",
  }

  const imgContainer = {
    width: "110px",
    height: "65px",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    marginLeft: "auto"
  }

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
  }

  const tabStyle = {
    display:"inline-flex",
  }

  const fontTheme = createTheme({
    typography: {
      fontFamily: ["Lato", "sans-serif"].join(","),
      fontSize: 20
    },
  });

  return (
    <>
      <Router>
        <div>
          <Box sx={{ flexGrow: 1, width: "100%" }}>
              <AppBar sx={{ background: "#72b6c2" }} position="static">
                <Toolbar sx={{justifyContent: 'space-between'}}>
                  <ThemeProvider theme={fontTheme}>
                  <div className="logo" style={logoStyle}>
                    <ElectricBoltIcon sx={{ fontSize: 50 }}/>
                    HUMAN LIMITS
                    </div>
                  <div className="nav-items" style={tabStyle}>
                  <Button className="item"
                    component={Link}
                    to="/"
                    size="large"
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Home
                  </Button>
                  <Button className="item"
                    component={Link}
                    to="/dashboard"
                    size="large"
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Dashboard
                  </Button>
                  <Button className="item"
                    component={Link}
                    to="/leaderboard"
                    size="large"
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Leaderboard
                  </Button>
                  {isAuthenticated && (
                    <Button
                      component={Link}
                      to="/stats"
                      size="large"
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      Stats
                    </Button>
                  )}
                  </div>
                  </ThemeProvider>
                  <div>
                  <ThemeProvider theme={fontTheme}>
                    <LoginButton />
                  </ThemeProvider>
                  {isAuthenticated && (
                    <PopupState variant="popover" popupId="demo-popup-menu">
                      {(popupState) => (
                        <React.Fragment>
                          <div style={imgContainer} {...bindTrigger(popupState)}>
                            {user ? <img style={profileStyle} src={user.picture} alt={user?.name}/>: ""}
                          </div>
                          <Menu {...bindMenu(popupState)}>
                            <MenuItem disabled onClick={popupState.close}>{user?.nickname}</MenuItem>
                            <MenuItem component={Link} to="/dashboard" onClick={popupState.close}>My Dashboard</MenuItem>
                            <MenuItem onClick={() => logout()}>Logout</MenuItem>
                          </Menu>
                        </React.Fragment>
                      )}
                    </PopupState>
                  )}
                  </div>
                </Toolbar>
              </AppBar>
          </Box>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/typing" element={<Typing />} />
          <Route path="/reactiontest" element={<ReactionTest />} />
          <Route path="/aim" element={<AimTrainer />} />
          <Route path="/numbermemory" element={<NumberMemory />} />
          <Route path="/visual" element={<VisualTest />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
