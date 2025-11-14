# Nuturaa Design System

Complete design system documentation covering colors, typography, components, patterns, and accessibility guidelines.

---

## Design Principles

### 1. **Professional & Trustworthy**
Food bank procurement decisions involve significant budgets. The design must inspire confidence and professionalism.

### 2. **Avoid "AI Slop" Patterns**
- ❌ No purple gradients
- ❌ No excessive centering
- ❌ No uniform rounded corners everywhere
- ❌ No Inter font (use Work Sans instead)
- ✅ Left-aligned, asymmetric layouts
- ✅ Varied corner radii for visual interest
- ✅ Intentional, purposeful design choices

### 3. **Accessibility First**
- WCAG 2.1 AA compliance minimum
- 44px touch targets for mobile
- Clear contrast ratios (4.5:1 minimum)
- Keyboard navigation support

### 4. **Data-Driven**
Charts and visualizations are primary UI elements. They must be clear, readable, and actionable.

---

## Color Palette

### Primary Colors

```css
/* Emerald - Primary Brand */
--emerald-50:  #ecfdf5;
--emerald-100: #d1fae5;
--emerald-200: #a7f3d0;
--emerald-300: #6ee7b7;
--emerald-400: #34d399;
--emerald-500: #10b981;
--emerald-600: #059669;  /* Actions, Success */
--emerald-700: #047857;  /* Primary Brand */
--emerald-800: #065f46;
--emerald-900: #064e3b;
```

**Usage:**
- Primary buttons: `bg-emerald-700`
- Hover states: `bg-emerald-800`
- Success indicators: `bg-emerald-600`
- Buy recommendations: `bg-emerald-50` with `border-emerald-600`

### Secondary Colors

```css
/* Blue - Data & Trust */
--blue-600: #2563EB;  /* Historical data in charts */
--blue-800: #1E40AF;  /* Secondary brand color */

/* Cyan - Accents */
--cyan-600: #0891B2;  /* Interactive highlights */
```

### Semantic Colors

```css
/* Success / Buy Signals */
--success: #059669;  /* Downward price trends (good for buyers) */

/* Warning */
--warning: #D97706;  /* amber-600 - Caution states */

/* Danger / Price Increases */
--danger: #DC2626;   /* red-600 - Upward price trends */

/* Info */
--info: #2563EB;     /* blue-600 - Informational */
```

### Neutral Palette

```css
/* Stone - Warm Neutrals */
--stone-50:  #FAFAF9;  /* Background */
--stone-100: #F5F5F4;  /* Card backgrounds (alternative) */
--stone-200: #E7E5E4;  /* Borders */
--stone-300: #D6D3D1;  /* Input borders */
--stone-400: #A8A29E;  /* Tertiary text */
--stone-500: #78716C;  /* Placeholder text */
--stone-600: #57534E;  /* Secondary text */
--stone-700: #44403C;  /* Interactive text */
--stone-800: #292524;  /* High contrast text */
--stone-900: #1C1917;  /* Primary text */
```

**Usage:**
- Background: `bg-stone-50`
- Cards: `bg-white` with `border-stone-200`
- Text primary: `text-stone-900`
- Text secondary: `text-stone-600`
- Disabled states: `bg-stone-300 text-stone-500`

### Contrast Ratios

| Combination | Ratio | WCAG Level |
|-------------|-------|------------|
| stone-900 on white | 16.1:1 | AAA ✅ |
| stone-600 on white | 7.5:1 | AAA ✅ |
| emerald-700 on white | 6.8:1 | AAA ✅ |
| white on emerald-700 | 6.8:1 | AAA ✅ |

---

## Typography

### Font Families

**Primary Font:** Plus Jakarta Sans (Gilroy-style professional alternative)
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

font-family: 'Plus Jakarta Sans', sans-serif;
```

**Rationale:** Plus Jakarta Sans is a professional, geometric sans-serif font that provides:
- Modern, clean aesthetic similar to Gilroy
- Excellent readability across all sizes
- Professional appearance for enterprise applications
- Superior number legibility for data-heavy interfaces
- Consistent weight distribution across all font weights

### Type Scale

```css
/* Display / Hero */
.text-4xl  { font-size: 36px; line-height: 40px; font-weight: 700; }

/* H1 */
.text-3xl  { font-size: 30px; line-height: 36px; font-weight: 600; }

/* H2 */
.text-2xl  { font-size: 24px; line-height: 32px; font-weight: 600; }

/* H3 */
.text-xl   { font-size: 20px; line-height: 28px; font-weight: 500; }

/* Body Large */
.text-lg   { font-size: 18px; line-height: 28px; font-weight: 400; }

/* Body */
.text-base { font-size: 16px; line-height: 24px; font-weight: 400; }

