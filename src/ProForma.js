import React, { useState, useContext } from 'react';
import { AuthContext } from './contexts/authcontext';
import Dashboard from './Dashboard';



function ProForma() {
  const {userID} = useContext(AuthContext);
  return (
    <div>
        <Dashboard />
        <h1>Pro Forma</h1>
    </div>
  );
}

export default ProForma;