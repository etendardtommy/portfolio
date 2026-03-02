import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import './ProjectDetail.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

type Project = {
    id: number;
    title: string;
    description: string;
    imageUrl: string | null;
    liveUrl: string | null;
    githubUrl: string | null;
    technologies: string[];
};

export function ProjectDetail() {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(`${API_URL}/api/portfolio/projects/${id}`, {
                    headers: { 'x-site-id': '1' }
                });
                if (!res.ok) throw new Error('Not found');
                const data = await res.json();
                setProject(data);
            } catch (err) {
                console.error('Erreur chargement projet', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    const getImageSource = (url: string | null) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        return `${API_URL}${url}`;
    };

    if (loading) {
        return (
            <div className="container section" style={{ textAlign: 'center', padding: '4rem' }}>
                <p style={{ color: 'var(--text-tertiary)' }}>Chargement...</p>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="container section" style={{ textAlign: 'center', padding: '4rem' }}>
                <h2>Projet introuvable</h2>
                <Link to="/portfolio" className="back-link">← Retour au portfolio</Link>
            </div>
        );
    }

    return (
        <div className="container section animate-fade-in">
            <Link to="/portfolio" className="back-link">
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