/* Body Small */
.text-sm   { font-size: 14px; line-height: 20px; font-weight: 400; }

/* Caption */
.text-xs   { font-size: 12px; line-height: 16px; font-weight: 500; }
```

### Font Weights

```css
font-weight: 400;  /* Normal - Body text */
font-weight: 500;  /* Medium - Subheadings, secondary info */
font-weight: 600;  /* Semibold - Headings */
font-weight: 700;  /* Bold - Primary headings, emphasis */
font-weight: 800;  /* Extra Bold - Hero text, major headings */
```

**Usage Guidelines:**
- Body text: 400
- Labels and secondary text: 500
- Section headings: 600
- Page headings and important data: 700
- Hero sections and primary headings: 800

### Responsive Typography

```css
/* Mobile: Base sizes */
@media (min-width: 640px) {
  /* Tablet: +2px on headings */
}

@media (min-width: 1024px) {
  /* Desktop: +4px on headings */
}
```

**Example:**
```jsx
<h1 className="text-2xl sm:text-3xl font-semibold">
  Dashboard
</h1>
```

---

## Spacing System

### Scale

Based on Tailwind's 4px base unit:

```css
space-1:  4px   /* gap-1 */
space-2:  8px   /* gap-2 - Micro spacing (icon + text) */
space-3:  12px  /* gap-3 */
space-4:  16px  /* gap-4 - Small spacing (form fields, list items) */
space-6:  24px  /* gap-6 - Medium spacing (card sections) */
space-8:  32px  /* gap-8 - Large spacing (major sections) */
space-12: 48px  /* gap-12 - Section spacing */
space-16: 64px  /* gap-16 - Page sections */
```

### Padding Guidelines

```css
/* Cards */
p-4:  16px  /* Dense cards, mobile */
p-6:  24px  /* Standard cards */
p-8:  32px  /* Spacious cards, desktop */

/* Page Containers */
px-4 py-4:     Mobile (16px horizontal, 16px vertical)
px-6 py-6:     Tablet (24px horizontal, 24px vertical)
px-8 py-8:     Desktop (32px horizontal, 32px vertical)
```

### Responsive Spacing

```jsx
<div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
  {/* Content */}
</div>
```

---

## Border Radius

Strategic variation for visual interest:

```css
rounded-sm:   2px   /* Rarely used */
rounded:      4px   /* Rarely used */
rounded-md:   6px   /* Badges, small buttons */
rounded-lg:   8px   /* Cards, inputs */
rounded-xl:   12px  /* Modals, dialogs */
rounded-2xl:  16px  /* Large containers */
rounded-full: 50%   /* Avatars, icon buttons only */
```

**Guidelines:**
- Small elements (badges, pills): `rounded-md`
- Cards: `rounded-lg`
- Modals: `rounded-xl`
- **Never** use `rounded-full` except for avatars or circular icons

---

## Shadows

Subtle depth hierarchy:

```css
/* Rest State */
shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.05)          /* Cards */

/* Hover / Lifted */
shadow-md:  0 4px 6px -1px rgba(0, 0, 0, 0.1)      /* Card hover */

/* Floating / Modals */
shadow-lg:  0 10px 15px -3px rgba(0, 0, 0, 0.1)    /* Popovers, dropdowns */

/* NEVER USE */
shadow-2xl: TOO HEAVY
```

**Guidelines:**
- Default cards: `shadow-sm`
- Hover state: `shadow-md`
- Modals/Tooltips: `shadow-lg`

---

## Components

### Buttons

#### Primary Button

```jsx
<button className="bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-medium px-6 py-2.5 rounded-md shadow-sm transition-all duration-200">
  Primary Action
</button>
```

**States:**
- Default: `bg-emerald-700`
- Hover: `bg-emerald-800`
- Active: `bg-emerald-900` (optional)
- Disabled: `bg-stone-300 cursor-not-allowed`
- Loading: Show spinner + "Processing..."

#### Secondary Button

```jsx
<button className="bg-white hover:bg-stone-50 text-stone-900 font-medium px-6 py-2.5 rounded-md border border-stone-300 shadow-sm transition-all duration-200">
  Secondary Action
</button>
```

#### Destructive Button

```jsx
<button className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2.5 rounded-md shadow-sm transition-all duration-200">
  Delete
</button>
```

#### Ghost/Tertiary Button

```jsx
<button className="text-stone-700 hover:bg-stone-100 font-medium px-4 py-2 rounded-md transition-all duration-200">
  Cancel
</button>
```

#### Icon Button

```jsx
<button className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors">
  <Bell className="w-5 h-5" />
</button>
```

### Cards

#### Standard Card

```jsx
<div className="bg-white rounded-lg shadow-sm border border-stone-200 p-6 hover:shadow-md transition-shadow duration-200">
  {/* Content */}
