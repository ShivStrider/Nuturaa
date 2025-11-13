// Generate historical data for the past 12 months
const generateHistoricalData = (basePrice, volatility = 0.1) => {
  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
  return months.map((month, index) => {
    const variation = (Math.random() - 0.5) * volatility * basePrice;
    const trend = (index / months.length) * 0.15 * basePrice;
    return {
      month,
      price: Number((basePrice + variation + trend).toFixed(2)),
      actual: true
    };
  });
};

// Generate forecast data for the next 6 months
const generateForecastData = (currentPrice, trend = 'up') => {
  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  const trendMultiplier = trend === 'up' ? 1 : -1;

  return months.map((month, index) => {
    const increase = (index + 1) * 0.04 * currentPrice * trendMultiplier;
    const variation = (Math.random() - 0.5) * 0.03 * currentPrice;
    const price = Number((currentPrice + increase + variation).toFixed(2));
    const confidenceLow = Number((price * 0.92).toFixed(2));
    const confidenceHigh = Number((price * 1.08).toFixed(2));

    return {
      month,
      price,
      confidenceLow,
      confidenceHigh,
      forecast: true
    };
  });
};

export const products = [
  {
    id: 'carrots',
    name: 'Carrots',
    emoji: '🥕',
    category: 'Vegetables',
    currentPrice: 0.89,
    unit: 'lb',
    trend: 'up',
    priceChange: '+15%',
    priceChangeValue: 15,
    historicalData: generateHistoricalData(0.75),
    forecastData: generateForecastData(0.89, 'up'),
    confidence: 87,
    recommendation: 'BUY_NOW',
    recommendationText: 'Price expected to rise significantly. Recommend purchasing within next 2 weeks.',
    optimalWindow: { start: '2025-11-13', end: '2025-11-27' },
    forecastPrice: 1.15,
    forecastChange: '+29%',
    forecastChangeValue: 29
  },
  {
    id: 'potatoes',
    name: 'Potatoes',
    emoji: '🥔',
    category: 'Vegetables',
    currentPrice: 0.67,
    unit: 'lb',
    trend: 'stable',
    priceChange: '+2%',
    priceChangeValue: 2,
    historicalData: generateHistoricalData(0.65, 0.05),
    forecastData: generateForecastData(0.67, 'up'),
    confidence: 92,
    recommendation: 'MONITOR',
    recommendationText: 'Prices stable. Continue monitoring for optimal purchase timing.',
    optimalWindow: { start: '2025-11-20', end: '2025-12-10' },
    forecastPrice: 0.71,
    forecastChange: '+6%',
    forecastChangeValue: 6
  },
  {
    id: 'tomatoes',
    name: 'Tomatoes',
    emoji: '🍅',
    category: 'Vegetables',
    currentPrice: 2.45,
    unit: 'lb',
    trend: 'up',
    priceChange: '+23%',
    priceChangeValue: 23,
    historicalData: generateHistoricalData(1.95),
    forecastData: generateForecastData(2.45, 'up'),
    confidence: 78,
    recommendation: 'BUY_NOW',
    recommendationText: 'Drought conditions affecting supply. Prices expected to continue rising.',
    optimalWindow: { start: '2025-11-13', end: '2025-11-20' },
    forecastPrice: 3.12,
    forecastChange: '+27%',
    forecastChangeValue: 27
  },
  {
    id: 'lettuce',
    name: 'Lettuce',
    emoji: '🥬',
    category: 'Vegetables',
    currentPrice: 1.89,
    unit: 'head',
    trend: 'down',
    priceChange: '-8%',
    priceChangeValue: -8,
    historicalData: generateHistoricalData(2.05, 0.12),
    forecastData: generateForecastData(1.89, 'down'),
    confidence: 84,
    recommendation: 'WAIT',
    recommendationText: 'Prices trending downward. Wait 2-3 weeks for better pricing.',
    optimalWindow: { start: '2025-11-27', end: '2025-12-11' },
    forecastPrice: 1.68,
    forecastChange: '-11%',
    forecastChangeValue: -11
  },
  {
    id: 'apples',
    name: 'Apples',
    emoji: '🍎',
    category: 'Fruits',
    currentPrice: 1.34,
    unit: 'lb',
    trend: 'stable',
    priceChange: '+3%',
    priceChangeValue: 3,
    historicalData: generateHistoricalData(1.30, 0.08),
    forecastData: generateForecastData(1.34, 'up'),
    confidence: 91,
    recommendation: 'MONITOR',
    recommendationText: 'Harvest season ending. Prices may increase slightly in coming months.',
    optimalWindow: { start: '2025-11-13', end: '2025-11-30' },
    forecastPrice: 1.48,
    forecastChange: '+10%',
    forecastChangeValue: 10
  },
  {
    id: 'bananas',
    name: 'Bananas',
    emoji: '🍌',
    category: 'Fruits',
    currentPrice: 0.58,
    unit: 'lb',
    trend: 'up',
    priceChange: '+12%',
    priceChangeValue: 12,
    historicalData: generateHistoricalData(0.52, 0.06),
    forecastData: generateForecastData(0.58, 'up'),
    confidence: 76,
    recommendation: 'BUY_NOW',
    recommendationText: 'Supply chain disruptions expected. Purchase sooner rather than later.',
    optimalWindow: { start: '2025-11-13', end: '2025-11-23' },
    forecastPrice: 0.69,
    forecastChange: '+19%',
    forecastChangeValue: 19
  }
];

