import { useEffect, useState } from 'react';

interface ServerCountProps {
    pluginId: string;
}

export default function ServerCount({ pluginId }: ServerCountProps) {
    const [serverCount, setServerCount] = useState<number | null>(null);

    useEffect(() => {
        const cacheKey = `bstats-server-count:${pluginId}`;

        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            setServerCount(Number(cached));
        }

        const fetchServerCount = async () => {
            try {
                const res = await fetch(
                    `https://bstats.org/api/v1/plugins/${pluginId}/charts/servers/data`
                );
                if (!res.ok) throw new Error('Failed to fetch server count');
                const data = await res.json();
                const latestServerCount = data[0][1];
                setServerCount(latestServerCount);
                localStorage.setItem(cacheKey, latestServerCount.toString());
            } catch (error) {
                console.error(
                    'Error fetching server count from bStats:',
                    error
                );
            }
        };

        fetchServerCount();
    }, [pluginId]);

    return (
        <>
            {serverCount !== null ? serverCount.toLocaleString() : 'Loading...'}
        </>
    );
}
