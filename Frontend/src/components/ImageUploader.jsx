import React, { useState, useRef } from 'react';
import { API_BASE, getAuthToken } from '../ApiBase';

export default function ImageUploader({ onDone }) {
  const [selected, setSelected] = useState([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  function onFiles(e){
    const files = Array.from(e.target.files || []);
    setSelected(prev => [...prev, ...files.map(f=>({ file:f, preview: URL.createObjectURL(f) }))]);
    e.target.value = '';
  }
  function removeLocal(i){
    const it = selected[i]; if (it && it.preview) URL.revokeObjectURL(it.preview);
    setSelected(prev => prev.filter((_,idx)=>idx!==i));
  }

  async function uploadAll(){
    if (!selected.length) return alert('Select images first');
    setUploading(true);
    try {
      const token = getAuthToken(); if (!token) throw new Error('Not logged in');
      const urls = [];
      for (const it of selected) {
        const fd = new FormData(); fd.append('image', it.file);
        const res = await fetch(`${API_BASE}/api/admin/upload`, {
            method: 'POST',
             headers: { Authorization: "Bearer " + token },
             body: fd
             });
        if (!res.ok) throw new Error('Upload failed');
        const json = await res.json(); if (json.url) urls.push(json.url);
      }
      if (onDone) onDone(urls);
      selected.forEach(s=>s.preview && URL.revokeObjectURL(s.preview));
      setSelected([]);
      alert('Uploaded');
    } catch (err) {
      alert(err.message || 'Upload failed');
    } finally { setUploading(false); }
  }

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" multiple onChange={onFiles} className="mb-2" />
      {selected.length>0 && (
        <>
          <div className="flex gap-2 flex-wrap mb-2">
            {selected.map((s, i)=>(
              <div key={i} className="w-24 h-24 border rounded overflow-hidden relative">
                <img src={s.preview} alt="" className="w-full h-full object-cover" />
                <button className="absolute top-1 right-1 bg-white rounded-full p-1 text-xs" onClick={()=>removeLocal(i)}>✕</button>
              </div>
            ))}
          </div>
          <div className="flex gap-2"><button onClick={uploadAll} disabled={uploading} className="bg-indigo-600 text-white px-3 py-1 rounded">{uploading?'Uploading...':'Upload selected'}</button>
            <button onClick={()=>{ selected.forEach(s=> s.preview && URL.revokeObjectURL(s.preview)); setSelected([]); if(inputRef.current) inputRef.current.value=''; }} className="border px-3 py-1 rounded">Clear</button>
          </div>
        </>
      )}
    </div>
  );
}
