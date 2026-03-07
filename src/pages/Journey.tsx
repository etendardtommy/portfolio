import { useState } from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { experiences as staticExperiences } from '../data/experiences';
import './Journey.css';

interface Experience {
    id: number;
    type: 'work' | 'education';
    date: string;
    title: string;
    subtitle: string;
    description: string;
    skills: string | null;
}

export function Journey() {
    const [filter, setFilter] = useState<'all' | 'work' | 'education'>('all');
    const { data: apiExperiences, loading, error } = useApi<Experience[]>('/experience/public');

    console.log('Journey Debug:', { apiExperiences, loading, error });

    // Use API data if available, otherwise fallback to static data
    const experiences = (apiExperiences && apiExperiences.length > 0) ? apiExperiences : (loading ? [] : staticExperiences);

    const filteredData = experiences.filter(item =>
        filter === 'all' ? true : item.type === filter
    );

    const parseSkills = (skills: string | null): string[] => {
        if (!skills) return [];
        return skills.split(',').map(s => s.trim()).filter(Boolean);
    };

    return (
        <div className="container section">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="animate-fade-in">
                <h1 className="gradient-text">Mon Parcours</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Découvrez mon évolution académique et professionnelle au fil des années.
                </p>
            </div>

            <div className="timeline-filters animate-fade-in delay-100">
                <button
                    className={filter === 'all' ? 'btn-primary' : 'btn-outline'}
                    onClick={() => setFilter('all')}
                >
                    Tout voir
                </button>
                <button
                    className={filter === 'work' ? 'btn-primary' : 'btn-outline'}
                    onClick={() => setFilter('work')}
                >
                    <Briefcase size={16} /> Expériences
                </button>
                <button
                    className={filter === 'education' ? 'btn-primary' : 'btn-outline'}
                    onClick={() => setFilter('education')}
                >
                    <GraduationCap size={16} /> Formations
                </button>
            </div>

            {error && (
                <div style={{
                    padding: '1rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '0.75rem',
                    color: '#ef4444',
                    marginBottom: '2rem',
                    fontSize: '0.875rem',
                    textAlign: 'center'
                }}>
                    <strong>Erreur de connexion :</strong> {error}<br />
                    Affichage des données locales par défaut.
                </div>
            )}

            <div className="timeline-container animate-fade-in delay-200">
                {loading ? (
                    // Skeleton Loaders
                    Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="timeline-item">
                            <div className="timeline-dot skeleton" style={{ backgroundColor: 'var(--border-color)', boxShadow: 'none' }}></div>
                            <div className="glass-panel timeline-content skeleton-card">
                                <span className="timeline-date skeleton" style={{ width: '120px', height: '24px', backgroundColor: 'var(--border-color)', color: 'transparent' }}>--</span>
                                <h3 className="timeline-title skeleton" style={{ width: '60%', height: '28px', backgroundColor: 'var(--border-color)' }}></h3>
                                <div className="timeline-subtitle skeleton" style={{ width: '40%', height: '20px', backgroundColor: 'var(--border-color)', marginTop: '0.5rem' }}></div>
                                <div className="timeline-description skeleton" style={{ width: '100%', height: '60px', backgroundColor: 'var(--border-color)', marginTop: '1rem' }}></div>
                            </div>
                        </div>
                    ))
                ) : filteredData.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'var(--text-tertiary)' }}>Aucune expérience pour le moment.</p>
                ) : (
                    <>
                        {filteredData.map((item) => (
                            <div key={item.id} className="timeline-item">
                                <div className="timeline-dot" style={{
                                    backgroundColor: item.type === 'education' ? 'var(--brand-accent)' : 'var(--brand-primary)',
                                    boxShadow: `0 0 0 2px ${item.type === 'education' ? 'var(--brand-accent)' : 'var(--brand-primary)'}`
                                }}></div>
                                <div className="glass-panel timeline-content">
                                    <span className="timeline-date" style={{
                                        color: item.type === 'education' ? 'var(--brand-accent)' : 'var(--brand-primary)',
                                        backgroundColor: item.type === 'education' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)'
                                    }}>{item.date}</span>
                                    <h3 className="timeline-title">{item.title}</h3>
                                    <div className="timeline-subtitle">{item.subtitle}</div>
                                    <p className="timeline-description">{item.description}</p>
                                    <div className="skill-tags">
                                        {parseSkills(item.skills).map((skill, index) => (
                                            <span key={index} className="skill-tag">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
            {error && !loading && apiExperiences?.length === 0 && (
                <p className="text-center mt-8 text-sm opacity-50 flex items-center justify-center gap-2">
                    Note: Connexion au serveur impossible, affichage des données locales.
                </p>
            )}
        </div>
    );
}
