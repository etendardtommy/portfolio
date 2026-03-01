import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { models } from '../config';

export function AdminLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <h2 className="admin-logo">⚡ Admin</h2>
                    <p className="admin-user-email">{user?.email}</p>
                </div>

                <nav className="admin-nav">
                    <NavLink to="/admin" end className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
                        📊 Dashboard
                    </NavLink>
                    {Object.entries(models).map(([key, model]) => (
                        <NavLink
                            key={key}
                            to={`/admin/${key}`}
                            className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
                        >
                            {model.icon} {model.labelPlural}
                        </NavLink>
                    ))}
                    <NavLink to="/admin/database" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
                        🗄️ Base de données
                    </NavLink>
                </nav>

                <div className="admin-sidebar-footer">
                    <NavLink to="/" className="admin-nav-link">
                        🌐 Voir le site
                    </NavLink>
                    <button onClick={handleLogout} className="admin-logout-btn">
                        🚪 Déconnexion
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    );
}
