import { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function Portfolio() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(`${API_URL}/api/portfolio/projects`, {
                    headers: { 'x-site-id': '1' } // Assuming siteId 1 for the main portfolio
                });
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                // Afficher uniquement les projets publiés
                setProjects(data.filter((p: Project) => p.published));
            } catch (err) {
                console.error('Erreur de chargement des projets', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const getImageSource = (url: string | null) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        // Construct full URL for backend images
        return `${API_URL}${url}`;
    };

    return (
        <div className="container section animate-fade-in">
            <div style={{ textAlign: 'center' }}>
                <h1 className="gradient-text">Mes Projets</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Une sélection de mes travaux récents. Qu'il s'agisse de petites expérimentations
                    ou d'applications complexes, je mets l'accent sur l'expérience utilisateur et la qualité du code.
                </p>
            </div>

            <div className="portfolio-grid">
                {loading ? (
                    <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>Chargement des projets...</p>
                ) : projects.length === 0 ? (
                    <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-tertiary)' }}>Aucun projet pour le moment.</p>
                ) : projects.map((project) => (
                    <Link key={project.id} to={`/portfolio/${project.id}`} className="project-card animate-fade-in" style={{ textDecoration: 'none', color: 'inherit' }}>
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
                ))}
            </div>
        </div>
    );
}
