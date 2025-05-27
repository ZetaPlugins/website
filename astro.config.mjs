// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    integrations: [react()],
    server: {
        allowedHosts: ['zetaplugins.com', 'www.zetaplugins.com', 'mbjan.local'],
    },
    site: 'https://zetaplugins.com',
});