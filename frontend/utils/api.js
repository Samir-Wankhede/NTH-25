"use client"

import axios from 'axios'
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true
});


export default API;