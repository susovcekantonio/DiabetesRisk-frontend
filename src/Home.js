import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

function Home() {
    const [medicalRecords, setMedicalRecords] = useState([]);
    const { patientId, logout } = useAuth(); // Access logout from context
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

    return (
        <div className="home-container">
            <h2>Your Medical Records</h2>
            <button onClick={handleAddNewRecord}>Add New Medical Record</button>
            <button onClick={logout} >Logout</button> {/* Added logout button */}
            <div className="records-list">
                {medicalRecords.length > 0 ? (
                    medicalRecords.map(record => (
                        <div
                            key={record.id}
                            className="record-box"
                            onClick={() => handleRecordClick(record.id)}
                        >
                            {`Record ID: ${record.id}`}
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
