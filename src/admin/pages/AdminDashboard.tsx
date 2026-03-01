import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { models, API_URL } from '../config';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';

export function AdminDashboard() {
    const { token } = useAuth();
    const [counts, setCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        async function fetchCounts() {
            const results: Record<string, number> = {};
            for (const key of Object.keys(models)) {
                try {
                    const res = await fetch(`${API_URL}/api/${key}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (res.ok) {
                        const data = await res.json();
                        results[key] = data.length;
                    }
                } catch {
                    results[key] = 0;
                }
            }
            setCounts(results);
        }
        fetchCounts();
    }, [token]);

    return (
        <div className="admin-dashboard">
            <div className="admin-page-header">
                <h1>Dashboard</h1>
                <p>Vue d'ensemble de votre contenu</p>
            </div>

            <div className="admin-cards-grid">
                {Object.entries(models).map(([key, model]) => (
                    <Link to={`/admin/${key}`} key={key} className="admin-dashboard-card">
                        <div className="admin-card-icon">{model.icon}</div>
                        <div className="admin-card-info">
                            <h3>{model.labelPlural}</h3>
                            <span className="admin-card-count">
                                {counts[key] !== undefined ? counts[key] : '—'}
                            </span>
                        </div>
                        <div className="admin-card-arrow">→</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
