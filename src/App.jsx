import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BusinessCard from './components/BusinessCard';
import QRGenerator from './components/QRGenerator';
// import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/card/:username" element={<BusinessCard />} />
        {/* <Route path="/admin" element={<AdminPanel />} /> */}
        <Route path="/generate" element={<QRGenerator />} />
        <Route path="/" element={<BusinessCard />} />

      </Routes>
    </Router>
  );
}

export default App;