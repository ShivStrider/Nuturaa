import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { setStorageItem, getStorageItem } from '../../utils/storage';
import logo from '../../assets/logo-nuturaa.svg';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Store auth token (mock) using safe storage utility
      setStorageItem('auth', 'mock_token');
      setStorageItem('user', {
        name: 'Sarah Mitchell',
        email: formData.email,
        organization: 'City Food Bank',
        role: 'Procurement Manager'
      });

      // Check if user needs onboarding
      const hasCompletedOnboarding = getStorageItem('onboarding_complete', null);

      if (!hasCompletedOnboarding) {
        navigate('/onboarding');
      } else {
        navigate('/');
      }

      setIsLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <img src={logo} alt="Nuturaa Logo" className="h-16 w-16" />
          </div>
          <h1 className="text-3xl font-semibold text-stone-900 mb-2">
            Welcome to Nuturaa
          </h1>
          <p className="text-stone-600">
            AI-powered procurement intelligence for food banks
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-md border ${
                    errors.email
                      ? 'border-red-300 focus:border-red-600 focus:ring-red-600'
                      : 'border-stone-300 focus:border-emerald-600 focus:ring-emerald-600'
                  } focus:outline-none focus:ring-2 transition-colors`}
                  placeholder="you@organization.org"
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-2.5 rounded-md border ${
                    errors.password
                      ? 'border-red-300 focus:border-red-600 focus:ring-red-600'
                      : 'border-stone-300 focus:border-emerald-600 focus:ring-emerald-600'
                  } focus:outline-none focus:ring-2 transition-colors`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-600"
                />
                <span className="ml-2 text-sm text-stone-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-md shadow-sm transition-all duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Demo Account */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs font-medium text-blue-900 mb-2">Demo Account</p>
            <p className="text-xs text-blue-800">
              Email: demo@foodbank.org<br />
              Password: demo123
            </p>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-stone-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-emerald-700 hover:text-emerald-800">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm text-stone-500">
          <Link to="/privacy" className="hover:text-stone-700">Privacy Policy</Link>
          <span className="mx-2">•</span>
          <Link to="/terms" className="hover:text-stone-700">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
