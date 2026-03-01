import { useRef, useState } from 'react';
import './HtmlEditor.css';

interface HtmlEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export function HtmlEditor({ value, onChange }: HtmlEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [mode, setMode] = useState<'visual' | 'html'>('visual');
    const fileInputRef = useRef<HTMLInputElement>(null);

    function exec(command: string, val?: string) {
        document.execCommand(command, false, val);
        syncContent();
    }

    function syncContent() {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    }

    function handleHtmlChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        onChange(e.target.value);
    }

    function switchToVisual() {
        setMode('visual');
        setTimeout(() => {
            if (editorRef.current) {
                editorRef.current.innerHTML = value;
            }
        }, 0);
    }

    function switchToHtml() {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
        setMode('html');
    }

    function handleImportHtml() {
        fileInputRef.current?.click();
    }

    function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const html = event.target?.result as string;
            // Extraire le contenu du <body> s'il y a un document HTML complet
            const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
            const content = bodyMatch ? bodyMatch[1] : html;
            onChange(content.trim());
            if (mode === 'visual' && editorRef.current) {
                editorRef.current.innerHTML = content.trim();
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    }

    function insertLink() {
        const url = prompt('URL du lien :');
        if (url) exec('createLink', url);
    }

    return (
        <div className="html-editor">
            <div className="editor-toolbar">
                <div className="toolbar-group">
                    <button type="button" onClick={() => exec('bold')} title="Gras"><b>B</b></button>
                    <button type="button" onClick={() => exec('italic')} title="Italique"><i>I</i></button>
                    <button type="button" onClick={() => exec('underline')} title="Souligné"><u>U</u></button>
                </div>
                <div className="toolbar-group">
                    <button type="button" onClick={() => exec('formatBlock', 'h2')} title="Titre H2">H2</button>
                    <button type="button" onClick={() => exec('formatBlock', 'h3')} title="Titre H3">H3</button>
                    <button type="button" onClick={() => exec('formatBlock', 'p')} title="Paragraphe">P</button>
                </div>
                <div className="toolbar-group">
                    <button type="button" onClick={() => exec('insertUnorderedList')} title="Liste à puces">• Liste</button>
                    <button type="button" onClick={() => exec('insertOrderedList')} title="Liste numérotée">1. Liste</button>
                </div>
                <div className="toolbar-group">
                    <button type="button" onClick={insertLink} title="Insérer un lien">🔗</button>
                    <button type="button" onClick={() => exec('formatBlock', 'pre')} title="Bloc de code">&lt;/&gt;</button>
                </div>
                <div className="toolbar-group toolbar-right">
                    <button type="button" onClick={handleImportHtml} className="toolbar-import" title="Importer un fichier HTML">
                        📄 Importer HTML
                    </button>
                    <button
                        type="button"
                        onClick={mode === 'visual' ? switchToHtml : switchToVisual}
                        className={`toolbar-mode ${mode === 'html' ? 'active' : ''}`}
                    >
                        {mode === 'visual' ? '< >' : '👁️ Visuel'}
                    </button>
                </div>
            </div>

            {mode === 'visual' ? (
                <div
                    ref={editorRef}
                    className="editor-content"
                    contentEditable
                    onInput={syncContent}
                    onBlur={syncContent}
                    dangerouslySetInnerHTML={{ __html: value }}
                    suppressContentEditableWarning
                />
            ) : (
                <textarea
                    className="editor-source"
                    value={value}
                    onChange={handleHtmlChange}
                    spellCheck={false}
                />
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept=".html,.htm"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
            />
        </div>
    );
}
