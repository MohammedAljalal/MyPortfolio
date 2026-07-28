import axios from 'axios';
import { API_URL } from './env';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // For HttpOnly cookies
});

// Interceptor for retries
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error.config;
        
        // Don't retry on client errors (4xx) except perhaps 429
        if (error.response && error.response.status >= 400 && error.response.status < 500 && error.response.status !== 429) {
            return Promise.reject(error);
        }
        
        config.__retryCount = config.__retryCount || 0;
        
        if (config.__retryCount >= 3) {
            return Promise.reject(error);
        }
        
        config.__retryCount += 1;
        
        // Exponential backoff
        const backoff = new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000 * Math.pow(2, config.__retryCount - 1)); // 1s, 2s, 4s
        });
        
        await backoff;
        
        return api(config);
    }
);

export default api;
