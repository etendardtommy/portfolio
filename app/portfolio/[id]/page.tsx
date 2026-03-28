import { fetchApi } from '@/lib/api';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import './ProjectDetail.css';

export const dynamicParams = false;

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

type Project = {
    id: number;
    title: string;
    description: string;
    imageUrl: string | null;
    liveUrl: string | null;
    githubUrl: string | null;
    technologies: string[];
};

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
    try {
        const projects = await fetchApi<{ id: number }[]>('/portfolio/projects');
        if (!projects || projects.length === 0) {
            return [{ id: '1' }];
        }
        return projects.map((project) => ({ id: String(project.id) }));
    } catch (e) {
        console.error("fetch API failed in generateStaticParams", e);
        return [{ id: '1' }];
    }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { id } = await params;
    try {
        const project = await fetchApi<Project>(`/portfolio/projects/${id}`);
        const ogImage = getImageSource(project.imageUrl);

        return {
            title: `${project.title} - Tommy`,
            description: project.description,
            openGraph: {
                title: project.title,
                description: project.description,
                images: ogImage ? [{ url: ogImage }] : [],
                type: 'article',
            },
            twitter: {
                card: 'summary_large_image',
                title: project.title,
                description: project.description,
                images: ogImage ? [ogImage] : [],
            }
        };
    } catch {
        return { title: 'Projet introuvable - Tommy' };
    }
}

function getImageSource(url: string | null) {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `${SERVER_URL}${url}`;
}

export default async function ProjectDetailPage({ params }: { params: Params }) {
    const { id } = await params;
    let project: Project | null = null;

    try {
        project = await fetchApi<Project>(`/portfolio/projects/${id}`);
    } catch {
        project = null;
    }

    if (!project) {
        return (
            <div className="container section" style={{ textAlign: 'center', padding: '4rem' }}>
                <h2>Projet introuvable</h2>
                <Link href="/portfolio" className="back-link">← Retour au portfolio</Link>
            </div>
        );
    }

    return (
        <div className="container section animate-fade-in">
            <Link href="/portfolio" className="back-link">
                <ArrowLeft size={18} /> Retour au portfolio
            </Link>

            <article className="project-detail">
                {project.imageUrl && (
                    <div className="project-detail-cover">
                        <img
                            src={getImageSource(project.imageUrl)!}
                            alt={project.title}
                            className="project-detail-image"
                        />
                    </div>
                )}

                <header className="project-detail-header">
                    <h1>{project.title}</h1>
                    <div className="project-detail-meta">
                        <div className="project-detail-tags">
                            {project.technologies?.map(tech => (
                                <span key={tech} className="project-tag">{tech}</span>
                            ))}
                        </div>
                    </div>
                </header>

                <div className="project-detail-content">
                    <p className="project-detail-description">{project.description}</p>
                </div>

                <div className="project-detail-actions">
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary project-action-link">
                            <ExternalLink size={20} /> Visiter le site
                        </a>
                    )}
                    {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline project-action-link">
                            <Github size={20} /> Code source
                        </a>
                    )}
                </div>
            </article>
        </div>
    );
}
