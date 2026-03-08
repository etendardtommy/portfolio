import { fetchApi } from '@/lib/api';
import { PortfolioClient } from './PortfolioClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Mes Projets - Tommy',
    description: 'Une sélection de mes travaux récents. Projets web, applications et expérimentations.',
};

export type Project = {
    id: number;
    title: string;
    description: string;
    imageUrl: string | null;
    liveUrl: string | null;
    githubUrl: string | null;
    technologies: string[];
    published: boolean;
};

export default async function PortfolioPage() {
    let projects: Project[] = [];

    try {
        const data = await fetchApi<Project[]>('/portfolio/projects');
        projects = data ? data.filter((p) => p.published) : [];
    } catch {
        projects = [];
    }

    return <PortfolioClient projects={projects} />;
}
