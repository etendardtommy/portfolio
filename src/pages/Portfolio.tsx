import { ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import './Portfolio.css';

type Project = {
    id: number;
    title: string;
    description: string;
    imageUrl: string | null;
    liveUrl: string | null;
    githubUrl: string | null;
    technologies: string[];
    published: boolean;
};

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

export function Portfolio() {
    const { data, loading } = useApi<Project[]>('/portfolio/projects');
    const projects = data ? data.filter((p) => p.published) : [];

    const getImageSource = (url: string | null) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        // Construct full URL for backend images
        return `${SERVER_URL}${url}`;
    };

    return (
        <div className="container section">
            <div style={{ textAlign: 'center' }} className="animate-fade-in">
                <h1 className="gradient-text">Mes Projets</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Une sélection de mes travaux récents. Qu'il s'agisse de petites expérimentations
                    ou d'applications complexes, je mets l'accent sur l'expérience utilisateur et la qualité du code.
                </p>
            </div>

            <div className="portfolio-grid animate-fade-in delay-100" style={{ minHeight: '50vh' }}>
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="skeleton-card">
                            <div className="skeleton skeleton-image"></div>
                            <div className="skeleton skeleton-title"></div>
                            <div className="skeleton skeleton-text"></div>
                            <div className="skeleton skeleton-text"></div>
                            <div className="skeleton-tags">
                                <div className="skeleton skeleton-tag"></div>
                                <div className="skeleton skeleton-tag"></div>
                            </div>
                        </div>
                    ))
                ) : projects.length === 0 ? (
                    <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-tertiary)' }}>Aucun projet pour le moment.</p>
                ) : (
                    <>
                        {projects.map((project) => (
                            <div key={project.id} className="project-wrapper">
                                <Link to={`/portfolio/${project.id}`} className="project-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
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
                                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                                                    <ExternalLink size={16} /> Site en ligne
                                                </a>
                                            )}
                                            {project.githubUrl && (
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                                                    <Github size={16} /> Code source
                                                </a>
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
