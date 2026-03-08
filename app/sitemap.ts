import type { MetadataRoute } from 'next';
import { fetchApi } from '@/lib/api';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';

type Project = { id: number; published: boolean };
type Article = { id: number; published: boolean; createdAt: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const sitemapData: MetadataRoute.Sitemap = [
        { url: `${SITE_URL}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
        { url: `${SITE_URL}/portfolio`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${SITE_URL}/procedures`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${SITE_URL}/journey`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    ];

    try {
        const [projects, articles] = await Promise.all([
            fetchApi<Project[]>('/portfolio/projects').catch(() => []),
            fetchApi<Article[]>('/articles').catch(() => [])
        ]);

        if (projects) {
            projects.filter(p => p.published).forEach(p => {
                sitemapData.push({
                    url: `${SITE_URL}/portfolio/${p.id}`,
                    lastModified: new Date(),
                    changeFrequency: 'monthly',
                    priority: 0.6,
                });
            });
        }

        if (articles) {
            articles.filter(a => a.published).forEach(a => {
                sitemapData.push({
                    url: `${SITE_URL}/procedures/${a.id}`,
                    lastModified: new Date(a.createdAt),
                    changeFrequency: 'monthly',
                    priority: 0.6,
                });
            });
        }
    } catch (error) {
        console.error('Failed to query dynamic routes for sitemap', error);
    }

    return sitemapData;
}
