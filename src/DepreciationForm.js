import React, { useContext } from 'react';
import Dashboard from './Dashboard';
import { AuthContext } from './contexts/authcontext';


function Depreciation({setLoggedIn}) {
  const { userID } = useContext(AuthContext);
  return (
    <div>
        <Dashboard setLoggedIn={setLoggedIn}/>
        <h1>Depreciation Form</h1>
    </div>
  );
}

export default Depreciation;