import { Link } from 'react-router-dom';
export default function ProductCard({ product }) {
  return (
    <div className="border rounded-md bg-white overflow-hidden shadow-sm">
      <div className="h-48 bg-gray-100">
        <img src={product.images?.[0] || 'https://via.placeholder.com/600x400?text=No+Image'} alt={product.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-3">
        <h3 className="font-semibold">{product.title}</h3>
        <div className="text-sm text-gray-600">₹{product.final_price} <span className="ml-2 text-xs text-green-600">{product.discount_percent}% off</span></div>
        <div className="mt-2 flex justify-between items-center">
          <Link to={`/products/${product.id}`} className="text-sm text-blue-600">Details</Link>
        </div>
      </div>
    </div>
  );
}
