import React, { useState } from 'react';
import { authFetch } from '../ApiBase';
import ImageUploader from './ImageUploader';

export default function AdminProductForm({ categories=[], onCreated }) {
  const [form, setForm] = useState({ title:'', slug:'', price:0, discount_percent:0, category_id:'', images: [], description: '' });
  const [creating, setCreating] = useState(false);

  function onImages(urls){
    setForm(f=>({...f, images: [...(f.images||[]), ...urls]}));
  }
  function removeImage(i){ setForm(f=>({...f, images: f.images.filter((_,idx)=>idx!==i)})); }

  async function create(){
    if (!form.title || !form.slug || !form.price) return alert('title, slug, price required');
    setCreating(true);
    try {
      await authFetch('/api/admin/products', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
      setForm({ title:'', slug:'', price:0, discount_percent:0, category_id:'', images: [], description: '' });
      if (onCreated) onCreated();
      alert('Product created');
    } catch (err) { alert(err.error || err.message || 'Failed'); } finally { setCreating(false); }
  }

  const finalPrice = (parseFloat(form.price||0) * (1 - (parseFloat(form.discount_percent||0)/100))).toFixed(2);

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Title</label>
          <input className="border p-2 rounded w-full" value={form.title} onChange={e=>setForm(f=>({...f, title:e.target.value}))}/>
          <label className="block text-sm mt-2">Slug</label>
          <input className="border p-2 rounded w-full" value={form.slug} onChange={e=>setForm(f=>({...f, slug:e.target.value}))}/>
          <div className="flex gap-2 mt-2">
            <input type="number" className="border p-2 rounded w-1/2" value={form.price} onChange={e=>setForm(f=>({...f, price:e.target.value}))}/>
            <input type="number" className="border p-2 rounded w-1/2" value={form.discount_percent} onChange={e=>setForm(f=>({...f, discount_percent:e.target.value}))}/>
          </div>
          <div className="mt-2 text-sm">Final price: <strong>₹{finalPrice}</strong></div>
          <label className="block text-sm mt-2">Category</label>
          <select value={form.category_id} onChange={e=>setForm(f=>({...f, category_id: e.target.value}))} className="w-full border p-2 rounded">
            <option value="">Select category</option>
            {categories.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <label className="block text-sm mt-2">Description</label>
          <textarea className="w-full border p-2 rounded h-24" value={form.description} onChange={e=>setForm(f=>({...f, description:e.target.value}))} />
        </div>

        <div>
          <label className="block text-sm mb-2">Images</label>
          <ImageUploader onDone={onImages} />
          <div className="mt-3 flex gap-2 flex-wrap">
            {form.images.map((u,i)=>(
              <div key={i} className="w-24 h-24 relative border rounded overflow-hidden">
                <img src={u} alt="" className="w-full h-full object-cover"/>
                <button onClick={()=>removeImage(i)} className="absolute top-1 right-1 bg-white rounded-full p-1 text-xs">✕</button>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <button onClick={create} className="bg-green-600 text-white px-4 py-2 rounded" disabled={creating}>{creating ? 'Creating...' : 'Create Product'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
