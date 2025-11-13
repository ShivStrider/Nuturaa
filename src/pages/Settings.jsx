import { useState } from 'react';
import { Search, Plus, X, GripVertical, Star, Bell } from 'lucide-react';
import { products } from '../data/mockData';
import Badge from '../components/ui/Badge';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('watchlist');
  const [searchQuery, setSearchQuery] = useState('');
  const [watchlist, setWatchlist] = useState(products.slice(0, 4));
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // All available products
  const availableProducts = products.filter(
    p => !watchlist.find(w => w.id === p.id)
  );

  // Filter available products by search
  const filteredProducts = availableProducts.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToWatchlist = (product) => {
    setWatchlist([...watchlist, product]);
  };

  const removeFromWatchlist = (productId) => {
    setWatchlist(watchlist.filter(p => p.id !== productId));
  };

  // Drag and drop handlers
  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    if (draggedItem === null || draggedItem === dropIndex) {
      setDraggedItem(null);
      setDragOverIndex(null);
      return;
    }

    const newWatchlist = [...watchlist];
    const draggedProduct = newWatchlist[draggedItem];

    // Remove from old position
    newWatchlist.splice(draggedItem, 1);

    // Insert at new position
    newWatchlist.splice(dropIndex, 0, draggedProduct);

    setWatchlist(newWatchlist);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-stone-900 mb-2">Settings</h1>
          <p className="text-stone-600">
            Manage your watchlist and notification preferences
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-stone-200 mb-8">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('watchlist')}
              className={`pb-4 px-2 font-medium border-b-2 transition-colors ${
                activeTab === 'watchlist'
                  ? 'text-stone-900 border-emerald-700'
                  : 'text-stone-600 hover:text-stone-900 border-transparent'
              }`}
            >
              Watchlist
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`pb-4 px-2 font-medium border-b-2 transition-colors ${
                activeTab === 'notifications'
                  ? 'text-stone-900 border-emerald-700'
                  : 'text-stone-600 hover:text-stone-900 border-transparent'
              }`}
            >
              Notifications
            </button>
          </nav>
        </div>

        {/* Watchlist Tab */}
        {activeTab === 'watchlist' && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Add Products - Left Side (2 columns) */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-6">
                <h2 className="text-xl font-semibold text-stone-900 mb-4">
                  Add Products
                </h2>

                {/* Search */}
                <div className="flex items-center gap-2 bg-stone-50 rounded-md px-4 py-2 border border-stone-200 focus-within:border-emerald-600 transition-colors mb-4">
                  <Search className="w-4 h-4 text-stone-500" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none text-sm placeholder-stone-500 focus:outline-none"
                  />
                </div>

                {/* Available Products List */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredProducts.map(product => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 bg-stone-50 rounded-md hover:bg-stone-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{product.emoji}</span>
                        <div>
                          <p className="text-sm font-medium text-stone-900">
                            {product.name}
                          </p>
                          <p className="text-xs text-stone-500">{product.category}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => addToWatchlist(product)}
                        className="p-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {filteredProducts.length === 0 && (
                    <p className="text-center text-sm text-stone-600 py-8">
                      {searchQuery
                        ? 'No products found'
                        : 'All products are in your watchlist'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Current Watchlist - Right Side (3 columns) */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-stone-900">
                    My Watchlist
                  </h2>
                  <span className="text-sm text-stone-600">
                    {watchlist.length} {watchlist.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {watchlist.length > 0 ? (
                  <div className="space-y-3">
                    {watchlist.map((product, index) => (
                      <div
                        key={product.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, index)}
                        onDragEnd={handleDragEnd}
                        className={`flex items-center gap-4 p-4 rounded-lg transition-all group ${
                          draggedItem === index
                            ? 'opacity-50 bg-stone-100'
                            : dragOverIndex === index
                            ? 'bg-emerald-50 border-2 border-emerald-600 border-dashed'
                            : 'bg-stone-50 hover:bg-stone-100'
                        }`}
                      >
                        {/* Drag Handle */}
                        <div className="cursor-grab active:cursor-grabbing">
                          <GripVertical className="w-5 h-5 text-stone-400" />
                        </div>

                        {/* Product Info */}
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-2xl">{product.emoji}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-base font-semibold text-stone-900">
                                {product.name}
                              </h3>
                              <Badge variant={product.recommendation}>
                                {product.recommendation === 'BUY_NOW'
                                  ? 'BUY'
                                  : product.recommendation === 'WAIT'
                                  ? 'WAIT'
                                  : 'MONITOR'}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-stone-600">{product.category}</span>
                              <span className="font-mono font-medium text-stone-900">
                                ${product.currentPrice}/{product.unit}
                              </span>
                              <span
                                className={`font-medium ${
                                  product.priceChangeValue > 0
                                    ? 'text-red-600'
                                    : 'text-emerald-600'
                                }`}
                              >
                                {product.priceChange}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-stone-600 hover:text-emerald-700 hover:bg-white rounded-md transition-colors">
                            <Star className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => removeFromWatchlist(product.id)}
                            className="p-2 text-stone-600 hover:text-red-600 hover:bg-white rounded-md transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-stone-600 mb-4">
                      Your watchlist is empty
                    </p>
                    <p className="text-sm text-stone-500">
                      Add products from the left to start tracking prices
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="max-w-3xl">
            <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-6">
              <h2 className="text-xl font-semibold text-stone-900 mb-6">
                Notification Preferences
              </h2>

              <div className="space-y-6">
                {/* Price Alerts */}
                <div className="flex items-start justify-between pb-6 border-b border-stone-100">
                  <div className="flex items-start gap-3">
                    <Bell className="w-5 h-5 text-stone-600 mt-0.5" />
                    <div>
                      <h3 className="text-base font-medium text-stone-900 mb-1">
                        Price Alerts
                      </h3>
                      <p className="text-sm text-stone-600">
                        Get notified when prices change significantly for watchlist items
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
                  </label>
                </div>

                {/* Buy Recommendations */}
                <div className="flex items-start justify-between pb-6 border-b border-stone-100">
                  <div className="flex items-start gap-3">
                    <Bell className="w-5 h-5 text-stone-600 mt-0.5" />
                    <div>
                      <h3 className="text-base font-medium text-stone-900 mb-1">
                        Buy Recommendations
                      </h3>
                      <p className="text-sm text-stone-600">
                        Receive alerts when our AI recommends buying a product
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
                  </label>
                </div>

                {/* Market Risk Updates */}
                <div className="flex items-start justify-between pb-6 border-b border-stone-100">
                  <div className="flex items-start gap-3">
                    <Bell className="w-5 h-5 text-stone-600 mt-0.5" />
                    <div>
                      <h3 className="text-base font-medium text-stone-900 mb-1">
                        Market Risk Updates
                      </h3>
                      <p className="text-sm text-stone-600">
                        Stay informed about market conditions affecting your watchlist
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
                  </label>
                </div>

                {/* Weekly Summary */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Bell className="w-5 h-5 text-stone-600 mt-0.5" />
                    <div>
                      <h3 className="text-base font-medium text-stone-900 mb-1">
                        Weekly Summary
                      </h3>
                      <p className="text-sm text-stone-600">
                        Get a weekly email with price trends and forecasts
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
                  </label>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-100">
                <button className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-6 py-2.5 rounded-md shadow-sm transition-all duration-200">
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Settings;
