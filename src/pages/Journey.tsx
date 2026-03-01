import { useState, useEffect } from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import './Journey.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://192.168.1.50:5000';

type TimelineEvent = {
    id: number;
    type: 'work' | 'education';
    date: string;
    title: string;
    subtitle: string;
    description: string;
    skills: string;
};

export function Journey() {
    const [filter, setFilter] = useState<'all' | 'work' | 'education'>('all');
    const [experiences, setExperiences] = useState<TimelineEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const res = await fetch(`${API_URL}/api/experiences`);
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setExperiences(data);
            } catch (err) {
                console.error('Erreur de chargement des expériences', err);
            } finally {
                setLoading(false);
            }
        };
        fetchExperiences();
    }, []);

    const filteredData = experiences.filter(item =>
        filter === 'all' ? true : item.type === filter
    );

    const parseSkills = (skills: string): string[] => {
        if (!skills) return [];
        return skills.split(',').map(s => s.trim()).filter(Boolean);
    };

    return (
        <div className="container section animate-fade-in">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="gradient-text">Mon Parcours</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Découvrez mon évolution académique et professionnelle au fil des années.
                </p>
            </div>

            <div className="timeline-filters">
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

            <div className="timeline-container">
                {loading ? (
                    <p style={{ textAlign: 'center', color: 'var(--text-tertiary)' }}>Chargement...</p>
                ) : filteredData.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'var(--text-tertiary)' }}>Aucune expérience pour le moment.</p>
                ) : filteredData.map((item) => (
                    <div key={item.id} className="timeline-item animate-fade-in">
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
            </div>
        </div>
    );
}
