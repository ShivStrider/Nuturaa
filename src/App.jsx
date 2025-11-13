import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Forecasts from './pages/Forecasts';
import ForecastDetail from './pages/ForecastDetail';
import RiskMonitor from './pages/RiskMonitor';
import Settings from './pages/Settings';
import Login from './pages/auth/Login';
import Onboarding from './pages/Onboarding';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('nuturaa_auth');
  const hasCompletedOnboarding = localStorage.getItem('nuturaa_onboarding_complete');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasCompletedOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

// Layout wrapper to conditionally show Header
const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderRoutes = ['/login', '/onboarding'];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-stone-50">
      {shouldShowHeader && <Header />}
      {children}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forecasts"
            element={
              <ProtectedRoute>
                <Forecasts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forecast/:productId"
            element={
              <ProtectedRoute>
                <ForecastDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/risks"
            element={
              <ProtectedRoute>
                <RiskMonitor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
