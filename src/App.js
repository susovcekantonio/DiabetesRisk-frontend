import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Auth from './Auth'; // Import the new Auth component
import MedicalRecord from './MedicalRecord';
import NewMedicalRecord from './NewMedicalRecord';
import PrivateRoute from './PrivateRoute';
import './App.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/auth" element={<Auth />} /> {/* Unified route for Auth */}
                <Route path="/home" element={<PrivateRoute element={<Home />} />} />
                <Route path="/medical-record/:patientId" element={<PrivateRoute element={<MedicalRecord />} />} />
                <Route path="/medical-record/new" element={<NewMedicalRecord />} />
                <Route path="/" element={<Navigate to="/auth" />} />
            </Routes>
        </div>
    );
}

export default App;
