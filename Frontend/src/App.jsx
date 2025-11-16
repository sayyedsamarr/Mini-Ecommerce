// App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './components/Contact';

import Home from './Pages/Home';
import Products from './Pages/Product';
import ProductDetail from './Pages/ProductDetail';
import AdminLogin from './Pages/AdminLogin';
import AdminOAuthHandler from './Pages/AdminOAuthHandler';
import AdminDashboard from './Pages/AdminDashboard';

import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const { pathname } = useLocation();
  const hideFooter = pathname.startsWith('/admin');

  return (
    <>
      <div>
        <Navbar />

        <main className="container mx-auto px-4 py-6">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path='/contact' element={<Contact/>}/>

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/oauth" element={<AdminOAuthHandler />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>

          {/* Footer must be outside <Routes>. Hide on admin routes if desired. */}
          {!hideFooter && <Footer />}
        </main>
      </div>
    </>
  );
}
