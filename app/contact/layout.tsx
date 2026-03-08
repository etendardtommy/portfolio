import type { Metadata } from 'next';
import ContactPage from './page';

export const metadata: Metadata = {
    title: 'Contact - Tommy',
    description: 'Une question, une proposition de projet ou envie d\'échanger ? N\'hésitez pas à m\'envoyer un message via le formulaire de contact.',
};

export default function ContactLayout() {
    return <ContactPage />;
}
