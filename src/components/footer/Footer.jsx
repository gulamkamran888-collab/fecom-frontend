import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* ABOUT */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">ABOUT</h4>
          <p className="text-sm leading-relaxed">
            Fcom is a modern ecommerce platform built with the MERN stack,
            delivering fast and seamless online shopping experiences.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">QUICK LINKS</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/cart" className="hover:text-white transition-colors">
              Cart
            </Link>
            <Link to="/login" className="hover:text-white transition-colors">
              Login
            </Link>
          </div>
        </div>

        {/* HELP */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">HELP</h4>
          <div className="flex flex-col gap-2 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              Payments
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Shipping
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Returns
            </a>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">CONTACT</h4>
          <div className="text-sm space-y-2">
            <p>Email: fsstecom@gmail.com</p>
            <p>Phone: +91 8793368447</p>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="border-t border-slate-700 py-5 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Fcom. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
