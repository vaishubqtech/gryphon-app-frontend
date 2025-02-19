import React from 'react'
import "./App.css"
import Navbar from './containers/navbar/navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateAgent from './components/CreateAgent/create-agent';
import CreateExistingAgent from './components/CreateExistingAgent/create-existing-agent';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-new-agent" element={<CreateAgent />} />
        <Route path="/create-existing-agent" element={<CreateExistingAgent />} />
      </Routes>
    </div>
  );
}

export default App;
