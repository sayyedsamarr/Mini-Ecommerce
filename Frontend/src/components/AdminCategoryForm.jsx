import React, { useState } from 'react';
import { authFetch } from '../ApiBase';

export default function AdminCategoryForm({ onCreated }) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [saving, setSaving] = useState(false);

  async function create(){
    if (!name || !slug) return alert('name & slug required');
    setSaving(true);
    try {
      await authFetch('/api/admin/categories', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name, slug }) });
      setName(''); setSlug(''); if (onCreated) onCreated();
    } catch (err) { alert(err.error || err.message || 'Failed'); }
    finally { setSaving(false); }
  }

  return (
    <div className="flex gap-2 items-center">
      <input className="border p-2 rounded" placeholder="name"
       value={name} onChange={e=>{  const v = e.target.value; setName(v); setSlug(v.toLowerCase().replace(/\s+/g, '-'));}} />
      <input className="border p-2 rounded" placeholder="slug" value={slug} onChange={e=>setSlug(e.target.value)} />
      <button onClick={create} disabled={saving} className="bg-blue-600 text-white px-3 py-1 rounded">{saving?'Creating...':'Create'}</button>
    </div>
  );
}
