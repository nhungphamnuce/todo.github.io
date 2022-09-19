import axios from 'axios';
import { LOGIN_URL } from '../constants/Url';

export const authAxios = axios.create({
    baseURL: LOGIN_URL,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
    },
});
