import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Forecasts from './pages/Forecasts';
import ForecastDetail from './pages/ForecastDetail';
import RiskMonitor from './pages/RiskMonitor';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-stone-50">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/forecasts" element={<Forecasts />} />
          <Route path="/forecast/:productId" element={<ForecastDetail />} />
          <Route path="/risks" element={<RiskMonitor />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
