import { Search, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyWatchlist = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="w-8 h-8 text-stone-400" />
        </div>
        <h3 className="text-xl font-semibold text-stone-900 mb-2">
          Your watchlist is empty
        </h3>
        <p className="text-stone-600 mb-6">
          Add products you frequently purchase to track price trends and get AI-powered buy recommendations.
        </p>
        <Link
          to="/settings"
          className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-6 py-2.5 rounded-md shadow-sm transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Products to Watchlist
        </Link>

        <div className="mt-8 pt-8 border-t border-stone-200">
          <p className="text-sm font-medium text-stone-700 mb-3">Popular products to track:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 bg-stone-100 rounded-md text-sm text-stone-700">🥕 Carrots</span>
            <span className="px-3 py-1 bg-stone-100 rounded-md text-sm text-stone-700">🥔 Potatoes</span>
            <span className="px-3 py-1 bg-stone-100 rounded-md text-sm text-stone-700">🍅 Tomatoes</span>
            <span className="px-3 py-1 bg-stone-100 rounded-md text-sm text-stone-700">🍎 Apples</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyWatchlist;
