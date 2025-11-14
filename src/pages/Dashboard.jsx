import { useMemo } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Clock, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, Area, AreaChart } from 'recharts';
import { products, risks, getMiniChartData } from '../data/mockData';
import Badge from '../components/ui/Badge';

const Dashboard = () => {
  // Memoize expensive computations to prevent unnecessary recalculations
  const buyAlerts = useMemo(
    () => products.filter(p => p.recommendation === 'BUY_NOW'),
    []
  );

  // Get high and medium severity risks, sorted by severity
  const urgentRisks = useMemo(
    () => risks
      .filter(r => r.severity === 'High' || r.severity === 'Medium')
      .sort((a, b) => {
        const severityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      })
      .slice(0, 6),
    []
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5">

        {/* CRITICAL ALERTS - Professional amber-based design per design system */}
        {buyAlerts.length > 0 && (
          <section className="mb-4 sm:mb-6" aria-labelledby="buy-alerts-heading" role="region">
            <div className="bg-amber-50 rounded-lg border-l-4 border-amber-600 p-4 sm:p-5 shadow-sm" role="alert">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-700" aria-hidden="true" />
                <h2 id="buy-alerts-heading" className="text-lg sm:text-xl font-bold text-amber-900">
                  Buy Recommendations — Action Required
                </h2>
                <span className="ml-auto bg-amber-900 text-amber-50 text-xs font-bold px-2.5 py-1 rounded" aria-label={`${buyAlerts.length} urgent ${buyAlerts.length > 1 ? 'items' : 'item'} requiring action`}>
                  {buyAlerts.length} ITEM{buyAlerts.length > 1 ? 'S' : ''}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {buyAlerts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg border border-amber-200 p-3 sm:p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{product.emoji}</span>
                        <div>
                          <h3 className="text-base font-bold text-stone-900">
                            {product.name}
                          </h3>
                          <p className="text-xs font-semibold text-red-600">
                            +{product.priceChangeValue}% (30 days)
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 rounded px-2 py-2 mb-3 border border-amber-100">
                      <p className="text-xs text-stone-700 leading-relaxed">
                        {product.recommendationText}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-stone-100">
                      <div>
                        <p className="text-xs text-stone-500 font-medium mb-0.5">Current</p>
                        <p className="text-lg font-bold font-mono text-stone-900">
                          ${product.currentPrice}
                          <span className="text-xs text-stone-500 font-sans">/{product.unit}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-stone-500 font-medium mb-0.5">Est. 30-day</p>
                        <p className="text-lg font-bold font-mono text-red-600">
                          ${product.forecastPrice}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-3.5 h-3.5 text-stone-500" aria-hidden="true" />
                      <p className="text-xs text-stone-600">
                        Buy by: <time dateTime={product.optimalWindow.end} className="font-bold text-stone-900">{new Date(product.optimalWindow.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</time>
                      </p>
                    </div>

                    <Link
                      to={`/forecast/${product.id}`}
                      className="block w-full bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium py-2.5 px-4 rounded-md text-center transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
                      aria-label={`View detailed forecast for ${product.name}`}
                    >
                      View Forecast →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
          {/* Watchlist Section - 2 columns */}
          <section className="lg:col-span-2" aria-labelledby="watchlist-heading">
            <div className="flex items-center justify-between mb-4">
              <h2 id="watchlist-heading" className="text-lg sm:text-xl font-bold text-stone-900">Price Watchlist</h2>
              <Link
                to="/settings"
                className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 rounded"
                aria-label="Manage watchlist products"
              >
                Manage →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {products.map(product => {
                const miniData = getMiniChartData(product.id);
                const isPositive = product.priceChangeValue > 0;

                return (
                  <Link
                    key={product.id}
                    to={`/forecast/${product.id}`}
                    className="bg-white rounded-lg border border-stone-200 p-3 sm:p-4 hover:shadow-md hover:border-emerald-600 transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
                    aria-label={`View ${product.name} price forecast - Current: $${product.currentPrice}, ${isPositive ? 'Rising' : 'Falling'} ${Math.abs(product.priceChangeValue)}%`}
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
                    <div className="h-12 mb-3 -mx-1" role="img" aria-label={`Price trend chart for ${product.name} showing ${isPositive ? 'upward' : 'downward'} movement`}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={miniData}>
                          <defs>
                            <linearGradient id={`gradient-${product.id}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={isPositive ? '#DC2626' : '#059669'} stopOpacity={0.15} />
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
                          Current Price
                        </p>
                        <p className="text-xl font-bold font-mono text-stone-900">
                          ${product.currentPrice}
                          <span className="text-xs text-stone-500 font-sans">/{product.unit}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-stone-500 mb-0.5">
                          30-day Change
                        </p>
                        <div className="flex items-center gap-1">
                          <span className={`text-sm font-bold font-mono ${isPositive ? 'text-red-600' : 'text-emerald-600'}`}>
                            {product.priceChange}
                          </span>
                          {isPositive ? (
                            <TrendingUp className="w-3.5 h-3.5 text-red-600" />
                          ) : (
                            <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Forecast confidence */}
                    <div className="mt-3 pt-3 border-t border-stone-100">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-stone-600 font-medium">
                          <Target className="w-3 h-3 inline mr-1" />
                          Forecast: <span className="font-mono font-semibold text-stone-900">${product.forecastPrice}</span>
                        </span>
                        <span className="text-stone-500">
                          {product.confidence}% confidence
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Market Risk Feed Sidebar - 1 column */}
          <aside className="lg:col-span-1" aria-labelledby="risks-heading">
            <div className="flex items-center justify-between mb-4">
              <h2 id="risks-heading" className="text-lg sm:text-xl font-bold text-stone-900">Active Risks</h2>
              <Link
                to="/risks"
                className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 rounded"
                aria-label="View all market risks"
              >
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {urgentRisks.map(risk => {
                const severityConfig = {
                  High: {
                    borderColor: '#DC2626',
                    badgeBg: 'bg-red-100',
                    badgeText: 'text-red-700',
                    label: 'HIGH'
                  },
                  Medium: {
                    borderColor: '#D97706',
                    badgeBg: 'bg-amber-100',
                    badgeText: 'text-amber-700',
                    label: 'MED'
                  },
                  Low: {
                    borderColor: '#059669',
                    badgeBg: 'bg-emerald-100',
                    badgeText: 'text-emerald-700',
                    label: 'LOW'
                  }
                };

                const config = severityConfig[risk.severity];

                return (
                  <div
                    key={risk.id}
                    className="bg-white rounded-lg border-l-4 p-3 hover:shadow-sm transition-shadow"
                    style={{ borderLeftColor: config.borderColor }}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <span className={`${config.badgeBg} ${config.badgeText} text-xs font-bold px-2 py-0.5 rounded`}>
                        {config.label}
                      </span>
                      <span className="text-xs text-stone-500 font-mono">{risk.probability}%</span>
                    </div>

                    <p className="text-sm font-bold text-stone-900 mb-2 leading-snug">
                      {risk.title}
                    </p>

                    <div className="mb-2">
                      <p className="text-xs text-stone-600 font-medium leading-relaxed">
                        {risk.impact}
                      </p>
                    </div>

                    <div className="bg-stone-50 rounded px-2 py-1.5 mb-2 border border-stone-100">
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
                            +{risk.affectedProducts.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
