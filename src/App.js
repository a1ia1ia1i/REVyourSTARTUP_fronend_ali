import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Start from './StartPage';
import LoginForm from './pages/Login';
import RegistrationForm from './pages/Registration';
import Header from './Header'
import './App.css';
import Year1 from './Year1';
import ProForma from './pages/proForma';
import Year2 from './Year2Form';
import Year3 from './Year3Form';
import Depreciation from './DepreciationForm';
import { AuthContext } from './contexts/authcontext';

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  
  return (
    <div>
    <Header />
    <Router>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/start" /> : <LoginForm/>} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/start" /> : <LoginForm/>} />
          <Route path="/start" element={isLoggedIn ? <Start/> : <Navigate to="/" />} />
          <Route path="/register" element={isLoggedIn ? <RegistrationForm/> : <Navigate to="/" />} />
          <Route path="/proForma" element={isLoggedIn ? <ProForma/> : <Navigate to="/" />} />
          <Route path="/year1" element={isLoggedIn ? <Year1/> : <Navigate to="/" />} />
          <Route path="/year2" element={isLoggedIn ? <Year2/> : <Navigate to="/" />} />
          <Route path="/year3" element={isLoggedIn ? <Year3/> : <Navigate to="/" />} />
          <Route path="/depreciation" element={isLoggedIn ? <Depreciation/> : <Navigate to="/" />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
