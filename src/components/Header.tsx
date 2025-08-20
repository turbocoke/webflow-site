import React from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, MenuIcon } from 'lucide-react';
const Header = () => {
  return <header className="bg-gray-900 bg-opacity-80 backdrop-blur-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white">
            <span className="text-[#65e8a4]">Voice</span>Chat
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
            <Link to="/" className="text-gray-300 hover:text-white">
              Voices
            </Link>
            <Link to="/" className="text-gray-300 hover:text-white">
              Pricing
            </Link>
            <Link to="/" className="text-gray-300 hover:text-white">
              About
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center text-gray-300 hover:text-white">
              <UserIcon className="w-5 h-5 mr-2" />
              Sign In
            </button>
            <button className="bg-[#65e8a4] hover:bg-[#41966a] text-black px-4 py-2 rounded-md transition-colors">
              Get Started
            </button>
            <button className="md:hidden text-gray-300">
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;