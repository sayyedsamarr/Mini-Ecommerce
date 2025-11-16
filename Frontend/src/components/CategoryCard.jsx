import React from 'react';
import { Link } from 'react-router-dom';
export default function CategoryCard({ category }) {
  return (
    <div className="p-4 border rounded-md bg-white flex flex-col justify-between">
      <div><h4 className="font-medium">{category.name}</h4></div>
      <div className="mt-3"><Link to={`/products?category=${category.id}`} className="text-sm text-blue-600">View products</Link></div>
    </div>
  );
}
