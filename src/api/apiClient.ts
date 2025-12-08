// index.js
import axios from 'axios';
import { apiKeys } from '@/config/index';

const CONNECTION_TIMEOUT = 60000;

/**
 * Create a JSON-based Axios client instance.
 */
export const clientV1 = axios.create({
  baseURL: apiKeys.VITE_BASE_URL,
  timeout: CONNECTION_TIMEOUT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

/**
 * Create a multipart/form-data Axios client instance.
 */
export const docClientV1 = axios.create({
  baseURL: apiKeys.VITE_BASE_URL,
  timeout: CONNECTION_TIMEOUT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
});
