import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 select-none">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">About Us</h3>
            <p className="text-sm leading-relaxed">
              We are dedicated to providing the best shopping experience for our customers, offering quality products and exceptional service.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition duration-300">Contact Us</Link></li>
              <li><Link to="/" className="hover:text-white transition duration-300">FAQs</Link></li>
              <li><Link to="/" className="hover:text-white transition duration-300">Shipping</Link></li>
              <li><Link to="/" className="hover:text-white transition duration-300">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaPinterestP size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter for updates and promotions.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Glory All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;