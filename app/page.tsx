import { ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import './Home.css';

export const metadata: Metadata = {
  title: 'Tommy - Développeur Portfolio',
  description: 'Bienvenue sur le portfolio de Tommy. Découvrez mon parcours, mes projets et mes articles techniques.',
};

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container hero-content">
          <div className="hero-text animate-fade-in">
            <h1 className="hero-title">
              Bonjour, je suis <br />
              <span className="gradient-text">Tommy</span> <br />
              Développeur
            </h1>
            <p className="hero-description">
              Bienvenue sur mon portfolio. Découvrez mon parcours, mes projets
              et mes articles techniques. Je développe mes compétences à travers des projets d&apos;infrastructure réels.
            </p>
            <div className="hero-actions animate-fade-in delay-100">
              <Link href="/portfolio" className="btn-primary">
                Voir mes projets <ArrowRight size={18} />
              </Link>
              <a href="/cv.pdf" className="btn-outline" target="_blank" rel="noopener noreferrer">
                Télécharger mon CV <Download size={18} />
              </a>
            </div>
          </div>
          <div className="hero-visual animate-fade-in delay-200">
            <div className="blob-shape"></div>
            <div className="glass-panel profile-placeholder">
              <span>Photo de Profil</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
