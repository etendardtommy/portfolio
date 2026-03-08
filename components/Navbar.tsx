'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import './Navbar.css';

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="navbar glass-panel">
            <div className="container nav-content">
                <Link href="/" className="nav-logo">
                    <span className="gradient-text">Tommy.</span>
                </Link>
                <div className="nav-links">
                    <Link href="/" className={pathname === '/' ? 'nav-link active' : 'nav-link'}>Accueil</Link>
                    <Link href="/journey" className={pathname === '/journey' ? 'nav-link active' : 'nav-link'}>Parcours</Link>
                    <Link href="/portfolio" className={pathname.startsWith('/portfolio') ? 'nav-link active' : 'nav-link'}>Projets</Link>
                    <Link href="/procedures" className={pathname.startsWith('/procedures') ? 'nav-link active' : 'nav-link'}>Articles</Link>
                    <Link href="/contact" className={pathname === '/contact' ? 'nav-link active' : 'nav-link'}>Contact</Link>
                </div>
                <ThemeToggle />
            </div>
        </nav>
    );
}
