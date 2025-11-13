import { useState } from 'react';
import { TrendingUp, TrendingDown, ChevronRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { products, risks, getMiniChartData } from '../data/mockData';
import Badge from '../components/ui/Badge';

const Dashboard = () => {
  // Get products with BUY_NOW recommendation for alerts
  const buyAlerts = products.filter(p => p.recommendation === 'BUY_NOW');

  // Get top 5 most recent risks
  const recentRisks = risks.slice(0, 5);

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Buy Alerts Section */}
        {buyAlerts.length > 0 && (
          <section className="mb-8">
            <div className="bg-amber-50 border-l-4 border-amber-600 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-amber-700" />
                <h2 className="text-xl font-semibold text-amber-900">
                  Buy Recommendations
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {buyAlerts.map(product => (
                  <Link
                    key={product.id}
                    to={`/forecast/${product.id}`}
                    className="bg-white rounded-lg p-4 border border-amber-200 hover:border-amber-400 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{product.emoji}</span>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-stone-900">
                          {product.name}
                        </h3>
                      </div>
                      <Badge variant="up">
                        <TrendingUp className="w-3 h-3 inline mr-1" />
                        {product.priceChange}
                      </Badge>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-stone-600 line-clamp-2">
                        {product.recommendationText}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-stone-500">Current Price</p>
                        <p className="text-xl font-semibold font-mono text-stone-900">
                          ${product.currentPrice}
                          <span className="text-sm text-stone-500">/{product.unit}</span>
                        </p>
                      </div>
                      <button className="bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm transition-all duration-200">
                        View Forecast
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Watchlist Section - 2 columns */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-stone-900">My Watchlist</h2>
              <Link
                to="/settings"
                className="text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                Manage Watchlist →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map(product => {
                const miniData = getMiniChartData(product.id);
                const isPositive = product.priceChangeValue > 0;

                return (
                  <Link
                    key={product.id}
                    to={`/forecast/${product.id}`}
                    className="bg-white rounded-lg shadow-sm border border-stone-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{product.emoji}</span>
                        <h3 className="text-lg font-semibold text-stone-900">
                          {product.name}
                        </h3>
                      </div>
                      <Badge variant={product.trend}>
                        {isPositive ? (
                          <TrendingUp className="w-3 h-3 inline mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 inline mr-1" />
                        )}
                        {product.priceChange}
                      </Badge>
                    </div>

                    {/* Mini sparkline chart */}
                    <div className="h-16 mb-4 -mx-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={miniData}>
                          <Line
                            type="monotone"
                            dataKey="price"
                            stroke={isPositive ? '#DC2626' : '#059669'}
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs font-medium text-stone-500 mb-1">
                          Current Price
                        </p>
                        <p className="text-2xl font-semibold font-mono text-stone-900">
                          ${product.currentPrice}
                          <span className="text-sm text-stone-500">/{product.unit}</span>
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-stone-400" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Market Risk Feed Sidebar - 1 column */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-stone-900">Market Risks</h2>
                <Link
                  to="/risks"
                  className="text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {recentRisks.map(risk => {
                  const severityColors = {
                    High: 'bg-red-600',
                    Medium: 'bg-amber-600',
                    Low: 'bg-emerald-600'
                  };

                  return (
                    <div
                      key={risk.id}
                      className="flex gap-3 pb-4 border-b border-stone-100 last:border-0 last:pb-0"
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${severityColors[risk.severity]}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <Badge variant={risk.category}>{risk.category}</Badge>
                          <span className="text-xs text-stone-500">{risk.date}</span>
                        </div>
                        <p className="text-sm font-medium text-stone-900 mb-1">
                          {risk.title}
                        </p>
                        <p className="text-xs text-stone-600 line-clamp-2">
                          {risk.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
