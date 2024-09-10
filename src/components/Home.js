import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Home() {
    const [medicalRecords, setMedicalRecords] = useState([]);
    const { patientId, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMedicalRecords = async () => {
            if (!patientId) {
                console.error("No patient ID found");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/api/patient/${patientId}/medicalrecord`);
                setMedicalRecords(response.data);
            } catch (error) {
                console.error("Error fetching medical records:", error);
            }
        };

        fetchMedicalRecords();
    }, [patientId]);

    const handleRecordClick = (recordId) => {
        navigate(`/medical-record/${recordId}`);
    };

    const handleAddNewRecord = () => {
        navigate('/medical-record/new');
    };

    const handleDeleteRecord = async (recordId) => {
        try {
            await axios.delete(`http://localhost:8080/api/patient/medicalrecord/${recordId}`);
            setMedicalRecords(medicalRecords.filter(record => record.id !== recordId));
        } catch (error) {
            console.error("Error deleting medical record:", error);
        }
    };

    const handleDeletePatient = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/patient/${patientId}`);
            logout();
            navigate('/auth');
        } catch (error) {
            console.error("Error deleting patient:", error);
        }
    };

    return (
        <div className="home-container">
            <h2>Your Medical Records</h2>
            <button onClick={handleAddNewRecord}>Add New Medical Record</button>
            <button onClick={handleDeletePatient}>Delete Your Account</button>
            <button onClick={logout}>Logout</button>
            <div className="records-list">
                {medicalRecords.length > 0 ? (
                    medicalRecords.map(record => (
                        <div key={record.id} className="record-box">
                            {`Record ID: ${record.id}`}
                            <button onClick={() => handleRecordClick(record.id)}>View</button>
                            <button onClick={() => handleDeleteRecord(record.id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No medical records found.</p>
                )}
            </div>
        </div>
    );
}

export default Home;
