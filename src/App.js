import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Start from './StartPage';
import LoginForm from './LoginForm';
import Form from './Registration'; // Import the Form component
import Header from './Header'
import './App.css';
import Year1 from './Year1';
import RevForm from './RevEngineerForm';
import ProForma from './ProForma';
import Year2 from './Year2Form';
import Year3 from './Year3Form';
import Depreciation from './DepreciationForm';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform login logic, set loggedIn to true upon successful login
    setLoggedIn(true);
  };

  return (
    <div>
    <Header />
    <Router>
      <Routes>
        <Route path="/" element={loggedIn ? <Navigate to="/start" /> : <LoginForm isLoggedIn={handleLogin} />} />
        <Route path="/start" element={loggedIn ? <Start setLoggedIn={setLoggedIn} /> : <Navigate to="/" />} />
        {/* Route for registration */}
        <Route path="/register" element={<Form setLoggedIn={setLoggedIn}/>} />
        <Route path="/revForm" element={loggedIn ? <RevForm setLoggedIn={setLoggedIn}/> : <Navigate to="/"/>} />
        <Route path="/proForma" element={loggedIn ? <ProForma setLoggedIn={setLoggedIn}/> : <Navigate to="/"/>} />
        <Route path="/year1" element={loggedIn ? <Year1 setLoggedIn={setLoggedIn}/> : <Navigate to="/"/>} />
        <Route path="/year2" element={loggedIn ? <Year2 setLoggedIn={setLoggedIn}/> : <Navigate to="/"/>} />
        <Route path="/year3" element={loggedIn ? <Year3 setLoggedIn={setLoggedIn}/> : <Navigate to="/"/>} />
        <Route path="/depreciation" element={loggedIn ? <Depreciation setLoggedIn={setLoggedIn}/> : <Navigate to="/"/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;