import { Container } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Routes } from "./Routes";

function App() {
  return (
    <Router>
      <Container py={5}>
        <Routes />
      </Container>
    </Router>
  );
}

export default App;
