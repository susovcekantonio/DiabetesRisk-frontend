import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [patientId, setPatientId] = useState(null);
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8080/api/patient/login', { email, password }, {
                headers: { 'Content-Type': 'application/json' },
            });


            if (response.data && response.data.id) {
                setIsAuthenticated(true);
                setPatientId(response.data.id);
                localStorage.setItem('patientId', response.data.id);
                navigate('/home');
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setPatientId(null);
        localStorage.removeItem('patientId');
        navigate('/auth');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, patientId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
