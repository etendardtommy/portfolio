import { fetchApi } from '@/lib/api';
import { ProceduresClient } from './ProceduresClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Articles & Procédures - Tommy',
    description: 'Mes notes techniques, tutoriels et bonnes pratiques. Une base de connaissances partagée avec la communauté.',
};

export type Article = {
    id: number;
    title: string;
    excerpt: string | null;
    tags: string[];
    imageUrl: string | null;
    createdAt: string;
    published: boolean;
};

export default async function ProceduresPage() {
    let articles: Article[] = [];

    try {
        const data = await fetchApi<Article[]>('/articles');
        articles = data ? data.filter((a) => a.published) : [];
    } catch {
        articles = [];
    }

    return <ProceduresClient articles={articles} />;
}
