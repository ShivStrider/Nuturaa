import { Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - left-aligned */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Nuturaa Logo" className="h-8 w-8" />
            <span className="text-xl font-semibold text-stone-900">
              Nuturaa
            </span>
          </Link>

          {/* Navigation - left of center */}
          <nav className="flex items-center gap-8">
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
              Risk Monitor
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

          {/* User menu - right-aligned */}
          <div className="flex items-center gap-3">
            <button className="relative">
              <Bell className="w-5 h-5 text-stone-600 cursor-pointer hover:text-stone-900 transition-colors" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <span className="text-sm font-medium text-emerald-700">JB</span>
              </div>
              <span className="text-sm font-medium text-stone-700">John Bailey</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
