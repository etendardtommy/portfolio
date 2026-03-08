'use client';

import { useState } from 'react';
import { Calendar, Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Article } from './page';
import './Procedures.css';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

interface ProceduresClientProps {
    articles: Article[];
}

export function ProceduresClient({ articles }: ProceduresClientProps) {
    const [searchTerm, setSearchTerm] = useState('');

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
        return `${SERVER_URL}${url}`;
    };

    const filteredArticles = articles.filter(article => {
        const searchLower = searchTerm.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(searchLower);
        const matchesTags = article.tags && article.tags.some(t => t.toLowerCase().includes(searchLower));
        return matchesTitle || matchesTags;
    });

    return (
        <div className="container section">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="animate-fade-in">
                <h1 className="gradient-text">Articles & Procédures</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Mes notes techniques, tutoriels et bonnes pratiques. Une base de connaissances
                    que je maintiens pour moi-même et pour partager avec la communauté.
                </p>
            </div>

            <div className="search-container animate-fade-in delay-100">
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    placeholder="Rechercher un article ou un tag..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="articles-list animate-fade-in delay-200" style={{ minHeight: '50vh' }}>
                {filteredArticles.length > 0 ? (
                    <>
                        {filteredArticles.map(article => (
                            <div key={article.id} className="article-wrapper">
                                <Link href={`/procedures/${article.id}`} className="article-card" style={{ display: 'block' }}>
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
                            </div>
                        ))}
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-tertiary)' }}>
                        Aucun article ne correspond à votre recherche.
                    </div>
                )}
            </div>
        </div>
    );
}
