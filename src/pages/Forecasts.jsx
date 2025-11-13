import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { products } from '../data/mockData';
import Badge from '../components/ui/Badge';

const Forecasts = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-stone-900 mb-2">Price Forecasts</h1>
          <p className="text-stone-600">
            AI-powered price predictions for all tracked commodities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => {
            const isPositive = product.forecastChangeValue > 0;

            return (
              <Link
                key={product.id}
                to={`/forecast/${product.id}`}
                className="bg-white rounded-lg shadow-sm border border-stone-200 p-6 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{product.emoji}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-stone-900">
                        {product.name}
                      </h3>
                      <p className="text-xs text-stone-500">{product.category}</p>
                    </div>
                  </div>
                  <Badge variant={product.recommendation}>
                    {product.recommendation === 'BUY_NOW'
                      ? 'BUY'
                      : product.recommendation === 'WAIT'
                      ? 'WAIT'
                      : 'MONITOR'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs font-medium text-stone-500 mb-1">Current</p>
                    <p className="text-lg font-semibold font-mono text-stone-900">
                      ${product.currentPrice}
                      <span className="text-xs text-stone-500">/{product.unit}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-stone-500 mb-1">6-Mo Forecast</p>
                    <p className="text-lg font-semibold font-mono text-stone-900">
                      ${product.forecastPrice}
                      <span className="text-xs text-stone-500">/{product.unit}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                  <div className="flex items-center gap-2">
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4 text-red-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-emerald-600" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        isPositive ? 'text-red-600' : 'text-emerald-600'
                      }`}
                    >
                      {product.forecastChange}
                    </span>
                    <span className="text-xs text-stone-500">expected change</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-stone-400" />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Forecasts;
