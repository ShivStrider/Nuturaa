import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Upload, Search, Bell, TrendingUp } from 'lucide-react';
import { products } from '../data/mockData';
import Badge from '../components/ui/Badge';

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const steps = [
    { id: 'welcome', title: 'Welcome', icon: TrendingUp },
    { id: 'upload', title: 'Upload Data', icon: Upload },
    { id: 'watchlist', title: 'Build Watchlist', icon: Search },
    { id: 'alerts', title: 'Set Alerts', icon: Bell }
  ];

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const toggleProduct = (product) => {
    setSelectedProducts(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  const handleComplete = () => {
    // Save onboarding completion
    localStorage.setItem('nuturaa_onboarding_complete', 'true');
    localStorage.setItem('nuturaa_watchlist', JSON.stringify(selectedProducts.map(p => p.id)));

    // Navigate to dashboard
    navigate('/');
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Progress Bar */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : isActive
                          ? 'bg-emerald-100 text-emerald-700 ring-4 ring-emerald-50'
                          : 'bg-stone-100 text-stone-400'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium ${
                        isActive ? 'text-emerald-700' : 'text-stone-500'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 ${
                        isCompleted ? 'bg-emerald-600' : 'bg-stone-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8">
          {/* Step 0: Welcome */}
          {currentStep === 0 && (
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
                <TrendingUp className="w-10 h-10 text-emerald-700" />
              </div>
              <h2 className="text-3xl font-semibold text-stone-900 mb-4">
                Welcome to Nuturaa!
              </h2>
              <p className="text-lg text-stone-600 mb-8">
                Let's set up your account to start making smarter procurement decisions with AI-powered price forecasting.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-stone-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-stone-900 mb-2">Price Forecasts</h3>
                  <p className="text-sm text-stone-600">
                    AI predicts prices 6 months ahead with 87% accuracy
                  </p>
                </div>

                <div className="p-6 bg-stone-50 rounded-lg">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Bell className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-stone-900 mb-2">Smart Alerts</h3>
                  <p className="text-sm text-stone-600">
                    Get notified when it's the optimal time to buy
                  </p>
                </div>

                <div className="p-6 bg-stone-50 rounded-lg">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Search className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-stone-900 mb-2">Market Risks</h3>
                  <p className="text-sm text-stone-600">
                    Monitor weather, supply chain, and economic factors
                  </p>
                </div>
              </div>

              <p className="text-sm text-stone-500">
                This setup will take about 3 minutes
              </p>
            </div>
          )}

          {/* Step 1: Upload Data */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-semibold text-stone-900 mb-2">
                Upload Historical Data (Optional)
              </h2>
              <p className="text-stone-600 mb-8">
                Upload your purchase history to personalize forecasts. We support CSV, Excel, or skip this step to use our default data.
              </p>

              <div className="border-2 border-dashed border-stone-300 rounded-xl p-12 text-center hover:border-emerald-600 transition-colors cursor-pointer">
                <input
                  type="file"
                  id="file-upload"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-stone-400 mx-auto mb-4" />
                  {uploadedFile ? (
                    <div>
                      <p className="text-lg font-medium text-emerald-700 mb-2">
                        ✓ {uploadedFile.name}
                      </p>
                      <p className="text-sm text-stone-600">
                        Click to change file
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg font-medium text-stone-900 mb-2">
                        Drop your file here, or click to browse
                      </p>
                      <p className="text-sm text-stone-600">
                        Supports CSV, Excel (XLS, XLSX) • Max 10MB
                      </p>
                    </div>
                  )}
                </label>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-900 mb-2">
                  Expected Format
                </p>
                <code className="text-xs text-blue-800 font-mono">
                  Date, Product, Quantity, Unit, Price<br />
                  2025-01-15, Carrots, 500, lbs, 0.85<br />
                  2025-01-22, Potatoes, 300, lbs, 0.65
                </code>
              </div>
            </div>
          )}

          {/* Step 2: Build Watchlist */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-semibold text-stone-900 mb-2">
                Build Your Watchlist
              </h2>
              <p className="text-stone-600 mb-6">
                Select products you frequently purchase. You can always change this later.
              </p>

              {/* Search */}
              <div className="flex items-center gap-2 bg-stone-50 rounded-md px-4 py-2 border border-stone-200 mb-6">
                <Search className="w-4 h-4 text-stone-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none text-sm placeholder-stone-500 focus:outline-none"
                />
              </div>

              {/* Selected Count */}
              <div className="mb-4">
                <span className="text-sm font-medium text-stone-700">
                  {selectedProducts.length} products selected
                </span>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {filteredProducts.map(product => {
                  const isSelected = selectedProducts.find(p => p.id === product.id);

                  return (
                    <button
                      key={product.id}
                      onClick={() => toggleProduct(product)}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? 'bg-emerald-600 border-emerald-600'
                            : 'border-stone-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-2xl">{product.emoji}</span>
                      <div className="flex-1">
                        <p className="font-medium text-stone-900">{product.name}</p>
                        <p className="text-xs text-stone-500">{product.category}</p>
                      </div>
                      <Badge variant={product.recommendation}>
                        {product.recommendation === 'BUY_NOW' ? 'BUY' : product.recommendation}
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Set Alerts */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-semibold text-stone-900 mb-2">
                Configure Alerts
              </h2>
              <p className="text-stone-600 mb-8">
                Choose how you want to be notified about price changes and buy recommendations.
              </p>

              <div className="space-y-6">
                <div className="flex items-start justify-between p-4 bg-stone-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Bell className="w-5 h-5 text-stone-600 mt-0.5" />
                    <div>
                      <h3 className="text-base font-medium text-stone-900 mb-1">
                        Buy Recommendations
                      </h3>
                      <p className="text-sm text-stone-600">
                        Get notified when our AI recommends buying a product from your watchlist
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
                  </label>
                </div>

                <div className="flex items-start justify-between p-4 bg-stone-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Bell className="w-5 h-5 text-stone-600 mt-0.5" />
                    <div>
                      <h3 className="text-base font-medium text-stone-900 mb-1">
                        Price Alerts
                      </h3>
                      <p className="text-sm text-stone-600">
                        Get notified when prices change significantly (±15% or more)
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
                  </label>
                </div>

                <div className="flex items-start justify-between p-4 bg-stone-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Bell className="w-5 h-5 text-stone-600 mt-0.5" />
                    <div>
                      <h3 className="text-base font-medium text-stone-900 mb-1">
                        Market Risk Updates
                      </h3>
                      <p className="text-sm text-stone-600">
                        Stay informed about weather, supply chain, and other market risks
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
                  </label>
                </div>

                <div className="flex items-start justify-between p-4 bg-stone-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Bell className="w-5 h-5 text-stone-600 mt-0.5" />
                    <div>
                      <h3 className="text-base font-medium text-stone-900 mb-1">
                        Weekly Summary
                      </h3>
                      <p className="text-sm text-stone-600">
                        Get a weekly digest of price trends and forecasts via email
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
                  </label>
                </div>
              </div>

              <div className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="text-sm font-medium text-emerald-900">
                  🎉 All set! You're ready to start using Nuturaa
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-stone-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-6 py-2.5 text-stone-700 font-medium rounded-md hover:bg-stone-100 disabled:opacity-0 disabled:cursor-not-allowed transition-all"
            >
              Back
            </button>

            <div className="flex items-center gap-3">
              {currentStep < steps.length - 1 && (
                <button
                  onClick={() => setCurrentStep(steps.length - 1)}
                  className="px-6 py-2.5 text-stone-600 font-medium rounded-md hover:bg-stone-100 transition-all"
                >
                  Skip
                </button>
              )}
              <button
                onClick={nextStep}
                className="px-8 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-md shadow-sm transition-all"
              >
                {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
