import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import './ProcedureDetail.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://192.168.1.50:5000';

type Article = {
    id: number;
    title: string;
    content: string;
    tags: string;
    created_at: string;
};

export function ProcedureDetail() {
    const { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await fetch(`${API_URL}/api/articles/${id}`);
                if (!res.ok) throw new Error('Not found');
                const data = await res.json();
                setArticle(data);
            } catch (err) {
                console.error('Erreur chargement article', err);
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [id]);

    const parseTags = (tags: string): string[] => {
        if (!tags) return [];
        return tags.split(',').map(s => s.trim()).filter(Boolean);
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="container section" style={{ textAlign: 'center', padding: '4rem' }}>
                <p style={{ color: 'var(--text-tertiary)' }}>Chargement...</p>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="container section" style={{ textAlign: 'center', padding: '4rem' }}>
                <h2>Article introuvable</h2>
                <Link to="/procedures" className="back-link">← Retour aux articles</Link>
            </div>
        );
    }

    return (
        <div className="container section animate-fade-in">
            <Link to="/procedures" className="back-link">
                <ArrowLeft size={18} /> Retour aux articles
            </Link>

            <article className="article-detail">
                <header className="article-detail-header">
                    <h1>{article.title}</h1>
                    <div className="article-detail-meta">
                        <span className="article-detail-date">
                            <Calendar size={14} /> {formatDate(article.created_at)}
                        </span>
                        <div className="article-detail-tags">
                            {parseTags(article.tags).map(tag => (
                                <span key={tag} className="article-tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                </header>

                <div
                    className="article-detail-content"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </article>
        </div>
    );
}
