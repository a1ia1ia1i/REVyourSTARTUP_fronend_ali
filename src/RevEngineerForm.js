import React, { useState, useContext } from 'react';
import { AuthContext } from './contexts/authcontext';
import Dashboard from './Dashboard';


function RevForm({setLoggedIn}) {
  const { userID } = useContext(AuthContext);
  return (
    <div>
        <Dashboard setLoggedIn={setLoggedIn}/>
        <h1>Reverse Engineering Form</h1>
    </div>
  );
}

export default RevForm;