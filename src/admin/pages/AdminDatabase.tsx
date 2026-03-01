import { useEffect, useState } from 'react';
import { API_URL } from '../config';
import { useAuth } from '../../context/AuthContext';
import './AdminDatabase.css';

interface TableInfo {
    name: string;
    count: number;
}

interface ColumnInfo {
    column_name: string;
    data_type: string;
    is_nullable: string;
    column_default: string | null;
}

interface TableData {
    table: string;
    columns: ColumnInfo[];
    rows: Record<string, unknown>[];
    total: number;
}

export function AdminDatabase() {
    const { token } = useAuth();
    const [tables, setTables] = useState<TableInfo[]>([]);
    const [selectedTable, setSelectedTable] = useState<string | null>(null);
    const [tableData, setTableData] = useState<TableData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTables();
    }, []);

    async function fetchTables() {
        try {
            const res = await fetch(`${API_URL}/api/admin/tables`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) setTables(await res.json());
        } catch (err) {
            console.error('Erreur:', err);
        } finally {
            setLoading(false);
        }
    }

    async function selectTable(name: string) {
        setSelectedTable(name);
        setTableData(null);
        try {
            const res = await fetch(`${API_URL}/api/admin/tables/${name}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) setTableData(await res.json());
        } catch (err) {
            console.error('Erreur:', err);
        }
    }

    function formatValue(val: unknown): string {
        if (val === null || val === undefined) return '—';
        if (typeof val === 'boolean') return val ? '✅' : '❌';
        const str = String(val);
        if (str.length > 80) return str.slice(0, 80) + '…';
        return str;
    }

    return (
        <div className="admin-database">
            <div className="admin-page-header">
                <div>
                    <h1>🗄️ Base de données</h1>
                    <p>Explorer les tables PostgreSQL</p>
                </div>
            </div>

            {loading ? (
                <div className="admin-loading"><div className="admin-spinner" /></div>
            ) : (
                <div className="db-layout">
                    <div className="db-sidebar">
                        <h3>Tables</h3>
                        {tables.map((t) => (
                            <button
                                key={t.name}
                                className={`db-table-btn ${selectedTable === t.name ? 'active' : ''}`}
                                onClick={() => selectTable(t.name)}
                            >
                                <span>{t.name}</span>
                                <span className="db-count">{t.count}</span>
                            </button>
                        ))}
                    </div>

                    <div className="db-content">
                        {!selectedTable ? (
                            <div className="db-empty">
                                <p>← Sélectionnez une table pour voir son contenu</p>
                            </div>
                        ) : !tableData ? (
                            <div className="admin-loading"><div className="admin-spinner" /></div>
                        ) : (
                            <>
                                <div className="db-table-header">
                                    <h2>{tableData.table}</h2>
                                    <span className="db-row-count">{tableData.total} ligne{tableData.total !== 1 ? 's' : ''}</span>
                                </div>

                                <div className="db-columns-info">
                                    {tableData.columns.map((col) => (
                                        <span key={col.column_name} className="db-column-badge">
                                            {col.column_name} <small>({col.data_type})</small>
                                        </span>
                                    ))}
                                </div>

                                {tableData.rows.length === 0 ? (
                                    <p style={{ color: 'var(--text-tertiary)', padding: '2rem', textAlign: 'center' }}>Table vide</p>
                                ) : (
                                    <div className="admin-table-wrapper">
                                        <table className="admin-table">
                                            <thead>
                                                <tr>
                                                    {tableData.columns.map((col) => (
                                                        <th key={col.column_name}>{col.column_name}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tableData.rows.map((row, i) => (
                                                    <tr key={i}>
                                                        {tableData.columns.map((col) => (
                                                            <td key={col.column_name}>
                                                                <span className="admin-td-text">{formatValue(row[col.column_name])}</span>
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
