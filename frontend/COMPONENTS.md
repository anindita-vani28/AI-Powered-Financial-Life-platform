# Frontend Components Documentation

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Layout.tsx       # Main app layout wrapper
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   └── Header.tsx       # Top header with search & notifications
│   └── dashboard/
│       ├── HealthScoreCard.tsx      # Financial health score visualization
│       ├── AlertsCard.tsx           # Real-time alerts display
│       ├── DocumentsCard.tsx        # Document management preview
│       ├── StatsCard.tsx            # Key metrics display
│       └── HealthScoreTrend.tsx     # Recharts trend visualization
├── services/
│   ├── api.ts              # Axios instance with interceptors
│   ├── healthScore.ts      # Health score API calls
│   ├── documents.ts        # Document API calls
│   └── alerts.ts           # Alerts API calls
├── types/
│   └── index.ts            # TypeScript interfaces
├── styles/
│   └── globals.css         # Tailwind + custom styles
└── pages/
    ├── _app.tsx            # App wrapper with React Query
    ├── index.tsx           # Landing page
    └── dashboard.tsx       # Main dashboard page
```

## Components Overview

### Layout Components

#### Layout.tsx
Main application wrapper combining sidebar and header.

```tsx
<Layout>
  {/* Page content goes here */}
</Layout>
```

**Features:**
- Responsive sidebar (mobile menu toggle)
- Sticky header with search
- Main content area with max-width
- Mobile-optimized navigation

#### Sidebar.tsx
Left navigation sidebar with links and user menu.

**Navigation Items:**
- Dashboard
- Health Score
- Documents
- Alerts
- Family
- Settings
- Logout

**Features:**
- Mobile collapse/expand
- Hover effects
- Active route highlighting (ready for integration)

#### Header.tsx
Top header with search, notifications, and user profile.

**Features:**
- Search bar with icon
- Bell notification icon with badge
- Notification dropdown (shows 5 recent alerts)
- User profile button
- Responsive design

### Dashboard Components

#### HealthScoreCard.tsx
Displays overall financial health score with breakdown.

**Features:**
- Circular progress visualization
- Score breakdown by category (Insurance, Tax, Credit, Claims)
- Progress bars for each category
- "View Detailed Report" button
- Loading states

**Props:**
```tsx
interface HealthScoreCardProps {
  onRefresh?: () => void;
}
```

#### AlertsCard.tsx
Shows recent high-priority alerts.

**Features:**
- Color-coded by priority (red, yellow, blue)
- Icons for alert types (renewal, deadline, opportunity)
- Link to full alerts page
- Empty state when no alerts
- Real-time updates ready

#### DocumentsCard.tsx
Preview of recent uploaded documents.

**Features:**
- Document type icons (insurance, tax, claim, credit)
- Hover effects
- View document action
- Empty state with upload prompt
- Document type filtering

#### StatsCard.tsx
Reusable card for displaying key metrics.

**Features:**
- Icon with color coding
- Large value display
- Optional trend indicator (+/- percentage)
- Subtitle text
- Customizable colors

**Props:**
```tsx
interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  trend?: { value: number; isPositive: boolean };
}
```

#### HealthScoreTrend.tsx
Line chart showing health score progression over time.

**Features:**
- Recharts LineChart visualization
- 6-month sample data
- Current/previous/change stats
- Responsive sizing
- Custom tooltip

### Service Layer

#### api.ts
Configured Axios instance with:
- Base URL from environment
- JWT token injection
- Automatic login redirect on 401
- Request/response interceptors

#### healthScore.ts
API methods:
```tsx
getHealthScore() -> Promise<FinancialHealthScore>
refreshHealthScore() -> Promise<FinancialHealthScore>
getHealthScoreHistory(limit) -> Promise<HealthScoreHistory[]>
```

#### documents.ts
API methods:
```tsx
getDocuments(filter?) -> Promise<Document[]>
uploadDocument(file, type) -> Promise<Document>
deleteDocument(id) -> Promise<void>
extractDocumentText(id) -> Promise<string>
```

#### alerts.ts
API methods:
```tsx
getAlerts(unreadOnly?) -> Promise<Alert[]>
markAsRead(id) -> Promise<void>
markAllAsRead() -> Promise<void>
deleteAlert(id) -> Promise<void>
```

## Pages

### index.tsx (Landing Page)
- Hero section with CTA
- Feature showcase (4 cards)
- Pricing/signup section
- Footer
- Navigation links to dashboard

### dashboard.tsx (Main Dashboard)
Grid layout with:
1. **Welcome section** with greeting
2. **Stats row** (4 cards with key metrics)
3. **Main content grid:**
   - Left: Health Score Card
   - Right: Alerts + Documents
4. **Trend section:** Health Score Trend chart
5. **Opportunities section:** 4 cards with actionable recommendations

## Styling

### TailwindCSS
- Responsive breakpoints (sm, md, lg)
- Color palette (blue, gray, red, yellow, green)
- Spacing scale (4px, 8px, 16px, etc.)
- Shadow and border utilities

### Custom Components
Added in globals.css:
- `.input-field` - Styled input elements
- `.btn-primary`, `.btn-secondary`, `.btn-ghost` - Button variants
- `.card` - Card styling
- `.fade-in`, `.slide-up` - Animation utilities

## TypeScript Types

Defined in `types/index.ts`:
- User
- Family / FamilyMember
- Document
- FinancialHealthScore / ScoreBreakdown
- Opportunity
- Alert
- InsurancePolicy
- Claim
- CreditInfo
- TaxInfo

## State Management

### React Query
- Configured in `_app.tsx`
- 5 minute stale time
- Auto-retry on failure
- Used for caching API responses

### Zustand (Ready)
- Store location: `src/hooks/` (to be created)
- For global UI state (sidebar open/close, etc.)

## Icons

Using **Lucide React** for icons:
- TrendingUp, FileText, AlertCircle, Users, Settings
- Menu, X, Bell, Search, Upload, Eye, LogOut
- And more...

## Responsive Design

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Mobile Optimizations:**
- Sidebar converts to mobile menu
- Stacked layout on smaller screens
- Touch-friendly button sizes
- Optimized font sizes

## Color Scheme

```css
Primary: Blue (#2563eb)
Secondary: Cyan (#06b6d4)
Danger: Red (#dc2626)
Warning: Yellow (#eab308)
Success: Green (#16a34a)
Gray: #f3f4f6 - #111827
```

## Next Steps

1. Connect API services to backend endpoints
2. Add authentication pages (login, signup)
3. Implement user profile management
4. Add document upload functionality
5. Create detailed health score report page
6. Build family member management UI
7. Add settings/preferences page
8. Implement real-time notifications (WebSocket)

## Development Commands

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npm run lint         # ESLint
npm test             # Jest tests
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)
