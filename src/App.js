import React from 'react'
import "./App.css"
import Navbar from './containers/navbar/navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateAgent from './components/CreateAgent/create-agent';
import CreateExistingAgent from './components/CreateExistingAgent/create-existing-agent';
import Dashboard from './pages/Dashboard';
import DetailScreen from './components/DetailScreen/DetailScreen';
import Footer from './containers/Footer/footer';
import UserProfile from './components/UserProfile/user-profile';

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/detail-screen/:id" element={<DetailScreen />} />
        <Route path="/create-new-agent" element={<CreateAgent />} />
        <Route path="/create-existing-agent" element={<CreateExistingAgent />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
