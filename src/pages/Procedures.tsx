import { useState, useEffect } from 'react';
import { Calendar, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Procedures.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

type Article = {
    id: number;
    title: string;
    excerpt: string | null;
    tags: string[];
    imageUrl: string | null;
    createdAt: string;
    published: boolean;
};

export function Procedures() {
    const [searchTerm, setSearchTerm] = useState('');
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch(`${API_URL}/api/articles`);
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                // Afficher uniquement les articles publiés
                setArticles(data.filter((a: Article) => a.published));
            } catch (err) {
                console.error('Erreur de chargement des articles', err);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

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

    const filteredArticles = articles.filter(article => {
        const searchLower = searchTerm.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(searchLower);
        const matchesTags = article.tags && article.tags.some(t => t.toLowerCase().includes(searchLower));
        return matchesTitle || matchesTags;
    });

    return (
        <div className="container section animate-fade-in">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="gradient-text">Articles & Procédures</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Mes notes techniques, tutoriels et bonnes pratiques. Une base de connaissances
                    que je maintiens pour moi-même et pour partager avec la communauté.
                </p>
            </div>

            <div className="search-container">
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    placeholder="Rechercher un article ou un tag..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="articles-list">
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-tertiary)' }}>
                        Chargement des articles...
                    </div>
                ) : filteredArticles.length > 0 ? (
                    filteredArticles.map(article => (
                        <Link to={`/procedures/${article.id}`} key={article.id} className="article-card animate-fade-in">
                            {article.imageUrl && (
                                <div className="article-cover" style={{
                                    height: '180px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    marginBottom: '1rem',
                                }}>
                                    <img
                                        src={getImageSource(article.imageUrl)!}
                                        alt={article.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            )}
                            <div className="article-meta">
                                <span className="article-date">
                                    <Calendar size={14} /> {formatDate(article.createdAt)}
                                </span>
                            </div>
                            <h2 className="article-title">{article.title}</h2>
                            {article.excerpt && <p className="article-excerpt">{article.excerpt}</p>}

                            <div className="article-footer">
                                <div className="article-tags">
                                    {article.tags && article.tags.map(tag => (
                                        <span key={tag} className="article-tag">{tag}</span>
                                    ))}
                                </div>
                                <span className="read-more">Lire la suite <ArrowRight size={16} /></span>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-tertiary)' }}>
                        Aucun article ne correspond à votre recherche.
                    </div>
                )}
            </div>
        </div>
    );
}
