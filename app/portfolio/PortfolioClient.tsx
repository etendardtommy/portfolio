'use client';

import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import type { Project } from './page';
import './Portfolio.css';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

interface PortfolioClientProps {
    projects: Project[];
}

export function PortfolioClient({ projects }: PortfolioClientProps) {
    const getImageSource = (url: string | null) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        return `${SERVER_URL}${url}`;
    };

    return (
        <div className="container section">
            <div style={{ textAlign: 'center' }} className="animate-fade-in">
                <h1 className="gradient-text">Mes Projets</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Une sélection de mes travaux récents. Qu&apos;il s&apos;agisse de petites expérimentations
                    ou d&apos;applications complexes, je mets l&apos;accent sur l&apos;expérience utilisateur et la qualité du code.
                </p>
            </div>

            <div className="portfolio-grid animate-fade-in delay-100" style={{ minHeight: '50vh' }}>
                {projects.length === 0 ? (
                    <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-tertiary)' }}>Aucun projet pour le moment.</p>
                ) : (
                    <>
                        {projects.map((project) => (
                            <div key={project.id} className="project-wrapper">
                                <Link href={`/portfolio/${project.id}`} className="project-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                                    <div className="project-image-container">
                                        {project.imageUrl ? (
                                            <img src={getImageSource(project.imageUrl)!} alt={project.title} className="project-image" />
                                        ) : (
                                            <div className="project-placeholder">Image Projet</div>
                                        )}
                                    </div>
                                    <div className="project-content">
                                        <h3 className="project-title">{project.title}</h3>
                                        <p className="project-description">{project.description}</p>
                                        <div className="project-tags">
                                            {project.technologies?.map((tech, index) => (
                                                <span key={index} className="project-tag">{tech}</span>
                                            ))}
                                        </div>
                                        <div className="project-links">
                                            {project.liveUrl && (
                                                <span className="project-link">
                                                    <ExternalLink size={16} /> Site en ligne
                                                </span>
                                            )}
                                            {project.githubUrl && (
                                                <span className="project-link">
                                                    <Github size={16} /> Code source
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
