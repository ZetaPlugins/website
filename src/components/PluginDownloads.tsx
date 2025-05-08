import { useEffect, useState } from 'react';

interface PluginDownloadsProps {
    slug: string;
}

export default function PluginDownloads({ slug }: PluginDownloadsProps) {
    const [downloads, setDownloads] = useState<number | null>(null);

    useEffect(() => {
        const cacheKey = `modrinth-downloads:${slug}`;

        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            setDownloads(Number(cached));
        }

        const fetchDownloads = async () => {
            try {
                const res = await fetch(
                    `https://api.modrinth.com/v2/project/${slug}`
                );
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setDownloads(data.downloads);
                localStorage.setItem(cacheKey, data.downloads.toString());
            } catch (error) {
                console.error('Error fetching plugin data:', error);
            }
        };

        fetchDownloads();
    }, [slug]);

    return (
        <>{downloads !== null ? downloads.toLocaleString() : 'Loading...'}</>
    );
}
