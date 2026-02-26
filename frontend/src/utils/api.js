import axios from 'axios';

export const SERVER_URL = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace('/api', '')
    : 'https://myportfolio-012f.onrender.com';

export const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `${SERVER_URL}${url}`;
};

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://myportfolio-012f.onrender.com/api',
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Check if we are not already on the login page to avoid infinite redirect loop
            if (window.location.pathname !== '/login' && !window.location.pathname.startsWith('/admin')) {
                // Optionally handle unauthorized from public side, but usually this is for admin
                // localStorage.removeItem('token');
                // window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
