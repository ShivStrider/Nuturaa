# DevOps Guide: Nuturaa Platform

Complete guide for building, testing, deploying, and maintaining the Nuturaa platform.

---

## Table of Contents

1. [Development Environment](#development-environment)
2. [Build Process](#build-process)
3. [Testing Strategy](#testing-strategy)
4. [Deployment](#deployment)
5. [Environment Configuration](#environment-configuration)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Monitoring & Performance](#monitoring--performance)
8. [Security](#security)
9. [Troubleshooting](#troubleshooting)
10. [Future Roadmap](#future-roadmap)

---

## Development Environment

### Prerequisites

```bash
# Required Software
Node.js >= 18.0.0
npm >= 9.0.0
Git >= 2.30.0

# Optional (Recommended)
VS Code with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets
```

### Initial Setup

```bash
# Clone repository
git clone https://github.com/yourusername/Nuturaa.git
cd Nuturaa

# Install dependencies
npm install

# Start development server
npm run dev

# Application will be available at:
# http://localhost:5173
```

### Project Structure

```
Nuturaa/
├── public/                    # Static assets
│   ├── _redirects            # Netlify routing config
│   └── vite.svg
├── src/
│   ├── assets/               # Images, fonts, icons
│   │   ├── logo-nuturaa.svg
│   │   └── Frame 62.png
│   ├── components/           # Reusable components
│   │   ├── Header.jsx
│   │   ├── ui/
│   │   │   └── Badge.jsx
│   │   ├── onboarding/
│   │   └── empty-states/
│   │       └── EmptyWatchlist.jsx
│   ├── data/                 # Mock data & utilities
│   │   └── mockData.js
│   ├── pages/                # Route components
│   │   ├── auth/
│   │   │   └── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Forecasts.jsx
│   │   ├── ForecastDetail.jsx
│   │   ├── RiskMonitor.jsx
│   │   ├── Settings.jsx
│   │   └── Onboarding.jsx
│   ├── App.jsx               # Root component with routing
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles & Tailwind
├── docs/                     # Documentation
│   ├── MARKET_ANALYSIS.md
│   ├── DEVOPS.md
│   └── DESIGN_SYSTEM.md
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── netlify.toml
└── README.md
```

---

## Build Process

### Development Build

```bash
# Start dev server with hot reload
npm run dev

# Runs on http://localhost:5173
# Hot Module Replacement (HMR) enabled
# Source maps enabled for debugging
```

### Production Build

```bash
# Create optimized production build
npm run build

# Output: dist/
# - Minified JavaScript
# - Optimized CSS
# - Compressed assets
# - Generated source maps
```

### Build Configuration

**vite.config.js**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts']
        }
      }
    }
  }
})
```

### Bundle Analysis

```bash
# Install bundle analyzer
npm install --save-dev rollup-plugin-visualizer

# Run build with analysis
npm run build
# Open stats.html to see bundle composition
```

**Current Bundle Size:**
- **Total**: 606KB gzipped
- **JavaScript**: 604KB (mainly Recharts)
- **CSS**: 21KB
- **Assets**: 34KB (logo)

**Optimization Targets:**
- Reduce to <300KB through code splitting
- Lazy load Recharts on forecast pages
- Implement route-based code splitting

---

## Testing Strategy

### Current State

⚠️ **Testing infrastructure not yet implemented**

### Recommended Testing Setup

#### Unit Tests (Jest + React Testing Library)

```bash
# Install dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Create jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js'
  }
};
```

**Example Test:**
```javascript
// src/components/__tests__/Badge.test.jsx
import { render, screen } from '@testing-library/react';
import Badge from '../ui/Badge';

describe('Badge Component', () => {
  test('renders with correct variant styling', () => {
    render(<Badge variant="success">Buy Now</Badge>);
    const badge = screen.getByText('Buy Now');
    expect(badge).toHaveClass('bg-emerald-100');
  });
});
```

#### Integration Tests

```bash
# Test user flows
npm run test:integration
```

**Key Flows to Test:**
- Login → Onboarding → Dashboard
- Add product to watchlist
- View forecast detail
- Filter risks
- Mobile menu navigation

#### E2E Tests (Playwright)

```bash
npm install --save-dev @playwright/test

# Run E2E tests
npx playwright test
```

**Example E2E Test:**
```javascript
// tests/auth-flow.spec.js
import { test, expect } from '@playwright/test';

