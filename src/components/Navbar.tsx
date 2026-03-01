import { NavLink } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import './Navbar.css';

export function Navbar() {
    return (
        <nav className="navbar glass-panel">
            <div className="container nav-content">
                <NavLink to="/" className="nav-logo">
                    <span className="gradient-text">Tommy.</span>
                </NavLink>
                <div className="nav-links">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>Accueil</NavLink>
                    <NavLink to="/journey" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Parcours</NavLink>
                    <NavLink to="/portfolio" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Projets</NavLink>
                    <NavLink to="/procedures" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Articles</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink>
                </div>
                <ThemeToggle />
            </div>
        </nav>
    );
}
