import { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import './Portfolio.css';

type Project = {
    id: number;
    title: string;
    description: string;
    image_url: string;
    demo_url: string;
    github_url: string;
    tags: string[];
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function Portfolio() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(`${API_URL}/api/projects`);
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setProjects(data);
            } catch (err) {
                console.error('Erreur de chargement des projets', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

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
                    <div key={project.id} className="project-card animate-fade-in">
                        <div className="project-image-container">
                            {project.image_url ? (
                                <img src={project.image_url} alt={project.title} className="project-image" />
                            ) : (
                                <div className="project-placeholder">Image Projet</div>
                            )}
                        </div>
                        <div className="project-content">
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-description">{project.description}</p>
                            <div className="project-tags">
                                {project.tags?.map((tag, index) => (
                                    <span key={index} className="project-tag">{tag}</span>
                                ))}
                            </div>
                            <div className="project-links">
                                {project.demo_url && (
                                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="project-link">
                                        <ExternalLink size={16} /> Site en ligne
                                    </a>
                                )}
                                {project.github_url && (
                                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="project-link">
                                        <Github size={16} /> Code source
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
