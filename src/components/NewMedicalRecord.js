import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function NewMedicalRecord() {
    const { patientId } = useAuth();
    const [medicalRecord, setMedicalRecord] = useState({
        gender: '',
        age: '',
        urea: '',
        cr: '',
        hba1c: '',
        chol: '',
        tg: '',
        hdl: '',
        ldl: '',
        vldl: '',
        bmi: '',
        hasDiabetes: false
    });
    const [gptResponse, setGptResponse] = useState('');
    const [azureResponse, setAzureResponse] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        setMedicalRecord({ ...medicalRecord, [name]: val });
    };

    const handleSave = async () => {
        try {
            await axios.post(`http://localhost:8080/api/patient/${patientId}/medicalrecord/save`, medicalRecord, {
                headers: { 'Content-Type': 'application/json' }
            });
            alert('Medical record saved successfully');
            navigate('/home');
        } catch (error) {
            alert('Failed to save medical record');
        }
    };

    const handleGPT = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/patient/${patientId}/medicalrecord/gpt`, medicalRecord, {
                headers: { 'Content-Type': 'application/json' }
            });
            setGptResponse(response.data);
        } catch (error) {
            alert('Failed to get GPT response');
        }
    };

    const handleAzure = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/patient/${patientId}/medicalrecord/azure`, medicalRecord, {
                headers: { 'Content-Type': 'application/json' }
            });
            setAzureResponse(response.data);
        } catch (error) {
            alert('Failed to get Azure response');
        }
    };

    const handleBack = () => {
        navigate('/home');
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Enter New Medical Data</h2>
                <form>
                    <div>
                        <label>Gender(F or M):</label>
                        <input type="text" name="gender" value={medicalRecord.gender} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>Age:</label>
                        <input type="number" name="age" value={medicalRecord.age} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>Urea(mmol/L):</label>
                        <input type="number" name="urea" value={medicalRecord.urea} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>Creatinine (Cr)(µmol/L)pm star:</label>
                        <input type="number" name="cr" value={medicalRecord.cr} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>HbA1c(%):</label>
                        <input type="number" step="0.1" name="hba1c" value={medicalRecord.hba1c} onChange={handleChange}
                               required/>
                    </div>
                    <div>
                        <label>Cholesterol (Chol)(mmol/L):</label>
                        <input type="number" name="chol" value={medicalRecord.chol} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>Triglycerides (TG)(mmol/L):</label>
                        <input type="number" name="tg" value={medicalRecord.tg} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>HDL(mmol/L):</label>
                        <input type="number" name="hdl" value={medicalRecord.hdl} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>LDL(mmol/L):</label>
                        <input type="number" name="ldl" value={medicalRecord.ldl} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>VLD(mmol/L):</label>
                        <input type="number" name="vldl" value={medicalRecord.vldl} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>BMI:</label>
                        <input type="number" step="0.1" name="bmi" value={medicalRecord.bmi} onChange={handleChange}
                               required/>
                    </div>
                </form>
            </div>
            <div className="response-container">
                <div className="button-group">
                    <button type="button" onClick={handleGPT}>Analize data through GPT</button>
                    <div className="response-section">
                        {gptResponse && (
                            <div>
                                <h3>GPT Response:</h3>
                                <p>{gptResponse}</p>
                            </div>
                        )}
                    </div>
                    <button type="button" onClick={handleAzure}>Analize data through Azure</button>
                    <div className="response-section">
                        {azureResponse && (
                            <div>
                                <h3>Azure Response:</h3>
                                <p>{azureResponse}</p>
                            </div>
                        )}
                    </div>
                </div>
                <button type="button" onClick={handleSave}>Save a new medical record</button>
                <button type="button" className="back-button" onClick={handleBack}>Back to Home</button>
            </div>
        </div>
    );
}

export default NewMedicalRecord;
