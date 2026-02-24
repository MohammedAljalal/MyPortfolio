import { useState, useEffect } from 'react';
import api from '../utils/api';

const useFetchData = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await api.get(endpoint);
                setData(response.data);
                setError(null);
            } catch (err) {
                console.error(`Error fetching data from ${endpoint}:`, err);
                setError(err.response?.data?.message || 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        if (endpoint) {
            fetchData();
        }
    }, [endpoint]);

    return { data, loading, error };
};

export default useFetchData;
