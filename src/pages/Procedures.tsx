import { useState, useEffect } from 'react';
import { Calendar, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Procedures.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://192.168.1.50:5000';

type Article = {
    id: number;
    title: string;
    excerpt: string;
    tags: string;
    created_at: string;
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

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.tags && article.tags.toLowerCase().includes(searchTerm.toLowerCase()))
    );

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
                            <div className="article-meta">
                                <span className="article-date">
                                    <Calendar size={14} /> {formatDate(article.created_at)}
                                </span>
                            </div>
                            <h2 className="article-title">{article.title}</h2>
                            <p className="article-excerpt">{article.excerpt}</p>
                            <div className="article-footer">
                                <div className="article-tags">
                                    {parseTags(article.tags).map(tag => (
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
