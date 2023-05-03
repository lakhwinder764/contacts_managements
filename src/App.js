import React from "react"; 
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Header from "./Header";
import { Grid } from "@mui/material";
import ChartsAndMapPage from "./ChartsAnsMapPage";
import Sidebar from "./Sidebar";

function App() {
  return (
    <Router>
    <Grid container>
      <Grid item xs={12}> 
      <Header />
      </Grid>
      <Grid item xs={1}>
        <Sidebar />
      </Grid>
      <Grid item xs={11}>
      <Routes>
   <Route path="/" element={<Home />}/>
   <Route path="/home" element={<ChartsAndMapPage />}/>
      </Routes>
   
    </Grid>
  </Grid>
  </Router>
  );
}

export default App;