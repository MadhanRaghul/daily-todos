import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Lists from './Lists';
import ProtectedRoutes from './ProtectedRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route 
          path="/lists" 
          element={
            <ProtectedRoutes>
              <Lists />
            </ProtectedRoutes>
          } 
        />
        
      </Routes>
    </Router>
  );
}

export default App;
