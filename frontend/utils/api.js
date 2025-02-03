import axios from 'axios'

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'https://nthhost.credenz.co.in',
    withCredentials: true
});


export default API;