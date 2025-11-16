import React from 'react';
export default function AdminProductList({ products=[], onEdit, onToggle }) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {products.map(p=>(
        <div key={p.id} className="border rounded p-3 bg-white">
          <div className="h-40 bg-gray-100 mb-2 overflow-hidden">
            <img src={p.images?.[0] || 'https://via.placeholder.com/400x300'} alt="" className="object-cover w-full h-full"/>
          </div>
          <h3 className="font-semibold">{p.title}</h3>
          <div className="text-sm text-gray-600">₹{p.final_price} <span className="ml-2 text-xs text-green-600">{p.discount_percent}%</span></div>
          <div className="mt-3 flex gap-2">
            <button onClick={()=>onEdit(p)} className="px-3 py-1 border rounded">Edit</button>
            <button onClick={()=>onToggle(p)} className={`px-3 py-1 rounded ${p.active ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}>{p.active ? 'Deactivate':'Activate'}</button>
          </div>
        </div>
      ))}
    </div>
  );
}
