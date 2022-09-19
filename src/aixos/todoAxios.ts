import axios from 'axios';
import { TODOS_URL } from '../constants/Url';

export const axiosTodo = axios.create({
    baseURL: TODOS_URL,
    // timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
    },
});
