import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
    const location = useLocation();
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-primary)', position: 'relative' }}>
            <Navbar />
            {/* The main padding-bottom must be slightly larger than the absolute footer height */}
            <main
                key={location.pathname}
                className="page-transition"
                style={{ flex: '1 0 auto', position: 'relative', display: 'flex', flexDirection: 'column', paddingBottom: '120px' }}
            >
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
