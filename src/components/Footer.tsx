import React from 'react';
import { Heart, Instagram, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-purple-100 to-blue-100 py-8 border-t border-gray-200 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
      <div className="absolute -top-12 -left-12 w-24 h-24 bg-purple-200 rounded-full opacity-30 blur-xl"></div>
      <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-blue-200 rounded-full opacity-30 blur-xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-3 group">
              <div className="w-10 h-10 flex items-center justify-center mr-3 shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110">
                <img src="/logo.svg" alt="PageCraft Logo" className="w-full h-full" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                PageCraft Technologies
              </span>
            </div>
            <p className="text-gray-600 text-sm max-w-xs text-center md:text-left">
              Creating beautiful landing pages and web experiences that convert visitors into customers.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <a href="https://pagecraft.tech/privacy" className="text-gray-600 hover:text-purple-600 transition-colors hover:translate-x-1 transform duration-200 flex items-center">
                <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                Privacy Policy
              </a>
              <a href="https://pagecraft.tech/terms" className="text-gray-600 hover:text-purple-600 transition-colors hover:translate-x-1 transform duration-200 flex items-center">
                <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                Terms of Service
              </a>
              <a href="https://pagecraft.tech/contact" className="text-gray-600 hover:text-purple-600 transition-colors hover:translate-x-1 transform duration-200 flex items-center">
                <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                Contact Us
              </a>
              <a href="https://pagecraft.tech/faq" className="text-gray-600 hover:text-purple-600 transition-colors hover:translate-x-1 transform duration-200 flex items-center">
                <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                FAQ
              </a>
            </nav>
          </div>
          
          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">Connect With Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/pagecraft.tech" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow us on Instagram"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-purple-600 hover:shadow-lg transition-all duration-300 transform hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/pagecraft-technologies" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow us on GitHub"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-purple-600 hover:shadow-lg transition-all duration-300 transform hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/company/pagecraft-technologies" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Connect with us on LinkedIn"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-purple-600 hover:shadow-lg transition-all duration-300 transform hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-4">
              <a 
                href="https://pagecraft.tech/newsletter" 
                className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Subscribe to Newsletter
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-6 border-t border-purple-200 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 flex items-center mb-4 md:mb-0">
            © {currentYear} PageCraft Technologies. All rights reserved.
            <span className="inline-flex items-center ml-2">
              Made with <Heart className="w-4 h-4 text-red-500 mx-1 animate-pulse" /> in India
            </span>
          </div>
          
          <div className="text-xs text-gray-500">
            PageCraft v1.0.0 | Crafting beautiful pages since 2024
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;