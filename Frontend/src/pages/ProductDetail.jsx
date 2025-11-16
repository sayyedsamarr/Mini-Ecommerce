import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../ApiBase';

import ImageGallery from '../components/ImageGallery';
import Breadcrumbs from '../components/Breadcumbs';

export default function ProductDetail(){
  const { id } = useParams();
  const [p, setP] = useState(null);
  useEffect(()=>{ api('/api/products/' + id).then(data=>setP(data)).catch(console.error); }, [id]);

  if (!p) return <div className="p-8 text-center">Loading…</div>;

  const finalPrice = p.final_price ?? ((parseFloat(p.price) * (1 - (p.discount_percent||0)/100)).toFixed(2));

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Breadcrumbs items={[
        { label: 'Home', to: '/' },
        p.Category ? { label: p.Category.name, to: `/products?category=${p.Category.id}` } : null,
        { label: p.title }
      ].filter(Boolean)} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div><ImageGallery images={p.images || []} /></div>
        <div>
          <h1 className="text-2xl font-semibold mb-2">{p.title}</h1>
          <div className="text-gray-600 mb-3">Category: {p.Category?.name || '-'}</div>
          <div className="mb-3">
            <div className="text-lg"><span className="line-through text-gray-500 mr-2">₹{p.price}</span><span className="font-bold">₹{finalPrice}</span></div>
            <div className="text-sm text-green-600 mt-1">Discount: {p.discount_percent || 0}%</div>
          </div>
          <div className="text-gray-700 mb-6">{p.description}</div>
        </div>
      </div>
    </div>
  );
}
