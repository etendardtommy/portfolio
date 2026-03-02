import { useState, useEffect, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface UseApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export function useApi<T>(endpoint: string): UseApiResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            // Unauthenticated requests for the public portfolio via Site Isolation
            const headers: HeadersInit = {
                'x-site-id': '1' // Mapped directly to site ID 1 (Portfolio Tommy)
            };

            const response = await fetch(`${API_URL}${endpoint}`, { headers });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const json = await response.json();
            setData(json);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
            console.error(`useApi Error on ${endpoint}:`, err);
        } finally {
            setLoading(false);
        }
    }, [endpoint]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}
