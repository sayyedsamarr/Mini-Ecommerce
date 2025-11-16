import React from 'react'
import { Link } from 'react-router'

const Footer = () => {
     return (
    <footer className="my-5 mt-40 text-sm">
  <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14">
    <div>
      <h1 className="text-2xl mb-2 poppins-extrabold">Mini-Ecommerce</h1>
    </div>
    <div>
      <p className="text-xl poppins-bold mb-5">Company</p>
      <ul className="flex flex-col gap-1 text-gray-600 cursor-pointer">
        <Link to="/"><li>Home</li></Link>
        <Link to="/contact"><li>Contact Us</li></Link>
        
      </ul>
    </div>
    <div>
      <p className="text-xl poppins-bold mb-5">Get In Touch</p>
      <ul className="flex flex-col gap-1 text-gray-600">
        <li>+91 8108-138-743</li>
        <li>Sa707510@gmail.com</li>
      </ul>
    </div>
  </div>
  <hr className="my-5" />
  <p className="text-center text-sm text-gray-600">
      <span className='poppins-extrabold'>© {new Date().getFullYear()}</span> Mini Ecommerce. All rights reserved.
  </p>
</footer>

  )
}

export default Footer