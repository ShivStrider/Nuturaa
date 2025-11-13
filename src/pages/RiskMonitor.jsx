import { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { risks } from '../data/mockData';
import Badge from '../components/ui/Badge';

const RiskMonitor = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Weather', 'Supply Chain', 'Disease', 'Labor', 'Trade', 'Economic'];
  const regions = ['All Regions', 'California', 'United States', 'Florida', 'Pacific Northwest', 'Midwest', 'National', 'Multiple States'];

  // Filter risks based on selected filters
  const filteredRisks = risks.filter(risk => {
    const matchesCategory = activeCategory === 'All' || risk.category === activeCategory;
    const matchesRegion = selectedRegion === 'All Regions' || risk.region === selectedRegion;
    const matchesSearch = risk.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         risk.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesRegion && matchesSearch;
  });

  const borderColors = {
    High: 'border-l-red-600',
    Medium: 'border-l-amber-600',
    Low: 'border-l-emerald-600'
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-stone-900 mb-2">Market Risk Monitor</h1>
          <p className="text-stone-600">
            Real-time monitoring of market conditions affecting food prices
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-6 mb-6">
          <div className="flex flex-col gap-4">
            {/* Category Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-sm font-medium text-stone-700">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      activeCategory === cat
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Region and Search */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Region Dropdown */}
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 rounded-md border border-stone-300 text-sm font-medium text-stone-700 bg-white hover:border-stone-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              >
                {regions.map(region => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              {/* Search */}
              <div className="flex-1 flex items-center gap-2 bg-stone-50 rounded-md px-4 py-2 border border-stone-200 focus-within:border-emerald-600 transition-colors">
                <Search className="w-4 h-4 text-stone-500" />
                <input
                  type="text"
                  placeholder="Search risks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none text-sm placeholder-stone-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-stone-600">
              Showing {filteredRisks.length} {filteredRisks.length === 1 ? 'risk' : 'risks'}
            </div>
          </div>
        </div>

        {/* Risk Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRisks.map(risk => (
            <div
              key={risk.id}
              className={`bg-white rounded-lg shadow-sm border-l-4 ${borderColors[risk.severity]} p-6 hover:shadow-md transition-all duration-200 cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge variant={risk.category}>{risk.category}</Badge>
                  <Badge variant={risk.severity}>{risk.severity}</Badge>
                </div>
                <span className="text-xs text-stone-500 whitespace-nowrap ml-2">{risk.date}</span>
              </div>

              <h3 className="text-lg font-semibold text-stone-900 mb-2">
                {risk.title}
              </h3>
              <p className="text-sm text-stone-600 mb-4">
                {risk.description}
              </p>

              {/* Impact */}
              <div className="mb-4 p-3 bg-stone-50 rounded-md">
                <p className="text-xs font-medium text-stone-500 mb-1">Impact</p>
                <p className="text-sm text-stone-900">{risk.impact}</p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-medium text-stone-500">Affected:</span>
                  {risk.affectedProducts.slice(0, 3).map(product => (
                    <span
                      key={product}
                      className="px-2 py-1 bg-emerald-100 rounded text-xs font-medium text-emerald-700"
                    >
                      {product}
                    </span>
                  ))}
                  {risk.affectedProducts.length > 3 && (
                    <span className="text-xs text-stone-500">
                      +{risk.affectedProducts.length - 3} more
                    </span>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-stone-400" />
              </div>

              {/* Region */}
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-medium text-stone-500">Region:</span>
                <span className="text-xs text-stone-700">{risk.region}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRisks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-600 mb-4">No risks found matching your filters</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSelectedRegion('All Regions');
                setSearchQuery('');
              }}
              className="text-emerald-700 hover:text-emerald-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default RiskMonitor;
