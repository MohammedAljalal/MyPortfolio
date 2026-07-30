import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

// In-memory cache for ultra-fast access
const memoryCache = {};

const useFetchData = (endpoint, initialData = null) => {
    // 1. Try memory cache first
    // 2. Try session storage next
    const getCachedData = () => {
        if (memoryCache[endpoint]) return memoryCache[endpoint];
        try {
            const cached = sessionStorage.getItem(`cache_${endpoint}`);
            if (cached) {
                const parsed = JSON.parse(cached);
                memoryCache[endpoint] = parsed;
                return parsed;
            }
        } catch (e) {
            console.error('Error reading cache', e);
        }
        return initialData;
    };

    // Evaluate cache initially
    const [cachedData] = useState(() => getCachedData());

    // If we have cached data, we can start with loading=false
    const [data, setData] = useState(cachedData);
    const [loading, setLoading] = useState(!cachedData);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (isBackground = false) => {
        // If it's a background fetch (revalidation), don't trigger loading state
        if (!isBackground) {
            setLoading(true);
        }
        setError(null);
        try {
            const res = await api.get(endpoint);
            
            // Save to caches
            memoryCache[endpoint] = res.data;
            try {
                sessionStorage.setItem(`cache_${endpoint}`, JSON.stringify(res.data));
            } catch (e) {
                 console.error('Error writing to cache', e);
            }
            
            // Only trigger re-render if data actually changed to avoid UI flashing
            // For a simple approach, just set it. React handles same-value optimizations partially,
            // but for deep objects it triggers render. It's usually fine for this use case.
            setData(res.data);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'An error occurred');
        } finally {
            if (!isBackground) {
                setLoading(false);
            }
        }
    }, [endpoint]);

    useEffect(() => {
        // If we have cached data, fetch in the background to revalidate (Stale-While-Revalidate)
        // This makes the UI instant, but keeps data fresh.
        if (cachedData) {
            fetchData(true);
        } else {
            fetchData(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData]);

    return { data, loading, error, refetch: () => fetchData(false) };
};

export default useFetchData;
