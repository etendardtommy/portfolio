/**
 * Configuration de l'admin panel.
 * Modifier ce fichier pour adapter l'admin à n'importe quel projet.
 */

export const API_URL = import.meta.env.VITE_API_URL || 'http://192.168.1.50:5000';

export interface ModelField {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'url' | 'email' | 'number' | 'boolean' | 'image' | 'select' | 'html';
    required?: boolean;
    placeholder?: string;
    options?: { value: string; label: string }[];
}

export interface ModelConfig {
    label: string;
    labelPlural: string;
    icon: string;
    fields: ModelField[];
}

export const models: Record<string, ModelConfig> = {
    projects: {
        label: 'Projet',
        labelPlural: 'Projets',
        icon: '🚀',
        fields: [
            { name: 'title', label: 'Titre', type: 'text', required: true, placeholder: 'Nom du projet' },
            { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Description du projet...' },
            { name: 'image_url', label: 'Image', type: 'image', placeholder: 'URL de l\'image' },
            { name: 'demo_url', label: 'Lien démo', type: 'url', placeholder: 'https://demo.exemple.com' },
            { name: 'github_url', label: 'Lien GitHub', type: 'url', placeholder: 'https://github.com/...' },
            { name: 'tags', label: 'Tags', type: 'text', placeholder: 'React, Node.js, Docker...' },
        ],
    },
    experiences: {
        label: 'Expérience',
        labelPlural: 'Parcours',
        icon: '📋',
        fields: [
            {
                name: 'type', label: 'Type', type: 'select', required: true, options: [
                    { value: 'work', label: '💼 Expérience pro' },
                    { value: 'education', label: '🎓 Formation' },
                ]
            },
            { name: 'date', label: 'Période', type: 'text', required: true, placeholder: '2023 - Présent' },
            { name: 'title', label: 'Titre', type: 'text', required: true, placeholder: 'Développeur Full Stack' },
            { name: 'subtitle', label: 'Entreprise / École', type: 'text', placeholder: 'Nom de l\'entreprise' },
            { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Description du poste...' },
            { name: 'skills', label: 'Compétences', type: 'text', placeholder: 'React, TypeScript, Node.js...' },
        ],
    },
    messages: {
        label: 'Message',
        labelPlural: 'Messages',
        icon: '✉️',
        fields: [
            { name: 'name', label: 'Nom', type: 'text', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'message', label: 'Message', type: 'textarea', required: true },
            { name: 'read', label: 'Lu', type: 'boolean' },
        ],
    },
    articles: {
        label: 'Article',
        labelPlural: 'Articles',
        icon: '📝',
        fields: [
            { name: 'title', label: 'Titre', type: 'text', required: true, placeholder: 'Titre de l\'article' },
            { name: 'excerpt', label: 'Résumé', type: 'textarea', placeholder: 'Bref résumé de l\'article...' },
            { name: 'content', label: 'Contenu', type: 'html' },
            { name: 'tags', label: 'Tags', type: 'text', placeholder: 'DevOps, React, Docker...' },
            { name: 'published', label: 'Publié', type: 'boolean' },
        ],
    },
};
