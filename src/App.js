import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ChartsAndMapPage from './components/ChartsAnsMapPage';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <>
      <Router>
        <Sidebar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/maps" element={<ChartsAndMapPage />} />
          </Routes>
        </Sidebar>
      </Router>
    </>
  );
}

export default App;
