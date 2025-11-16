import { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import Searchbar from "../components/Searchbar";
import { api } from "../ApiBase";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    api('/api/categories?active=1')
      .then(data => {
        console.log("CATEGORIES API RESPONSE:", data);
        setCategories(data)
      })
      
      .catch(console.error);
  }, []);

  function Searching(q) {
    if (!q) return nav('/products');
    nav(`/products?q=${encodeURIComponent(q)}`);
  }

  return (
    <div className="max-w-8xl mx-auto p-4">
     <div>
      <Hero />
     </div>

      <h2 className="text-xl font-semibold mb-3 my-5">Categories</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((c) => (
          <CategoryCard key={c.id} category={c} />
        ))}
      </div>

      <div className="mt-6 text-right">
        <a className="text-blue-600" href="/products">
          Browse all products →
        </a>
      </div>
      <div>
  
      </div>
    </div>
  );
};

export default Home;
