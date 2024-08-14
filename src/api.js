import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';  // Adjust the URL as needed

export const registerPatient = async (patient) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/patient/save`, patient);
        return response.data;
    } catch (error) {
        console.error('Error registering patient:', error);
        throw error;
    }
};

export const saveMedicalRecord = async (patientId, medicalRecord) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/patient/${patientId}/medicalrecord/save`, medicalRecord);
        return response.data;
    } catch (error) {
        console.error('Error saving medical record:', error);
        throw error;
    }
};

export const getGPTResponse = async (patientId, medicalRecord) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/patient/${patientId}/medicalrecord/gpt`, medicalRecord);
        return response.data;
    } catch (error) {
        console.error('Error getting GPT response:', error);
        throw error;
    }
};

export const getAzureResponse = async (patientId, medicalRecord) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/patient/${patientId}/medicalrecord/azure`, medicalRecord);
        return response.data;
    } catch (error) {
        console.error('Error getting Azure response:', error);
        throw error;
    }
};
