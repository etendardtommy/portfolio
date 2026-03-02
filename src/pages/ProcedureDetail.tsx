import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import DOMPurify from 'dompurify';
import { useApi } from '../hooks/useApi';
import './ProcedureDetail.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

type Article = {
    id: number;
    title: string;
    htmlContent: string;
    imageUrl: string | null;
    tags: string[];
    createdAt: string;
};

export function ProcedureDetail() {
    const { id } = useParams<{ id: string }>();
    const { data: article, loading } = useApi<Article>(`/api/articles/${id}`);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const getImageSource = (url: string | null) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        // Construct full URL for backend images
        return `${API_URL}${url}`;
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
                {article.imageUrl && (
                    <div className="article-detail-cover" style={{
                        width: '100%',
                        height: '400px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        marginBottom: '2rem',
                    }}>
                        <img
                            src={getImageSource(article.imageUrl)!}
                            alt={article.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                )}

                <header className="article-detail-header">
                    <h1>{article.title}</h1>
                    <div className="article-detail-meta">
                        <span className="article-detail-date">
                            <Calendar size={14} /> {formatDate(article.createdAt)}
                        </span>
                        <div className="article-detail-tags">
                            {article.tags && article.tags.map(tag => (
                                <span key={tag} className="article-tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                </header>

                <div
                    className="article-detail-content"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.htmlContent || '') }}
                />
            </article>
        </div>
    );
}
