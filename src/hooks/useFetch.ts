import { useEffect, useState } from 'react';

type UseFetchReturn<T> = [T | null, boolean, string | null];

const useFetch = <T>(url: string, options?: RequestInit): UseFetchReturn<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        setData(null);
        setError(null);
        setLoading(true);

        const fetchData = async () => {
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result: T = await response.json();
                if (isMounted) {
                    setData(result);
                }
            } catch (error: any) {
                if (isMounted) {
                    setError(error.message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url, options]);

    return [data, loading, error];
};

export default useFetch;
