import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { models, API_URL, type ModelField } from '../config';
import { useAuth } from '../../context/AuthContext';
import { HtmlEditor } from '../components/HtmlEditor';
import './AdminCrud.css';

interface Item {
    id: number;
    [key: string]: unknown;
}

export function AdminCrud() {
    const { model } = useParams<{ model: string }>();
    const { token } = useAuth();
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [error, setError] = useState('');

    const config = model ? models[model] : null;

    useEffect(() => {
        if (model) fetchItems();
    }, [model]);

    async function fetchItems() {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/${model}`);
            if (res.ok) {
                setItems(await res.json());
            }
        } catch (err) {
            console.error('Erreur fetch:', err);
        } finally {
            setLoading(false);
        }
    }

    function openCreateModal() {
        setEditingItem(null);
        setFormData({});
        setError('');
        setShowModal(true);
    }

    function openEditModal(item: Item) {
        setEditingItem(item);
        const data: Record<string, string> = {};
        config?.fields.forEach((f) => {
            data[f.name] = String(item[f.name] ?? '');
        });
        setFormData(data);
        setError('');
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
        setEditingItem(null);
        setFormData({});
        setError('');
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        const method = editingItem ? 'PUT' : 'POST';
        const url = editingItem
            ? `${API_URL}/api/${model}/${editingItem.id}`
            : `${API_URL}/api/${model}`;

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Erreur serveur');
            }

            closeModal();
            fetchItems();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Erreur');
        }
    }

    async function handleDelete(id: number) {
        if (!confirm('Supprimer cet élément ?')) return;

        try {
            const res = await fetch(`${API_URL}/api/${model}/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                fetchItems();
            }
        } catch (err) {
            console.error('Erreur delete:', err);
        }
    }

    function handleImageUpload(fieldName: string) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            const fd = new FormData();
            fd.append('image', file);

            try {
                const res = await fetch(`${API_URL}/api/upload`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                    body: fd,
                });

                if (res.ok) {
                    const data = await res.json();
                    setFormData((prev) => ({ ...prev, [fieldName]: `${API_URL}${data.url}` }));
                }
            } catch (err) {
                console.error('Erreur upload:', err);
            }
        };
        input.click();
    }

    if (!config || !model) {
        return <div className="admin-crud"><p>Modèle introuvable.</p></div>;
    }

    function renderField(field: ModelField) {
        const value = formData[field.name] || '';

        if (field.type === 'select' && field.options) {
            return (
                <select
                    id={field.name}
                    value={value}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    required={field.required}
                >
                    <option value="">— Choisir —</option>
                    {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            );
        }

        if (field.type === 'boolean') {
            return (
                <label className="admin-checkbox-label">
                    <input
                        id={field.name}
                        type="checkbox"
                        checked={value === 'true'}
                        onChange={(e) => setFormData({ ...formData, [field.name]: String(e.target.checked) })}
                    />
                    {value === 'true' ? 'Oui' : 'Non'}
                </label>
            );
        }

        if (field.type === 'html') {
            return (
                <HtmlEditor
                    value={value}
                    onChange={(html) => setFormData({ ...formData, [field.name]: html })}
                />
            );
        }

        if (field.type === 'textarea') {
            return (
                <textarea
                    id={field.name}
                    value={value}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    placeholder={field.placeholder}
                    rows={4}
                />
            );
        }

        if (field.type === 'image') {
            return (
                <div className="admin-image-field">
                    <input
                        id={field.name}
                        type="text"
                        value={value}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        placeholder={field.placeholder}
                    />
                    <button type="button" className="admin-upload-btn" onClick={() => handleImageUpload(field.name)}>
                        📁 Upload
                    </button>
                    {value && <img src={value} alt="Preview" className="admin-image-preview" />}
                </div>
            );
        }

        return (
            <input
                id={field.name}
                type={field.type === 'url' ? 'url' : field.type === 'number' ? 'number' : 'text'}
                value={value}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                placeholder={field.placeholder}
                required={field.required}
            />
        );
    }

    return (
        <div className="admin-crud">
            <div className="admin-page-header">
                <div>
                    <h1>{config.icon} {config.labelPlural}</h1>
                    <p>{items.length} élément{items.length !== 1 ? 's' : ''}</p>
                </div>
                <button onClick={openCreateModal} className="admin-btn-primary">
                    + Ajouter un {config.label.toLowerCase()}
                </button>
            </div>

            {loading ? (
                <div className="admin-loading">
                    <div className="admin-spinner" />
                </div>
            ) : items.length === 0 ? (
                <div className="admin-empty">
                    <span className="admin-empty-icon">{config.icon}</span>
                    <p>Aucun {config.label.toLowerCase()} pour l'instant</p>
                    <button onClick={openCreateModal} className="admin-btn-primary">
                        Créer le premier
                    </button>
                </div>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                {config.fields.slice(0, 4).map((f) => (
                                    <th key={f.name}>{f.label}</th>
                                ))}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td className="admin-td-id">{item.id}</td>
                                    {config.fields.slice(0, 4).map((f) => (
                                        <td key={f.name}>
                                            {f.type === 'image' && item[f.name] ? (
                                                <img src={String(item[f.name])} alt="" className="admin-table-img" />
                                            ) : (
                                                <span className="admin-td-text">{String(item[f.name] ?? '—')}</span>
                                            )}
                                        </td>
                                    ))}
                                    <td className="admin-td-actions">
                                        <button onClick={() => openEditModal(item)} className="admin-btn-edit" title="Modifier">
                                            ✏️
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="admin-btn-delete" title="Supprimer">
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="admin-modal-overlay" onClick={closeModal}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h2>{editingItem ? 'Modifier' : 'Ajouter'} un {config.label.toLowerCase()}</h2>
                            <button onClick={closeModal} className="admin-modal-close">✕</button>
                        </div>

                        {error && <div className="admin-login-error">{error}</div>}

                        <form onSubmit={handleSubmit} className="admin-modal-form">
                            {config.fields.map((field) => (
                                <div className="admin-form-group" key={field.name}>
                                    <label htmlFor={field.name}>{field.label}</label>
                                    {renderField(field)}
                                </div>
                            ))}
                            <div className="admin-modal-actions">
                                <button type="button" onClick={closeModal} className="admin-btn-cancel">
                                    Annuler
                                </button>
                                <button type="submit" className="admin-btn-primary">
                                    {editingItem ? 'Sauvegarder' : 'Créer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
