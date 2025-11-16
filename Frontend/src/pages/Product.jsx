import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FiltersPanel from '../components/FiltersPanel';
import Pagination from '../components/Pagination';
import SearchBar from '../components/Searchbar';
import { api } from '../ApiBase';

export default function Products(){
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const price_min = searchParams.get('price_min') || '';
  const price_max = searchParams.get('price_max') || '';
  const min_discount = searchParams.get('min_discount') || '';
  const sort = searchParams.get('sort') || 'newest';
  const page = Number(searchParams.get('page') || 1);
  const pageSize = Number(searchParams.get('pageSize') || 6);

  useEffect(()=>{ api('/api/categories?active=1').then(setCategories).catch(console.error); }, []);

  useEffect(()=> {
    async function load(){
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (q) params.set('q', q);
        if (category) params.set('category', category);
        if (price_min) params.set('price_min', price_min);
        if (price_max) params.set('price_max', price_max);
        if (min_discount) params.set('min_discount', min_discount);
        if (sort) params.set('sort', sort);
        params.set('page', page);
        params.set('pageSize', pageSize);
        const data = await api('/api/products?' + params.toString());
        setProducts(data.items || []);
        setTotal(data.total || 0);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }
    load();
  }, [q, category, price_min, price_max, min_discount, sort, page, pageSize]);

  function applyFilters(filters){
    const params = new URLSearchParams(Object.fromEntries(searchParams.entries()));
    // set/clear filters
    if (filters.category !== undefined) { if (filters.category) params.set('category', filters.category); else params.delete('category'); }
    ['price_min','price_max','min_discount','sort'].forEach(k => {
      if (filters[k] !== undefined && filters[k] !== '') params.set(k, filters[k]); else params.delete(k);
    });
    params.set('page', 1);
    setSearchParams(params);
  }

  function onSearch(qstr){
    const params = new URLSearchParams(Object.fromEntries(searchParams.entries()));
    if (qstr) params.set('q', qstr); else params.delete('q');
    params.set('page', 1);
    setSearchParams(params);
  }

  function onPage(p){ const params = new URLSearchParams(Object.fromEntries(searchParams.entries())); params.set('page', p); setSearchParams(params); }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-4"><SearchBar initial={q} onSearch={onSearch} /></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside><FiltersPanel categories={categories} initial={{category, price_min, price_max, min_discount, sort}} onApply={applyFilters} /></aside>
        <main className="md:col-span-3">
          <div className="mb-3 flex justify-between items-center">
            <div className="text-sm text-gray-600">Showing {products.length} of {total} results</div>
            <div>
              <select className="border p-2 rounded" value={sort} onChange={e=>{ const p = new URLSearchParams(Object.fromEntries(searchParams.entries())); p.set('sort', e.target.value); p.set('page',1); setSearchParams(p); }}>
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low → High</option>
                <option value="price_desc">Price: High → Low</option>
                <option value="discount_desc">Discount: High → Low</option>
              </select>
            </div>
          </div>

          {loading ? <div className="p-8 text-center">Loading…</div> :
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
              <div className="mt-6 flex justify-between items-center">
                <Pagination page={page} pageSize={pageSize} total={total} onPage={onPage} />
              </div>
            </>
          }
        </main>
      </div>
    </div>
  );
}