export const risks = [
  {
    id: 'risk-1',
    category: 'Weather',
    severity: 'High',
    title: 'Extended drought conditions in California',
    description: 'Severe drought affecting major agricultural regions in California. Water restrictions impacting crop yields, particularly for water-intensive vegetables. Expected to continue through Q1 2026.',
    affectedProducts: ['Carrots', 'Lettuce', 'Tomatoes'],
    date: '2025-11-10',
    region: 'California',
    impact: 'Price increases of 15-30% expected for affected crops'
  },
  {
    id: 'risk-2',
    category: 'Supply Chain',
    severity: 'Medium',
    title: 'Port delays affecting banana imports',
    description: 'Container ship congestion at major West Coast ports causing delays in banana shipments from Central America. Average delay time: 5-7 days.',
    affectedProducts: ['Bananas'],
    date: '2025-11-12',
    region: 'United States',
    impact: 'Limited supply, prices up 10-15%'
  },
  {
    id: 'risk-3',
    category: 'Disease',
    severity: 'Medium',
    title: 'Citrus greening disease spreading in Florida',
    description: 'Bacterial disease continues to spread through Florida citrus groves, reducing orange and grapefruit production by estimated 20% this season.',
    affectedProducts: ['Oranges', 'Grapefruits'],
    date: '2025-11-09',
    region: 'Florida',
    impact: 'Reduced availability, higher prices expected'
  },
  {
    id: 'risk-4',
    category: 'Weather',
    severity: 'Low',
    title: 'Favorable weather boosting potato harvest',
    description: 'Ideal growing conditions in Idaho and Washington resulting in above-average potato yields. Early harvest reports show 15% increase in production.',
    affectedProducts: ['Potatoes'],
    date: '2025-11-11',
    region: 'Pacific Northwest',
    impact: 'Increased supply, stable to lower prices'
  },
  {
    id: 'risk-5',
    category: 'Labor',
    severity: 'High',
    title: 'Farm worker shortage impacting harvests',
    description: 'Significant labor shortage affecting harvest operations across multiple states. Many farms operating at 60% capacity, leading to crop losses.',
    affectedProducts: ['Tomatoes', 'Lettuce', 'Apples', 'Strawberries'],
    date: '2025-11-08',
    region: 'Multiple States',
    impact: 'Delayed harvests, potential price volatility'
  },
  {
    id: 'risk-6',
    category: 'Trade',
    severity: 'Medium',
    title: 'New tariffs on imported vegetables',
    description: 'Recently announced tariffs on vegetable imports from Mexico taking effect next month. 15% tariff on tomatoes, peppers, and cucumbers.',
    affectedProducts: ['Tomatoes', 'Peppers', 'Cucumbers'],
    date: '2025-11-07',
    region: 'Mexico/US Border',
    impact: 'Price increases of 12-18% anticipated'
  },
  {
    id: 'risk-7',
    category: 'Weather',
    severity: 'Medium',
    title: 'Early frost threatens lettuce crop',
    description: 'Unseasonably early frost warning for Salinas Valley, major lettuce-producing region. Growers implementing protective measures.',
    affectedProducts: ['Lettuce', 'Spinach', 'Leafy Greens'],
    date: '2025-11-12',
    region: 'California',
    impact: 'Potential crop damage, supply concerns'
  },
  {
    id: 'risk-8',
    category: 'Economic',
    severity: 'Low',
    title: 'Fuel prices declining, reducing transport costs',
    description: 'Diesel fuel prices down 8% from last month, lowering transportation costs for produce distribution across the country.',
    affectedProducts: ['All Categories'],
    date: '2025-11-11',
    region: 'National',
    impact: 'Modest downward pressure on prices'
  },
  {
    id: 'risk-9',
    category: 'Disease',
    severity: 'High',
    title: 'Apple scab outbreak in Washington orchards',
    description: 'Fungal disease affecting apple crops in Washington state. Wet conditions creating favorable environment for disease spread.',
    affectedProducts: ['Apples'],
    date: '2025-11-06',
    region: 'Washington',
    impact: 'Reduced quality, 10-15% yield loss expected'
  },
  {
    id: 'risk-10',
    category: 'Supply Chain',
    severity: 'Medium',
    title: 'Cold storage capacity constraints',
    description: 'Limited cold storage availability in major distribution hubs due to facility maintenance and high demand. May affect perishable goods.',
    affectedProducts: ['Apples', 'Carrots', 'Potatoes'],
    date: '2025-11-10',
    region: 'Midwest',
    impact: 'Potential supply bottlenecks'
  }
];

// Combine historical and forecast data for detailed charts
export const getProductChartData = (productId) => {
  const product = products.find(p => p.id === productId);
  if (!product) return [];

  // Take last 6 months of historical data
  const recentHistorical = product.historicalData.slice(-6);

  return [...recentHistorical, ...product.forecastData];
};

// Get mini sparkline data (last 8 data points)
export const getMiniChartData = (productId) => {
  const product = products.find(p => p.id === productId);
  if (!product) return [];

  return product.historicalData.slice(-8);
};
