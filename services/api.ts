import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { useGlobalStore } from '@/stores/GlobalStore';

const userStore = useGlobalStore();
const token = userStore.token;

const api = axios.create({
  baseURL: process.env.BASE_URL_API,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
