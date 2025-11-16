import React, { useState, useEffect } from 'react';

export default function FiltersPanel({ categories=[], initial={}, onApply }) {
  const [category, setCategory] = useState(initial.category||'');
  const [priceMin, setPriceMin] = useState(initial.price_min||'');
  const [priceMax, setPriceMax] = useState(initial.price_max||'');
  const [minDiscount, setMinDiscount] = useState(initial.min_discount||'');
  const [sort, setSort] = useState(initial.sort||'newest');

  useEffect(()=>{ setCategory(initial.category||''); setPriceMin(initial.price_min||''); setPriceMax(initial.price_max||''); setMinDiscount(initial.min_discount||''); setSort(initial.sort||'newest'); }, [initial]);

  function apply(){ onApply({ category, price_min: priceMin||undefined, price_max: priceMax||undefined, min_discount: minDiscount||undefined, sort }); }
  function clearAll(){ setCategory(''); setPriceMin(''); setPriceMax(''); setMinDiscount(''); setSort('newest'); onApply({}); }

  return (
    <div className="bg-white border rounded p-4 space-y-3">
      <div><label className="text-sm">Category</label>
        <select className="w-full border rounded p-2 mt-1" value={category} onChange={e=>setCategory(e.target.value)}>
          <option value="">All categories</option>
          {categories.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div><label className="text-sm">Price min</label><input className="w-full border rounded p-2 mt-1" value={priceMin} onChange={e=>setPriceMin(e.target.value)} type="number" /></div>
        <div><label className="text-sm">Price max</label><input className="w-full border rounded p-2 mt-1" value={priceMax} onChange={e=>setPriceMax(e.target.value)} type="number" /></div>
      </div>

      <div><label className="text-sm">Min discount (%)</label><input className="w-full border rounded p-2 mt-1" value={minDiscount} onChange={e=>setMinDiscount(e.target.value)} type="number" /></div>

      <div><label className="text-sm">Sort</label>
        <select className="w-full border rounded p-2 mt-1" value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
          <option value="discount_desc">Discount: High → Low</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button onClick={apply} className="bg-indigo-600 text-white px-3 py-1 rounded cursor-pointer">Apply</button>
        <button onClick={clearAll} className="border px-3 py-1 rounded cursor-pointer">Clear</button>
      </div>
    </div>
  );
}
