export interface Experience {
    id: number;
    type: 'work' | 'education';
    date: string;
    title: string;
    subtitle: string;
    description: string;
    skills: string;
}

export const experiences: Experience[] = [
    {
        id: 1,
        type: 'education',
        date: '2021 - 2023',
        title: 'Master en Informatique',
        subtitle: 'Université de Technologie',
        description: 'Spécialisation en Développement Web et Intelligence Artificielle. Apprentissage approfondi des algorithmes, structures de données et architectures logicielles.',
        skills: 'Algorithmique, Java, Python, SQL'
    },
    {
        id: 2,
        type: 'work',
        date: '2023 - Présent',
        title: 'Développeur Fullstack',
        subtitle: 'Agence Web Digitale',
        description: 'Conception et développement d\'applications web modernes avec React et NestJS. Mise en place de pipelines CI/CD et gestion de bases de données.',
        skills: 'React, Node.js, NestJS, Docker'
    }
];
