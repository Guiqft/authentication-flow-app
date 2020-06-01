import * as SecureStore from 'expo-secure-store';
import api from './services/api';

export const USER_KEY = "authentication";

export async function getToken(data) {
    const headers = {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'access-control-allow-origin': '*'
    };
    
    try {
        const response = await api.post('/auth/login', data, {
            headers: headers
        })

        return response;
    } catch (err) {
        return(err.response);
    }
}