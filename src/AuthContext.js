import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [patientId, setPatientId] = useState(null); // State to store patient ID
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8080/api/patient/login', { email, password }, {
                headers: { 'Content-Type': 'application/json' },
            });

            // Check if response is successful and contains the id
            if (response.data && response.data.id) {
                setIsAuthenticated(true);
                setPatientId(response.data.id); // Store the patient ID
                localStorage.setItem('patientId', response.data.id); // Optional: persist ID in localStorage
                navigate('/home'); // Only navigate after setting the state
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            // Handle errors here
            throw error; // Rethrow error to be handled by the calling component (Login.js)
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setPatientId(null); // Clear patient ID on logout
        localStorage.removeItem('patientId'); // Optionally clear patient ID from localStorage
        navigate('/auth');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, patientId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
