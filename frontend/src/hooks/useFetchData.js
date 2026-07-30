import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api';

/**
 * A wrapper around TanStack Query's useQuery.
 * Keeps the same { data, loading, error, refetch } API so all existing
 * components work without modification.
 */
const useFetchData = (endpoint, initialData = null) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: [endpoint],
        queryFn: async () => {
            const res = await api.get(endpoint);
            return res.data;
        }
    });

    return {
        data: data ?? initialData,
        loading: isLoading,
        error: error ? (error.response?.data?.message || error.message || 'An error occurred') : null,
        refetch,
    };
};

export default useFetchData;

