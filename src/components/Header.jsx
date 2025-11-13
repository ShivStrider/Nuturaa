import { useState } from 'react';
import { Bell, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo-nuturaa.svg';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - left-aligned */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity" onClick={closeMobileMenu}>
            <img src={logo} alt="Nuturaa Logo" className="h-7 w-7 sm:h-8 sm:w-8" />
            <span className="text-lg sm:text-xl font-semibold text-stone-900">
              Nuturaa
            </span>
          </Link>

          {/* Desktop Navigation - hidden on mobile */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              to="/"
              className={`font-medium transition-colors pb-1 ${
                isActive('/')
                  ? 'text-stone-900 border-b-2 border-emerald-700'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/forecasts"
              className={`font-medium transition-colors pb-1 ${
                isActive('/forecasts') || location.pathname.startsWith('/forecast/')
                  ? 'text-stone-900 border-b-2 border-emerald-700'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Forecasts
            </Link>
            <Link
              to="/risks"
              className={`font-medium transition-colors pb-1 ${
                isActive('/risks')
                  ? 'text-stone-900 border-b-2 border-emerald-700'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Risks
            </Link>
            <Link
              to="/settings"
              className={`font-medium transition-colors pb-1 ${
                isActive('/settings')
                  ? 'text-stone-900 border-b-2 border-emerald-700'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Settings
            </Link>
          </nav>

          {/* Right side - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button className="relative">
              <Bell className="w-5 h-5 text-stone-600 cursor-pointer hover:text-stone-900 transition-colors" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <span className="text-sm font-medium text-emerald-700">SM</span>
              </div>
              <span className="text-sm font-medium text-stone-700 hidden lg:inline">Sarah Mitchell</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white">
          <nav className="px-4 py-4 space-y-3">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className={`block px-4 py-3 rounded-md font-medium transition-colors ${
                isActive('/')
                  ? 'bg-emerald-50 text-emerald-900 border-l-4 border-emerald-700'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/forecasts"
              onClick={closeMobileMenu}
              className={`block px-4 py-3 rounded-md font-medium transition-colors ${
                isActive('/forecasts') || location.pathname.startsWith('/forecast/')
                  ? 'bg-emerald-50 text-emerald-900 border-l-4 border-emerald-700'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              Forecasts
            </Link>
            <Link
              to="/risks"
              onClick={closeMobileMenu}
              className={`block px-4 py-3 rounded-md font-medium transition-colors ${
                isActive('/risks')
                  ? 'bg-emerald-50 text-emerald-900 border-l-4 border-emerald-700'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              Risk Monitor
            </Link>
            <Link
              to="/settings"
              onClick={closeMobileMenu}
              className={`block px-4 py-3 rounded-md font-medium transition-colors ${
                isActive('/settings')
                  ? 'bg-emerald-50 text-emerald-900 border-l-4 border-emerald-700'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              Settings
            </Link>

            {/* Mobile user info */}
            <div className="pt-3 mt-3 border-t border-stone-200">
              <div className="flex items-center gap-3 px-4 py-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-emerald-700">SM</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-900">Sarah Mitchell</p>
                  <p className="text-xs text-stone-600">Procurement Manager</p>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