</div>
```

#### Alert Card

```jsx
<div className="bg-amber-50 rounded-lg border-l-4 border-amber-600 p-6">
  <div className="flex items-center gap-2 mb-2">
    <AlertCircle className="w-5 h-5 text-amber-700" />
    <h3 className="font-semibold text-amber-900">Warning</h3>
  </div>
  <p className="text-sm text-amber-800">Alert content...</p>
</div>
```

**Variants:**
- Info: `bg-blue-50 border-blue-600`
- Success: `bg-emerald-50 border-emerald-600`
- Error: `bg-red-50 border-red-600`
- Warning: `bg-amber-50 border-amber-600`

### Badges

```jsx
import Badge from './components/ui/Badge';

<Badge variant="success">Buy Now</Badge>
<Badge variant="warning">Monitor</Badge>
<Badge variant="danger">High Risk</Badge>
```

**Variants:**
- `default`: Gray background
- `success`: Emerald background
- `warning`: Amber background
- `danger`: Red background
- `info`: Blue background

### Form Inputs

#### Text Input

```jsx
<div>
  <label className="block text-sm font-medium text-stone-700 mb-2">
    Email address
  </label>
  <input
    type="email"
    className="w-full px-4 py-2.5 rounded-md border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600 focus:outline-none transition-colors"
    placeholder="you@example.com"
  />
</div>
```

**States:**
- Default: `border-stone-300`
- Focus: `border-emerald-600 ring-2 ring-emerald-600`
- Error: `border-red-300 focus:border-red-600 focus:ring-red-600`
- Disabled: `bg-stone-100 cursor-not-allowed`

#### Select Dropdown

```jsx
<select className="px-4 py-2 rounded-md border border-stone-300 text-sm font-medium text-stone-700 bg-white hover:border-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-colors">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

#### Toggle Switch

```jsx
<label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" className="sr-only peer" />
  <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
</label>
```

### Charts

#### Line Chart Configuration

```jsx
<ResponsiveContainer width="100%" height={400}>
  <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
    <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" vertical={false} />
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
    <Line
      type="monotone"
      dataKey="price"
      stroke="#2563EB"
      strokeWidth={2.5}
      dot={false}
      activeDot={{ r: 6 }}
    />
  </LineChart>
</ResponsiveContainer>
```

**Color Palette for Charts:**
```javascript
const chartColors = {
  historical: '#2563EB',    // blue-600
  predicted: '#059669',     // emerald-600
  confidence: '#94A3B8',    // slate-400
  alert: '#DC2626',         // red-600
  positive: '#059669',      // emerald (price decrease = good)
  negative: '#DC2626',      // red (price increase = bad)
};
```

---

## Layout Patterns

### Asymmetric Grid (2:1)

```jsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="lg:col-span-2">
    {/* Main content (66%) */}
  </div>
  <div className="lg:col-span-1">
    {/* Sidebar (33%) */}
  </div>
</div>
```

### Responsive Grid

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

- Mobile: 1 column
- Tablet (768px+): 2 columns
- Desktop (1024px+): 3 columns

### Sticky Sidebar

```jsx
<aside className="lg:col-span-1">
  <div className="lg:sticky lg:top-24">
    {/* Sidebar content */}
  </div>
</aside>
```

**Note:** Only sticky on desktop (`lg:sticky`), stacks normally on mobile.

---

## Responsive Breakpoints

```css
/* Tailwind Breakpoints */
sm:  640px   /* Tablet */
md:  768px   /* Small desktop */
lg:  1024px  /* Desktop */
xl:  1280px  /* Large desktop */
2xl: 1536px  /* Extra large */
```

### Mobile-First Approach

```jsx
/* Base styles = Mobile */
<div className="text-base p-4">

/* Tablet overrides */
<div className="text-base sm:text-lg p-4 sm:p-6">

/* Desktop overrides */
<div className="text-base sm:text-lg lg:text-xl p-4 sm:p-6 lg:p-8">
```

---

## Accessibility Guidelines

### Keyboard Navigation

**All interactive elements must be keyboard accessible:**

```jsx
/* Good - Proper button element */
<button onClick={handleClick}>Click me</button>

/* Bad - Non-semantic div */
<div onClick={handleClick}>Click me</div>

/* If you must use div, add keyboard support */
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Click me
</div>
```

### Focus States

All interactive elements must have visible focus states:

```css
/* Default browser outline (OK but not beautiful) */
:focus {
  outline: 2px solid blue;
}

/* Better custom focus ring */
.focus\:ring-2:focus {
  outline: none;
  box-shadow: 0 0 0 2px #047857;
}
```

### ARIA Labels

