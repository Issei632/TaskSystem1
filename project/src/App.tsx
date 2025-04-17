import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SettingsProvider } from './contexts/SettingsContext';
import { TaskProvider } from './contexts/TaskContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <SettingsProvider>
        <TaskProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </TaskProvider>
      </SettingsProvider>
    </Router>
  );
}

export default App;