test('complete onboarding flow', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'demo@foodbank.org');
  await page.fill('[name="password"]', 'demo123');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('/onboarding');

  // Complete onboarding steps...
  await page.click('button:has-text("Continue")');
  // ...
});
```

#### Visual Regression Tests (Percy/Chromatic)

```bash
npm install --save-dev @percy/cli @percy/playwright

# Run visual tests
npx percy exec -- npx playwright test
```

### Test Coverage Goals

| Category | Target Coverage |
|----------|----------------|
| Components | >80% |
| Pages | >70% |
| Utilities | >90% |
| E2E Critical Paths | 100% |

---

## Deployment

### Netlify (Current Setup)

#### Configuration

**netlify.toml**
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

#### Deployment Process

**Automatic Deployments:**
```bash
# Push to main branch triggers automatic deploy
git push origin main

# Netlify automatically:
# 1. Pulls latest code
# 2. Runs npm install
# 3. Runs npm run build
# 4. Deploys to production
```

**Manual Deployment:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy to production
netlify deploy --prod

# Deploy to preview
netlify deploy
```

#### Current Deployment

- **Production**: https://dulcet-moxie-25ade3.netlify.app/
- **Branch Deploys**: Enabled for all branches
- **Deploy Previews**: Enabled for pull requests

### Alternative Deployment Options

#### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production
vercel --prod
```

**vercel.json**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

#### AWS S3 + CloudFront

```bash
# Build
npm run build

# Sync to S3
aws s3 sync dist/ s3://nuturaa-app --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

#### Docker + Nginx

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## Environment Configuration

### Environment Variables

**Create `.env` files:**

**.env.development**
```bash
VITE_API_URL=http://localhost:3000/api
VITE_ENABLE_MOCK_DATA=true
VITE_ANALYTICS_ID=
```

**.env.production**
```bash
VITE_API_URL=https://api.nuturaa.com
VITE_ENABLE_MOCK_DATA=false
VITE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
```

**.env.staging**
```bash
VITE_API_URL=https://staging-api.nuturaa.com
VITE_ENABLE_MOCK_DATA=false
VITE_ANALYTICS_ID=G-STAGING-XXX
```

### Usage in Code

```javascript
// src/config.js
export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  useMockData: import.meta.env.VITE_ENABLE_MOCK_DATA === 'true',
  analyticsId: import.meta.env.VITE_ANALYTICS_ID,
};
```

### Netlify Environment Variables

Set in Netlify Dashboard → Site Settings → Build & Deploy → Environment Variables

```
VITE_API_URL=https://api.nuturaa.com
VITE_ANALYTICS_ID=G-XXXXXXXXXX
NODE_VERSION=18
```

---

## CI/CD Pipeline

### GitHub Actions (Recommended)

**.github/workflows/deploy.yml**
```yaml
name: Deploy to Netlify

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Run linter
        run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
          VITE_ANALYTICS_ID: ${{ secrets.VITE_ANALYTICS_ID }}

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/

      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist
        env:
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

### Pre-commit Hooks (Husky)

```bash
# Install Husky
npm install --save-dev husky lint-staged

# Initialize Husky
npx husky init

# Add pre-commit hook
echo "npx lint-staged" > .husky/pre-commit
```

**package.json**
```json
{
  "lint-staged": {
    "*.{js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{css,md}": ["prettier --write"]
  }
}
```

---

## Monitoring & Performance

### Performance Metrics

**Core Web Vitals Targets:**
- **LCP (Largest Contentful Paint)**: <2.5s
- **FID (First Input Delay)**: <100ms
- **CLS (Cumulative Layout Shift)**: <0.1

**Current Performance (Lighthouse):**
- Performance: 85/100
- Accessibility: 92/100
- Best Practices: 95/100
- SEO: 100/100

### Google Analytics

```javascript
// src/utils/analytics.js
export const initAnalytics = () => {
  if (import.meta.env.VITE_ANALYTICS_ID) {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_ANALYTICS_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', import.meta.env.VITE_ANALYTICS_ID);
  }
};

