import { fetchApi } from '@/lib/api';
import { ArrowLeft, Calendar } from 'lucide-react';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import type { Metadata } from 'next';
import './ProcedureDetail.css';

export const dynamicParams = false;

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

type Article = {
    id: number;
    title: string;
    excerpt: string | null;
    htmlContent: string;
    imageUrl: string | null;
    tags: string[];
    createdAt: string;
};

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
    try {
        const articles = await fetchApi<{ id: number }[]>('/articles');
        if (!articles || articles.length === 0) {
            return [{ id: '1' }];
        }
        return articles.map((article) => ({ id: String(article.id) }));
    } catch (e) {
        console.error("fetch API failed in generateStaticParams procedures", e);
        return [{ id: '1' }];
    }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { id } = await params;
    try {
        const article = await fetchApi<Article>(`/articles/${id}`);
        const ogImage = getImageSource(article.imageUrl);
        const description = article.excerpt || `Article technique : ${article.title}`;

        return {
            title: `${article.title} - Tommy`,
            description: description,
            openGraph: {
                title: article.title,
                description: description,
                images: ogImage ? [{ url: ogImage }] : [],
                type: 'article',
            },
            twitter: {
                card: 'summary_large_image',
                title: article.title,
                description: description,
                images: ogImage ? [ogImage] : [],
            }
        };
    } catch {
        return { title: 'Article introuvable - Tommy' };
    }
}

function getImageSource(url: string | null) {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `${SERVER_URL}${url}`;
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export default async function ProcedureDetailPage({ params }: { params: Params }) {
    const { id } = await params;
    let article: Article | null = null;

    try {
        article = await fetchApi<Article>(`/articles/${id}`);
    } catch {
        article = null;
    }

    if (!article) {
        return (
            <div className="container section" style={{ textAlign: 'center', padding: '4rem' }}>
                <h2>Article introuvable</h2>
                <Link href="/procedures" className="back-link">← Retour aux articles</Link>
            </div>
        );
    }

    // Sanitize HTML content server-side
    const sanitizedHtml = DOMPurify.sanitize(article.htmlContent || '');

    return (
        <div className="container section animate-fade-in">
            <Link href="/procedures" className="back-link">
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
                    dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                />
            </article>
        </div>
    );
}
