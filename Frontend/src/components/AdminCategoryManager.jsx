// src/components/AdminCategoryManager.jsx
import React, { useState } from "react";
import { authFetch } from "../ApiBase";

export default function AdminCategoryManager({ categories = [], onRefresh }) {
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  function openEdit(c) {
    setEditing(c);
    setName(c.name || "");
    setSlug(c.slug || "");
    setError(null);
  }

  function closeEdit() {
    setEditing(null);
    setName("");
    setSlug("");
    setError(null);
  }

  async function saveEdit() {
    setError(null);
    if (!name.trim() || !slug.trim()) {
      setError("Name and slug required.");
      return;
    }
    setSaving(true);
    try {
      await authFetch(`/api/admin/categories/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), slug: slug.trim() }),
      });
      if (onRefresh) onRefresh();
      closeEdit();
    } catch (e) {
      console.error(e);
      setError(e.error || e.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(c) {
    try {
      await authFetch(`/api/admin/categories/${c.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !c.active }),
      });
      if (onRefresh) onRefresh();
    } catch (e) {
      console.error(e);
      alert(e.error || "Failed to update");
    }
  }

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-3">
        {categories.map((c) => (
          <div key={c.id} style={{ padding: 12, border: "1px solid #eee", borderRadius: 6, background: "#fff" }}>
            <div style={{ fontWeight: 600 }}>{c.name}</div>
            <div style={{ fontSize: 13, color: "#666" }}>{c.slug}</div>
            <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
              <button onClick={() => openEdit(c)} style={{ padding: "6px 10px" }}>Edit</button>
              <button onClick={() => toggleActive(c)} style={{ padding: "6px 10px" }}>
                {c.active ? "Activate" : "Deactivate"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit modal area */}
      {editing && (
        <div style={{
          position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.4)", zIndex: 60
        }}>
          <div style={{ width: 520, background: "#fff", padding: 16, borderRadius: 8 }}>
            <h3>Edit Category</h3>
            <div style={{ marginTop: 8 }}>
              <label style={{ fontSize: 13 }}>Name</label>
              <input value={name} onChange={e => setName(e.target.value)} style={{ width: "100%", padding: 8, marginTop: 6 }} />
            </div>
            <div style={{ marginTop: 8 }}>
              <label style={{ fontSize: 13 }}>Slug</label>
              <input value={slug} onChange={e => setSlug(e.target.value)} style={{ width: "100%", padding: 8, marginTop: 6 }} />
            </div>

            {error && <div style={{ color: "crimson", marginTop: 8 }}>{error}</div>}

            <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button onClick={closeEdit}>Cancel</button>
              <button onClick={saveEdit} disabled={saving} style={{ padding: "8px 12px" }}>{saving ? "Saving..." : "Save"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
