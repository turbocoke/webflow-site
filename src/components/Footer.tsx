import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              <span className="text-[#65e8a4]">Voice</span>Chat
            </h3>
            <p className="text-gray-400">
              Experience unique conversations with your favorite celebrities
              using our advanced Gabber voice technology.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-[#65e8a4]">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[#65e8a4]">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[#65e8a4]">
                  Voice Library
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[#65e8a4]">
                  Custom Scenarios
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-[#65e8a4]">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[#65e8a4]">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[#65e8a4]">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[#65e8a4]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-[#65e8a4]">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[#65e8a4]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[#65e8a4]">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[#65e8a4]">
                  GDPR
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} VoiceChat. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;