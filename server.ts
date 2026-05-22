import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

// Raw GitHub JSON URLs
const DISEASE_DATA_URL = 'https://raw.githubusercontent.com/NguyenLinhK7/plantclinic/main/json/disease.json';
const PRODUCTS_DATA_URL = 'https://raw.githubusercontent.com/NguyenLinhK7/plantclinic/main/json/products.json';
const SLIDER_DATA_URL = 'https://raw.githubusercontent.com/NguyenLinhK7/plantclinic/main/json/slider.json';

interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes caching
const cacheStore: Record<string, CacheEntry<any>> = {};

async function fetchWithCache<T>(url: string, cacheKey: string): Promise<T> {
    const now = Date.now();
    if (cacheStore[cacheKey] && (now - cacheStore[cacheKey].timestamp < CACHE_TTL)) {
        return cacheStore[cacheKey].data;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6 seconds timeout

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        cacheStore[cacheKey] = {
            data,
            timestamp: now
        };
        return data;
    } catch (error) {
        clearTimeout(timeoutId);
        // If fetch fails but we have stale cache, return it as extreme fallback
        if (cacheStore[cacheKey]) {
            console.warn(`Fetch failed for ${cacheKey}, returning stale cache:`, error);
            return cacheStore[cacheKey].data;
        }
        throw error;
    }
}

async function startServer() {
    const app = express();
    const PORT = 3000;

    // Serve backend API endpoints securely (proxy requests)
    app.get('/api/diseases', async (req, res) => {
        try {
            const data = await fetchWithCache(DISEASE_DATA_URL, 'diseases');
            res.json(data);
        } catch (error) {
            console.error('Error fetching diseases:', error);
            res.status(500).json({ error: 'Failed to fetch diseases data' });
        }
    });

    app.get('/api/products', async (req, res) => {
        try {
            const data = await fetchWithCache(PRODUCTS_DATA_URL, 'products');
            res.json(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: 'Failed to fetch products data' });
        }
    });

    app.get('/api/slider', async (req, res) => {
        try {
            const data = await fetchWithCache(SLIDER_DATA_URL, 'slider');
            res.json(data);
        } catch (error) {
            console.error('Error fetching slider:', error);
            res.status(500).json({ error: 'Failed to fetch slider data' });
        }
    });

    // Vite middleware for development or serving built files in production
    if (process.env.NODE_ENV !== 'production') {
        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'spa',
        });
        app.use(vite.middlewares);
    } else {
        const distPath = path.join(process.cwd(), 'dist');
        app.use(express.static(distPath));
        app.get('*', (req, res) => {
            res.sendFile(path.join(distPath, 'index.html'));
        });
    }

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer();
