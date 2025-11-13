import { useState } from 'react';
import { TrendingUp, TrendingDown, ChevronRight, AlertTriangle, AlertCircle, Clock, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, ResponsiveContainer, Tooltip, ReferenceLine, Area, AreaChart } from 'recharts';
import { products, risks, getMiniChartData } from '../data/mockData';
import Badge from '../components/ui/Badge';

const Dashboard = () => {
  // Get products with BUY_NOW recommendation for alerts
  const buyAlerts = products.filter(p => p.recommendation === 'BUY_NOW');

  // Get high and medium severity risks, sorted by severity
  const urgentRisks = risks
    .filter(r => r.severity === 'High' || r.severity === 'Medium')
    .sort((a, b) => {
      const severityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    })
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-stone-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5">

        {/* CRITICAL ALERTS - Maximum prominence */}
        {buyAlerts.length > 0 && (
          <section className="mb-4 sm:mb-6">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-lg p-3 sm:p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-6 h-6 text-white" />
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  URGENT: BUY NOW RECOMMENDATIONS
                </h2>
                <span className="ml-auto bg-white/20 text-white text-xs font-semibold px-2 py-1 rounded">
                  {buyAlerts.length} ACTION{buyAlerts.length > 1 ? 'S' : ''} REQUIRED
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {buyAlerts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg p-3 border-2 border-red-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{product.emoji}</span>
                        <div>
                          <h3 className="text-base font-bold text-stone-900">
                            {product.name}
                          </h3>
                          <p className="text-xs font-semibold text-red-600">
                            +{product.priceChangeValue}% in 30 days
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 rounded px-2 py-1.5 mb-2">
                      <p className="text-xs font-medium text-stone-800">
                        {product.recommendationText}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs text-stone-500 font-medium">Current</p>
                        <p className="text-lg font-bold font-mono text-stone-900">
                          ${product.currentPrice}
                          <span className="text-xs text-stone-500">/{product.unit}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-stone-500 font-medium">30-day Est.</p>
                        <p className="text-lg font-bold font-mono text-red-600">
                          ${product.forecastPrice}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-stone-500" />
                      <p className="text-xs text-stone-600">
                        Buy by: <span className="font-semibold">{new Date(product.optimalWindow.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </p>
                    </div>

                    <Link
                      to={`/forecast/${product.id}`}
                      className="block mt-3 w-full bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-2 px-3 rounded text-center transition-colors"
                    >
                      VIEW FULL FORECAST →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
          {/* Watchlist Section - 2 columns */}
          <section className="lg:col-span-2">
            <div className="bg-stone-50 rounded-lg p-3 sm:p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg sm:text-xl font-bold text-stone-900">Price Watchlist</h2>
                <Link
                  to="/settings"
                  className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  Manage →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {products.map(product => {
                  const miniData = getMiniChartData(product.id);
                  const isPositive = product.priceChangeValue > 0;

                  return (
                    <Link
                      key={product.id}
                      to={`/forecast/${product.id}`}
                      className="bg-white rounded-lg border border-stone-200 p-3 hover:shadow-md hover:border-emerald-600 transition-all duration-150 cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{product.emoji}</span>
                          <div>
                            <h3 className="text-sm font-bold text-stone-900">
                              {product.name}
                            </h3>
                            <p className="text-xs text-stone-500">{product.category}</p>
                          </div>
                        </div>
                        <Badge variant={product.recommendation === 'BUY_NOW' ? 'up' : product.recommendation === 'WAIT' ? 'down' : 'neutral'}>
                          {product.recommendation === 'BUY_NOW' ? 'BUY' : product.recommendation === 'WAIT' ? 'WAIT' : 'MONITOR'}
                        </Badge>
                      </div>

                      {/* Real mini chart with data points */}
                      <div className="h-12 mb-2 -mx-1">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={miniData}>
                            <defs>
                              <linearGradient id={`gradient-${product.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={isPositive ? '#DC2626' : '#059669'} stopOpacity={0.2} />
                                <stop offset="100%" stopColor={isPositive ? '#DC2626' : '#059669'} stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <Area
                              type="monotone"
                              dataKey="price"
                              stroke={isPositive ? '#DC2626' : '#059669'}
                              strokeWidth={2}
                              fill={`url(#gradient-${product.id})`}
                              dot={{ r: 1.5, fill: isPositive ? '#DC2626' : '#059669' }}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs font-semibold text-stone-500 mb-0.5">
                            Current
                          </p>
                          <p className="text-xl font-bold font-mono text-stone-900">
                            ${product.currentPrice}
                            <span className="text-xs text-stone-500">/{product.unit}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-semibold text-stone-500 mb-0.5">
                            30-day
                          </p>
                          <div className="flex items-center gap-1">
                            <span className={`text-sm font-bold ${isPositive ? 'text-red-600' : 'text-emerald-600'}`}>
                              {product.priceChange}
                            </span>
                            {isPositive ? (
                              <TrendingUp className="w-3 h-3 text-red-600" />
                            ) : (
                              <TrendingDown className="w-3 h-3 text-emerald-600" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Forecast confidence */}
                      <div className="mt-2 pt-2 border-t border-stone-100">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-stone-600">
                            <Target className="w-3 h-3 inline mr-1" />
                            Forecast: ${product.forecastPrice}
                          </span>
                          <span className="text-stone-500 font-mono">
                            {product.confidence}% confidence
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Market Risk Feed Sidebar - 1 column */}
          <aside className="lg:col-span-1">
            <div className="bg-stone-50 rounded-lg p-3 sm:p-4 lg:sticky lg:top-20">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg sm:text-xl font-bold text-stone-900">Active Risks</h2>
                <Link
                  to="/risks"
                  className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-2.5">
                {urgentRisks.map(risk => {
                  const severityConfig = {
                    High: {
                      bg: 'bg-red-600',
                      text: 'text-red-600',
                      badgeBg: 'bg-red-100',
                      label: 'HIGH'
                    },
                    Medium: {
                      bg: 'bg-amber-600',
                      text: 'text-amber-700',
                      badgeBg: 'bg-amber-100',
                      label: 'MED'
                    },
                    Low: {
                      bg: 'bg-emerald-600',
                      text: 'text-emerald-600',
                      badgeBg: 'bg-emerald-100',
                      label: 'LOW'
                    }
                  };

                  const config = severityConfig[risk.severity];

                  return (
                    <div
                      key={risk.id}
                      className="bg-white rounded-lg border-l-4 border-stone-200 p-2.5 hover:shadow-sm transition-shadow"
                      style={{ borderLeftColor: config.bg.replace('bg-', '#') === 'bg-red-600' ? '#DC2626' : config.bg === 'bg-amber-600' ? '#D97706' : '#059669' }}
                    >
                      <div className="flex items-start gap-2 mb-1.5">
                        <span className={`${config.badgeBg} ${config.text} text-xs font-bold px-1.5 py-0.5 rounded`}>
                          {config.label}
                        </span>
                        <span className="text-xs text-stone-500">{risk.probability}%</span>
                      </div>

                      <p className="text-sm font-bold text-stone-900 mb-1 leading-tight">
                        {risk.title}
                      </p>

                      <div className="mb-1.5">
                        <p className="text-xs text-stone-600 font-medium">
                          Impact: {risk.impact}
                        </p>
                      </div>

                      <div className="bg-stone-50 rounded px-2 py-1 mb-1.5">
                        <p className="text-xs font-semibold text-stone-700">
                          → {risk.recommendation}
                        </p>
                      </div>

                      {risk.affectedProducts.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {risk.affectedProducts.slice(0, 3).map((product, idx) => (
                            <span key={idx} className="text-xs bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">
                              {product}
                            </span>
                          ))}
                          {risk.affectedProducts.length > 3 && (
                            <span className="text-xs text-stone-500">
                              +{risk.affectedProducts.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
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
