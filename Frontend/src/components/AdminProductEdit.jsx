import React, { useState } from 'react';
import { authFetch } from '../ApiBase';
import ImageUploader from './ImageUploader';

export default function AdminProductEdit({ product, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: product.title || '', slug: product.slug || '', description: product.description || '',
    price: product.price || 0, discount_percent: product.discount_percent || 0, category_id: product.category_id || '', images: product.images || []
  });
  const [saving, setSaving] = useState(false);

  function onImagesUploaded(urls){ setForm(f => ({ ...f, images: [...(f.images||[]), ...urls] })); }
  function removeImage(i){ setForm(f=>({ ...f, images: f.images.filter((_,idx)=>idx!==i) })); }

  async function save(){
    setSaving(true);
    try {
      await authFetch(`/api/admin/products/${product.id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
      if (onSaved) onSaved();
      onClose();
    } catch (err) { alert(err.error || err.message || 'Save failed'); } finally { setSaving(false); }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl p-4 rounded">
        <div className="flex justify-between items-center mb-3"><h3 className="text-lg font-medium">Edit Product</h3><button onClick={onClose} className="px-2 py-1">Close</button></div>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">Title</label>
            <input className="w-full border p-2 rounded" value={form.title} onChange={e=>setForm(f=>({...f, title:e.target.value}))}/>
            <label className="block text-sm mt-2">Slug</label>
            <input className="w-full border p-2 rounded" value={form.slug} onChange={e=>setForm(f=>({...f, slug:e.target.value}))}/>
            <div className="flex gap-2 mt-2">
              <input type="number" className="border p-2 rounded w-1/2" value={form.price} onChange={e=>setForm(f=>({...f, price:e.target.value}))}/>
              <input type="number" className="border p-2 rounded w-1/2" value={form.discount_percent} onChange={e=>setForm(f=>({...f, discount_percent:e.target.value}))}/>
            </div>
            <label className="block text-sm mt-2">Description</label>
            <textarea className="w-full border p-2 rounded h-28" value={form.description} onChange={e=>setForm(f=>({...f, description:e.target.value}))}/>
          </div>

          <div>
            <label className="block text-sm mb-2">Images</label>
            <ImageUploader onDone={onImagesUploaded} />
            <div className="mt-3 flex gap-2 flex-wrap">
              {form.images.map((u,i)=>(
                <div key={i} className="w-24 h-24 relative border rounded overflow-hidden">
                  <img src={u} alt="" className="w-full h-full object-cover"/>
                  <button onClick={()=>removeImage(i)} className="absolute top-1 right-1 bg-white rounded-full p-1 text-xs">✕</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={save} className="bg-green-600 text-white px-4 py-2 rounded" disabled={saving}>{saving?'Saving...':'Save'}</button>
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
}