export const trackEvent = (action, category, label, value) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};
```

### Error Tracking (Sentry)

```bash
npm install @sentry/react @sentry/tracing
```

```javascript
// src/main.jsx
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 0.1,
  environment: import.meta.env.MODE,
});
```

### Performance Monitoring

```javascript
// src/utils/performance.js
export const measurePerformance = () => {
  if ('performance' in window) {
    const perfData = window.performance.getEntriesByType('navigation')[0];

    console.log('Performance Metrics:', {
      loadTime: perfData.loadEventEnd - perfData.fetchStart,
      domReady: perfData.domContentLoadedEventEnd - perfData.fetchStart,
      firstPaint: performance.getEntriesByType('paint')[0]?.startTime
    });
  }
};
```

---

## Security

### Security Headers

**netlify.toml**
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com"
```

### Authentication Best Practices

**Current (Mock):**
```javascript
localStorage.setItem('nuturaa_auth', 'mock_token');
```

**Production (Future):**
```javascript
// Use httpOnly cookies
// JWT with short expiration (15 min)
// Refresh token rotation
// CSRF protection
```

### Dependency Security

```bash
# Audit dependencies
npm audit

# Fix vulnerabilities
npm audit fix

# Check for outdated packages
npm outdated

# Update dependencies
npm update
```

### Environment Variable Security

⚠️ **Never commit `.env` files to Git!**

```bash
# .gitignore
.env
.env.local
.env.development
.env.production
```

---

## Troubleshooting

### Common Issues

#### Issue: Build fails with "out of memory"

**Solution:**
```bash
# Increase Node memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

#### Issue: Netlify deployment succeeds but shows blank page

**Cause:** React Router not handling client-side routing

**Solution:** Verify `public/_redirects` or `netlify.toml` redirect rules exist

#### Issue: Environment variables not working

**Cause:** Vite requires `VITE_` prefix

**Solution:**
```bash
# Wrong
API_URL=https://api.example.com

# Correct
VITE_API_URL=https://api.example.com
```

#### Issue: Chart not rendering on mobile

**Cause:** ResponsiveContainer needs explicit height

**Solution:**
```jsx
<div className="h-64">
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      {/* ... */}
    </LineChart>
  </ResponsiveContainer>
</div>
```

### Debug Mode

```bash
# Enable debug logging
VITE_DEBUG=true npm run dev
```

```javascript
// src/utils/debug.js
export const debug = (...args) => {
  if (import.meta.env.VITE_DEBUG === 'true') {
    console.log('[DEBUG]', ...args);
  }
};
```

---

## Future Roadmap

### Phase 1: Testing Infrastructure (Q1 2026)
- [ ] Set up Jest + React Testing Library
- [ ] Write unit tests for all components (>80% coverage)
- [ ] Implement E2E tests with Playwright
- [ ] Add visual regression testing

### Phase 2: Backend Integration (Q2 2026)
- [ ] Build REST API with Express/NestJS
- [ ] Implement real authentication (JWT + refresh tokens)
- [ ] Connect to PostgreSQL database
- [ ] Set up API rate limiting & caching

### Phase 3: Advanced DevOps (Q2-Q3 2026)
- [ ] Implement feature flags (LaunchDarkly)
- [ ] Set up staging environment
- [ ] Add blue/green deployments
- [ ] Implement automated rollback on errors

### Phase 4: Observability (Q3 2026)
- [ ] Set up Datadog/New Relic APM
- [ ] Implement distributed tracing
- [ ] Create custom dashboards
- [ ] Set up PagerDuty alerts

### Phase 5: Scaling (Q4 2026)
- [ ] CDN optimization
- [ ] Database replication
- [ ] Horizontal scaling
- [ ] Multi-region deployment

---

## Quick Reference

### Useful Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Production build
npm run preview                # Preview production build locally

# Testing (Future)
npm test                       # Run unit tests
npm run test:watch             # Watch mode
npm run test:coverage          # Coverage report
npm run test:e2e               # E2E tests

# Code Quality (Future)
npm run lint                   # ESLint
npm run lint:fix               # Auto-fix linting issues
npm run format                 # Prettier

# Deployment
npm run deploy                 # Deploy to production
npm run deploy:staging         # Deploy to staging

# Analysis
npm run analyze                # Bundle analysis
npm run lighthouse             # Performance audit
```

### Support Contacts

- **Development Issues**: dev@nuturaa.com
- **DevOps/Infrastructure**: devops@nuturaa.com
- **Security Issues**: security@nuturaa.com

---

**Last Updated**: November 2025
**Maintained By**: Nuturaa Engineering Team
