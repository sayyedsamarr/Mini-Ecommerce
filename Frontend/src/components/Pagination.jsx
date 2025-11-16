import React from 'react';
export default function Pagination({ page, pageSize, total, onPage }) {
  const totalPages = Math.max(1, Math.ceil(total / (pageSize || 12)));
  return (
    <div className="flex items-center gap-3">
      <button className="px-3 py-1 border rounded cursor-pointer" disabled={page<=1} onClick={()=>onPage(page-1)}>Prev</button>
      <span className="text-sm text-gray-600">Page {page} / {totalPages} — {total} results</span>
      <button className="px-3 py-1 border rounded cursor-pointer" disabled={page>=totalPages} onClick={()=>onPage(page+1)}>Next</button>
    </div>
  );
}