```jsx
/* Icon-only buttons need labels */
<button aria-label="Open notifications">
  <Bell className="w-5 h-5" />
</button>

/* Form inputs need labels */
<label htmlFor="email">Email</label>
<input id="email" type="email" />

/* Loading states */
<button aria-busy="true" aria-label="Loading...">
  <Spinner />
</button>
```

### Color Contrast

**Minimum ratios:**
- Normal text (16px): 4.5:1
- Large text (24px): 3:1
- UI components: 3:1

**Test with:**
```bash
# Chrome DevTools
Lighthouse > Accessibility audit

# Online tools
https://webaim.org/resources/contrastchecker/
```

### Touch Targets (Mobile)

**Minimum size: 44×44px**

```jsx
/* Good */
<button className="p-3">  {/* 44px × 44px minimum */}
  <Icon className="w-5 h-5" />
</button>

/* Bad - Too small */
<button className="p-1">  {/* Only 36px × 36px */}
  <Icon className="w-5 h-5" />
</button>
```

### Screen Reader Support

```jsx
/* Hide decorative icons from screen readers */
<ChevronRight aria-hidden="true" className="w-5 h-5" />

/* Skip navigation link */
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

/* Visually hidden but accessible */
<span className="sr-only">Loading...</span>
```

---

## Animation & Transitions

### Transition Durations

```css
transition-all duration-200   /* Default - Buttons, hover states */
transition-all duration-300   /* Moderate - Dropdowns, modals */
transition-all duration-500   /* Slow - Expansions, collapses */
```

### Easing Functions

```css
/* Default easing (ease-in-out) is usually best */
transition-all duration-200

/* Custom easing (if needed) */
transition-all duration-200 ease-[cubic-bezier(0.4, 0, 0.2, 1)]
```

### Hover Transitions

```jsx
<button className="bg-emerald-700 hover:bg-emerald-800 hover:shadow-md transition-all duration-200">
  Hover me
</button>
```

### Loading Spinners

```jsx
<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
```

---

## Dark Mode (Future)

**Planned but not implemented:**

```css
/* Light mode (default) */
--bg-primary: #FAFAF9;
--text-primary: #1C1917;

/* Dark mode */
@media (prefers-color-scheme: dark) {
  --bg-primary: #0F172A;  /* slate-900 */
  --text-primary: #F1F5F9; /* slate-100 */
}
```

---

## Component Library Status

| Component | Status | Documentation |
|-----------|--------|---------------|
| Button | ✅ Complete | Above |
| Badge | ✅ Complete | Above |
| Card | ✅ Complete | Above |
| Input | ✅ Complete | Above |
| Select | ✅ Complete | Above |
| Toggle | ✅ Complete | Above |
| Modal | ⏳ Planned | - |
| Dropdown | ⏳ Planned | - |
| Tabs | ✅ Complete | See Settings page |
| Table | ⏳ Planned | - |
| Pagination | ⏳ Planned | - |
| Breadcrumb | ✅ Complete | See ForecastDetail |
| Loading | ⏳ Planned | - |

---

## Testing Checklist

### Visual QA

- [ ] Verify all text has proper contrast (4.5:1 minimum)
- [ ] Check spacing is consistent (no random margins/padding)
- [ ] Ensure corner radius follows system (no random values)
- [ ] Verify shadow usage is consistent
- [ ] Check hover states on all interactive elements
- [ ] Test focus states for keyboard navigation
- [ ] Verify mobile touch targets (44px minimum)

### Responsive Testing

- [ ] Test on iPhone SE (375px width)
- [ ] Test on iPad (768px width)
- [ ] Test on Desktop (1280px width)
- [ ] Test on Large Desktop (1920px width)
- [ ] Verify no horizontal scroll at any breakpoint
- [ ] Check that text is readable on all screen sizes

### Accessibility Testing

- [ ] Run Lighthouse accessibility audit (>90 score)
- [ ] Test keyboard navigation (Tab through all elements)
- [ ] Test with screen reader (VoiceOver/NVDA)
- [ ] Verify ARIA labels on icon buttons
- [ ] Check focus indicators are visible
- [ ] Ensure form labels are associated with inputs

---

## Resources

**Design Tools:**
- Tailwind CSS Docs: https://tailwindcss.com/docs
- Lucide Icons: https://lucide.dev
- Recharts: https://recharts.org

**Accessibility:**
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- A11y Project: https://www.a11yproject.com

**Typography:**
- Google Fonts (Work Sans): https://fonts.google.com/specimen/Work+Sans
- Google Fonts (IBM Plex Mono): https://fonts.google.com/specimen/IBM+Plex+Mono

---

**Last Updated**: November 2025
**Maintained By**: Nuturaa Design Team
