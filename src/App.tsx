//import viteLogo from "/vite.svg";
//import "./App.css";
//import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login.tsx";
import Signup from "./components/Signup.tsx";
import Dashboard from "./components/Dashboard.tsx";
import Leaderboard from "./components/Leaderboard.tsx";
import Home from "./components/Home.tsx";
import Typing from "./components/Typing.tsx";
import ReactionTest from "./components/ReactionTest.tsx";
import AimTrainer from "./components/AimTrainer.tsx";
import NumberMemory from "./components/NumberMemory.tsx";
import VisualTest from "./components/VisualTest.tsx";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import LoginButton from "./components/LoginButton.tsx";
import LogoutButton from "./components/LogoutButton.tsx";

function App() {
  // const linkStyle = {
  //   margin: 20,
  //   textDecoration: "none",
  //   padding: 50,
  //   fontWeight: "bold",
  // };
  return (
    <>
      <Router>
        <div>
          <Box sx={{ flexGrow: 1, width: "100%" }}>
            <AppBar sx={{ background: "#72b6c2" }} position="static">
              <Toolbar>
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <Button
                    component={Link}
                    to="/"
                    size="large"
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Home
                  </Button>
                  <Button
                    component={Link}
                    to="/dashboard"
                    size="large"
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Dashboard
                  </Button>
                  <Button
                    component={Link}
                    to="/leaderboard"
                    size="large"
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Leaderboard
                  </Button>
                  {/* <Button
                    component={Link}
                    to="/signup"
                    size="large"
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Sign Up
                  </Button> */}
                  <LoginButton />
                  <LogoutButton />
                </Box>
              </Toolbar>
            </AppBar>
          </Box>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/typing" element={<Typing />} />
          <Route path="/reactiontest" element={<ReactionTest />} />
          <Route path="/aim" element={<AimTrainer />} />
          <Route path="/numbermemory" element={<NumberMemory />} />
          <Route path="/visual" element={<VisualTest />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
