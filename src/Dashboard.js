import React, {useContext} from 'react';
import NavigationBar from './NavigationBar';
import { AuthContext } from './contexts/authcontext';


function Dashboard() {
  const { handleLogout } = useContext(AuthContext);
  
  

  return (
    <div className="dashboard">
      <NavigationBar />
      <button onClick={handleLogout}>Logout</button>
    </div>
    
  );
}

export default Dashboard;