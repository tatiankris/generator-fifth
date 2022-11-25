import React from 'react';
import './App.css';
import {Container, Grid} from "@mui/material";
import FakeDataGrid from "./components/FakeDataGrid";

function App() {
  return (
      <div className="App">
          <Container maxWidth="xl">
                    <h1>FAKE DATA GENERATOR</h1>
                      <FakeDataGrid/>
          </Container>
    </div>
  );
}

export default App;
