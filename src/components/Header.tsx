
import React, { useState, useEffect } from 'react';
import { Download, Share2, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';

interface HeaderProps {
  onSave?: () => void;
  onPublish?: () => void;
  onShowDashboard?: () => void;
}

const Header = ({ onSave, onPublish, onShowDashboard }: HeaderProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-md" 
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      {/* Decorative top border */}
      <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 bg-size-200 animate-gradient-x"></div>
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105 group-hover:rotate-3">
              <img src="/logo.svg" alt="PageCraft Logo" className="w-full h-full" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                PageCraft
              </h1>
              <p className="text-sm text-gray-600">Build stunning landing pages in minutes</p>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                {onSave && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onSave} 
                    className="hidden sm:flex border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                )}
                {onPublish && (
                  <Button 
                    size="sm" 
                    onClick={onPublish} 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px]"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Publish
                  </Button>
                )}
                <UserMenu onShowDashboard={onShowDashboard || (() => {})} />
              </>
            ) : (
              <Button 
                onClick={() => navigate('/auth')} 
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px]"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-100 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col space-y-3">
              {user ? (
                <>
                  {onSave && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        onSave();
                        setMobileMenuOpen(false);
                      }} 
                      className="w-full justify-center border-purple-200"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  )}
                  {onPublish && (
                    <Button 
                      size="sm" 
                      onClick={() => {
                        onPublish();
                        setMobileMenuOpen(false);
                      }} 
                      className="w-full justify-center bg-gradient-to-r from-purple-500 to-blue-500"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Publish
                    </Button>
                  )}
                  {onShowDashboard && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        onShowDashboard();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-center"
                    >
                      Dashboard
                    </Button>
                  )}
                </>
              ) : (
                <Button 
                  onClick={() => {
                    navigate('/auth');
                    setMobileMenuOpen(false);
                  }} 
                  className="w-full justify-center bg-gradient-to-r from-purple-500 to-blue-500"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
