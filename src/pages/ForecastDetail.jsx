import { useParams, Link } from 'react-router-dom';
import { ChevronRight, TrendingUp, TrendingDown, AlertCircle, Calendar, Star } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { products, risks, getProductChartData } from '../data/mockData';
import Badge from '../components/ui/Badge';

const ForecastDetail = () => {
  const { productId } = useParams();
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-stone-900 mb-2">Product not found</h2>
          <Link to="/" className="text-emerald-700 hover:text-emerald-800">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const chartData = getProductChartData(productId);
  const relatedRisks = risks.filter(risk =>
    risk.affectedProducts.includes(product.name)
  ).slice(0, 4);

  const isPositive = product.priceChangeValue > 0;
  const isForecastPositive = product.forecastChangeValue > 0;

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isForecast = data.forecast;

      return (
        <div className="bg-white border border-stone-200 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-stone-900 mb-2">{data.month}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isForecast ? 'bg-emerald-600' : 'bg-blue-600'
                }`}
              />
              <span className="text-xs text-stone-600">
                {isForecast ? 'Forecast' : 'Historical'}
              </span>
            </div>
            <p className="text-base font-semibold font-mono text-stone-900">
              ${payload[0].value}
              <span className="text-sm text-stone-500">/{product.unit}</span>
            </p>
            {isForecast && data.confidenceLow && (
              <p className="text-xs text-stone-500">
                Range: ${data.confidenceLow} - ${data.confidenceHigh}
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm mb-4 sm:mb-6 overflow-x-auto">
          <Link to="/" className="text-stone-600 hover:text-stone-900 transition-colors whitespace-nowrap">
            Dashboard
          </Link>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-stone-400 flex-shrink-0" />
          <Link to="/forecasts" className="text-stone-600 hover:text-stone-900 transition-colors whitespace-nowrap">
            Forecasts
          </Link>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-stone-400 flex-shrink-0" />
          <span className="text-stone-900 font-medium whitespace-nowrap">{product.name}</span>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Chart Area - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Header */}
            <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-3xl sm:text-4xl">{product.emoji}</span>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-semibold text-stone-900">
                      {product.name}
                    </h1>
                    <p className="text-xs sm:text-sm text-stone-600">{product.category}</p>
                  </div>
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
            </div>

            {/* Price Forecast Chart */}
            <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-4 sm:p-6 lg:p-8">
              <h2 className="text-lg sm:text-xl font-semibold text-stone-900 mb-4 sm:mb-6">
                Price Forecast - Next 6 Months
              </h2>

              <div className="h-64 sm:h-80 lg:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 5, left: -10, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#059669" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#059669" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#E7E5E4"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      stroke="#57534E"
                      style={{ fontSize: '13px', fontFamily: 'Work Sans' }}
                    />
                    <YAxis
                      stroke="#57534E"
                      style={{ fontSize: '13px', fontFamily: 'IBM Plex Mono' }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip content={<CustomTooltip />} />

                    {/* Confidence interval - only for forecast data */}
                    <Area
                      type="monotone"
                      dataKey="confidenceHigh"
                      stroke="none"
                      fill="url(#confidenceGradient)"
                    />
                    <Area
                      type="monotone"
                      dataKey="confidenceLow"
                      stroke="none"
                      fill="#fff"
                    />

                    {/* Historical line */}
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#2563EB"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6 }}
                      connectNulls
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-0.5 bg-blue-600" />
                  <span className="text-sm text-stone-600">Historical Price</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-0.5 bg-emerald-600" />
                  <span className="text-sm text-stone-600">Forecast Price</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-3 bg-emerald-600 opacity-10 rounded" />
                  <span className="text-sm text-stone-600">Confidence Range</span>
                </div>
              </div>
            </div>

            {/* Related Risk Factors */}
            {relatedRisks.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-6">
                <h2 className="text-xl font-semibold text-stone-900 mb-4">
                  Related Market Risks
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedRisks.map(risk => {
                    const borderColors = {
                      High: 'border-l-red-600',
                      Medium: 'border-l-amber-600',
                      Low: 'border-l-emerald-600'
                    };

                    return (
                      <div
                        key={risk.id}
                        className={`border-l-4 ${borderColors[risk.severity]} bg-stone-50 rounded-r-lg p-4`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={risk.category}>{risk.category}</Badge>
                          <Badge variant={risk.severity}>{risk.severity}</Badge>
                        </div>
                        <h3 className="text-sm font-semibold text-stone-900 mb-1">
                          {risk.title}
                        </h3>
                        <p className="text-xs text-stone-600 line-clamp-2">
                          {risk.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Recommendation Panel - 1 column (sticky sidebar) */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-6 space-y-6">
                {/* Current Price */}
                <div>
                  <p className="text-sm font-medium text-stone-500 mb-2">Current Price</p>
                  <p className="text-4xl font-semibold font-mono text-stone-900">
                    ${product.currentPrice}
                    <span className="text-lg text-stone-500">/{product.unit}</span>
                  </p>
                  <p className="text-sm text-stone-600 mt-1">As of Nov 13, 2025</p>
                </div>

                <div className="border-t border-stone-200 pt-6">
                  <p className="text-sm font-medium text-stone-500 mb-2">
                    6-Month Forecast
                  </p>
                  <p className="text-2xl font-semibold font-mono text-stone-900 mb-2">
                    ${product.forecastPrice}
                    <span className="text-base text-stone-500">/{product.unit}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    {isForecastPositive ? (
                      <TrendingUp className="w-4 h-4 text-red-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-emerald-600" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        isForecastPositive ? 'text-red-600' : 'text-emerald-600'
                      }`}
                    >
                      {product.forecastChange} {isForecastPositive ? 'increase' : 'decrease'}
                    </span>
                  </div>
                </div>

                {/* Recommendation Badge */}
                <div
                  className={`rounded-lg border-l-4 p-4 ${
                    product.recommendation === 'BUY_NOW'
                      ? 'bg-emerald-50 border-emerald-600'
                      : product.recommendation === 'WAIT'
                      ? 'bg-blue-50 border-blue-600'
                      : 'bg-amber-50 border-amber-600'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle
                      className={`w-5 h-5 ${
                        product.recommendation === 'BUY_NOW'
                          ? 'text-emerald-700'
                          : product.recommendation === 'WAIT'
                          ? 'text-blue-700'
                          : 'text-amber-700'
                      }`}
                    />
                    <span
                      className={`text-sm font-semibold uppercase tracking-wide ${
                        product.recommendation === 'BUY_NOW'
                          ? 'text-emerald-900'
                          : product.recommendation === 'WAIT'
                          ? 'text-blue-900'
                          : 'text-amber-900'
                      }`}
                    >
                      {product.recommendation === 'BUY_NOW'
                        ? 'Buy Now'
                        : product.recommendation === 'WAIT'
                        ? 'Wait'
                        : 'Monitor'}
                    </span>
                  </div>
                  <p
                    className={`text-sm ${
                      product.recommendation === 'BUY_NOW'
                        ? 'text-emerald-800'
                        : product.recommendation === 'WAIT'
                        ? 'text-blue-800'
                        : 'text-amber-800'
                    }`}
                  >
                    {product.recommendationText}
                  </p>
                </div>

                {/* Confidence Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-stone-700">
                      Forecast Confidence
                    </span>
                    <span className="text-sm font-semibold font-mono text-stone-900">
                      {product.confidence}%
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-2">
                    <div
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${product.confidence}%` }}
                    />
                  </div>
                  <p className="text-xs text-stone-600 mt-2">
                    Based on historical trends and current market conditions
                  </p>
                </div>

                {/* Optimal Window */}
                <div className="border-t border-stone-200 pt-6">
                  <p className="text-sm font-medium text-stone-500 mb-2">
                    Optimal Purchase Window
                  </p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-stone-600" />
                    <span className="text-sm font-medium text-stone-900">
                      {new Date(product.optimalWindow.start).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}{' '}
                      -{' '}
                      {new Date(product.optimalWindow.end).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-2.5 rounded-md shadow-sm transition-all duration-200 flex items-center justify-center gap-2">
                    <Star className="w-4 h-4" />
                    Add to Watchlist
                  </button>
                  <button className="w-full bg-white hover:bg-stone-50 text-stone-900 font-medium py-2.5 rounded-md border border-stone-300 shadow-sm transition-all duration-200">
                    Set Price Alert
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ForecastDetail;
