
import { Link } from 'react-router-dom';
export default function Breadcrumbs({ items=[] }) {
  return (
    <nav className="text-sm text-gray-600 mb-3" aria-label="breadcrumb">
      <ol className="flex items-center gap-2">
        {items.map((it, idx)=> (
          <li key={idx} className="flex items-center">
            {it.to ? <Link to={it.to} className="text-blue-600 hover:underline">{it.label}</Link> : <span>{it.label}</span>}
            {idx < items.length-1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
