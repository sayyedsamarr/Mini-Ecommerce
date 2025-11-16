import React, { useEffect, useState } from 'react';
import AdminCategoryForm from '../components/AdminCategoryForm';
import AdminCategoryManager from '../components/AdminCategoryManager';
import AdminProductForm from '../components/AdminProductForm';
import AdminProductList from '../components/AdminProductList';
import AdminProductEdit from '../components/AdminProductEdit';
import { api, authFetch } from '../ApiBase';
import { setAuthToken } from '../ApiBase';

export default function AdminDashboard() {
  const [cats, setCats] = useState([]);
  const [prods, setProds] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    load()
  }, []);

 async function load() {
  try {
    const c = await api('/api/categories');   // FIXED
    setCats(c);
    const p = await authFetch('/api/admin/products');  // FIXED
    setProds(p);

  } catch (err) {
    console.error(err);
    setError(err?.error || err?.message || 'Failed to load');
  }
}


  function onEdit(p) { setEditing(p); }
  async function onToggleProduct(p) {
    try {
      await authFetch(`/api/admin/products/${p.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: !p.active }) });
      await load();
    } catch (err) { alert(err.error || err.message || 'Failed'); }
  }

  function logout() {
    setAuthToken('');
    window.location.href = '/admin/login';
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div><button onClick={logout} className="px-3 py-1 border rounded">Logout</button></div>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <section className="mb-6">
        <h2 className="text-lg mb-2">Create Category</h2>
        <AdminCategoryForm onCreated={load} />
      </section>

      <section className="mb-6">
        <h2 className="text-lg mb-2">Category Manager</h2>
        <AdminCategoryManager categories={cats} onRefresh={load} />
      </section>

      <section className="mb-6">
        <h2 className="text-lg mb-2">Create Product</h2>
        <AdminProductForm categories={cats} onCreated={load} />
      </section>

      <section>
        <h2 className="text-lg mb-3">Products</h2>
        <AdminProductList products={prods} onEdit={onEdit} onToggle={onToggleProduct} />
      </section>

      {editing && <AdminProductEdit product={editing} onClose={() => setEditing(null)} onSaved={load} />}
    </div>
  );
}
