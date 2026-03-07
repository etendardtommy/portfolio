import { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import './Contact.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://192.168.1.50:5000';

export function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const res = await fetch(`${API_URL}/api/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Erreur envoi');

            setStatus('sent');
            setFormData({ name: '', email: '', message: '' });
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="container section">
            <div style={{ textAlign: 'center' }} className="animate-fade-in">
                <h1 className="gradient-text">Contactez-moi</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Une question, une proposition de projet ou simplement envie d'échanger ?
                    N'hésitez pas à m'envoyer un message via le formulaire.
                </p>
            </div>

            <div className="contact-wrapper">
                <div className="contact-info animate-fade-in delay-100">
                    <p className="contact-text">
                        Je suis toujours ouvert aux nouvelles opportunités professionnelles,
                        en particulier celles impliquant des technologies modernes comme React,
                        TypeScript et l'écosystème Node.js.
                    </p>

                    <div className="contact-methods">
                        <a href="mailto:contact@example.com" className="contact-method">
                            <div className="method-icon">
                                <Mail size={24} />
                            </div>
                            <div className="method-details">
                                <h3>Email</h3>
                                <p>contact@example.com</p>
                            </div>
                        </a>

                        <div className="contact-method" style={{ cursor: 'default' }}>
                            <div className="method-icon">
                                <MapPin size={24} />
                            </div>
                            <div className="method-details">
                                <h3>Localisation</h3>
                                <p>France, Remote friendly</p>
                            </div>
                        </div>
                    </div>
                </div>

                <form
                    className="glass-panel contact-form animate-fade-in delay-200"
                    onSubmit={handleSubmit}
                >
                    <h2>Envoyer un message</h2>

                    {status === 'sent' && (
                        <div className="contact-success">
                            ✅ Message envoyé avec succès ! Je reviendrai vers vous rapidement.
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="contact-error">
                            ❌ Erreur lors de l'envoi. Veuillez réessayer.
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Nom complet</label>
                        <input
                            type="text"
                            id="name"
                            className="form-input"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Adresse email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea
                            id="message"
                            className="form-textarea"
                            placeholder="Votre message..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ marginTop: '1rem', width: '100%' }}
                        disabled={status === 'sending'}
                    >
                        {status === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'} <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
}
