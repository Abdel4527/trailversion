import React from "react";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandInstagram, TbBrandMeta, TbBrandLinkedin } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Ai-commerce</h3>
            <p className="text-sm mb-4">
              Be the first to hear about new products, exclusive events, and online offers.
            </p>
            <p className="text-sm mb-4">Sign up and get 10% off your first order.</p>
            <form className="flex flex-col md:flex-row items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2 md:mb-0 md:mr-2"
              />
              <button
                type="submit"
                className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-md transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/collections/all?gender=Men&category=Top Wear"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Men's Top Wear
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/all?gender=Women&category=Top Wear"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Women's Top Wear
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/all?gender=Men&category=Bottom Wear"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Men's Bottom Wear
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/all?gender=Women&category=Bottom Wear"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Women's Bottom Wear
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="hover:text-emerald-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-emerald-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-emerald-500 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-emerald-500 transition-colors">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media and Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-emerald-500 transition-colors"
              >
                <TbBrandMeta className="w-6 h-6" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-emerald-500 transition-colors"
              >
                <RiTwitterXLine className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-emerald-500 transition-colors"
              >
                <TbBrandInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-emerald-500 transition-colors"
              >
                <TbBrandLinkedin className="w-6 h-6" />
              </a>
            </div>
            <p className="text-sm">Call Us</p>
            <p className="flex items-center">
              <FiPhoneCall className="inline-block mr-2" />
              0123-233-222
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-700 pt-6">
        <p className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;