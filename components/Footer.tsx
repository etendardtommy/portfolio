import { Github, Linkedin } from 'lucide-react';
import './Footer.css';

export function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <p>&copy; {new Date().getFullYear()} Tommy. Tous droits réservés.</p>
                <div className="social-links">
                    <a href="https://github.com/etendardtommy" aria-label="GitHub" className="social-icon" target="_blank" rel="noopener noreferrer"><Github size={20} /></a>
                    <a href="https://www.linkedin.com/in/tommy-etendard-90355a3a4/" aria-label="LinkedIn" className="social-icon" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
                </div>
            </div>
        </footer>
    );
}
