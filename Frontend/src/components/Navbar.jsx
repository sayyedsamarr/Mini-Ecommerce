import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation();

  // Hide navbar only inside admin dashboard (/admin), not on login page
  const hideNav = location.pathname.startsWith('/admin') &&
                  !['/admin/login', '/admin/oauth'].includes(location.pathname);

  if (hideNav) return null;

  return (
    <nav className='bg-gray-900 text-white poppins-bold'>
      <div className='container mx-auto px-4 py-4 flex items-start justify-between'>
        <Link to='/' className='font-bold text-xl'>Mini E-commerce</Link>

        <div className='flex items-center gap-10'>
          <Link to="/products" className='hover:underline'>Products</Link>
 <Link to="/contact" className='hover:underline'>Contact</Link>
          <a
            href="/admin/login"
            target="_blank"
            rel="noopener noreferrer"
            className='bg-white px-3 text-black py-1 rounded hover:bg-black hover:text-white'
          >
            Admin
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
