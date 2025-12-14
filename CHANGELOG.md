# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-12-11

### Added - Spark V2 Smart Query Assistant

#### Core Features
- **ModeSelector Component**: Toggle between Intent Search and B2B Search modes
  - Intent Search: Find audiences by what they search for (OpenAI embeddings)
  - B2B Search: Find businesses by what they do/offer (BAAI/bge-large-en-v1.5)
  - Clear descriptions and examples for each mode
  - Visual icons (Brain for Intent, Building for B2B)

- **QueryInput Component**: Enhanced text input with validation
  - Real-time character and word count display
  - Optimal length indicator (2-10 words)
  - Mode-specific placeholder text
  - Enter key to search (Shift+Enter for new line)
  - Loading state with spinner

- **QueryQualityChecker Component**: Real-time query validation
  - 7-rule validation system with 0-100 scoring
  - Collapsible accordion interface (Radix UI)
  - Color-coded score badges (green/blue/yellow/red)
  - Star rating visualization (1-5 stars)
  - Detailed issue breakdown with suggestions
  - Passed rules display with checkmarks
  - Score breakdown statistics

- **AdvancedOptions Component**: Fine-tune search parameters
  - Context phrases: Add related terms to refine context
  - Lens selection: Choose perspective (brand, product, function, service, solution, event)
  - Granularity slider: Control specificity (1-5, Broad to Niche)
  - Collapsible interface to reduce clutter

- **SparkSearchPage**: Main search interface
  - Responsive 3-column layout (mode selector, query input, options)
  - Real-time quality checking as user types
  - Loading state for search operations
  - Clean, modern design with Tailwind CSS 4

#### Validation System

Implemented 7 query validation rules:

1. **Length Check**: Validates 2-10 words optimal range
   - Error if < 2 words
   - Warning if > 10 words
   - Bonus points for 3-6 words

2. **No Personas**: Prevents persona descriptors in Intent search
   - Detects: "people who", "users who", "customers who", etc.
   - Suggests focusing on search topics, not demographics

3. **No Audience Descriptors**: Removes intent language
   - Detects: "interested in", "looking for", "want to", etc.
   - Suggests using direct topic keywords

4. **No Hype Words**: Eliminates marketing language
   - Detects: "best", "top", "leading", "premium", etc.
   - Suggests objective descriptors

5. **Mode-Specific Validation**: Ensures query matches search mode
   - Intent: Warns if business indicators detected
   - B2B: Warns if intent indicators detected
   - Provides mode-switching suggestions

6. **Specificity Check**: Requires concrete terms
   - Detects: "stuff", "things", "various", "general", etc.
   - Suggests specific terminology

7. **No Questions**: Enforces keyword format
   - Detects question words and question marks
   - Suggests converting to keyword format

#### Scoring Algorithm

```typescript
// Base: (passed_rules / 7) * 100
// Bonus: +5 for optimal length (3-6 words)
// Penalty: -5 per critical error
```

Score ranges:
- 90-100: Excellent (⭐⭐⭐⭐⭐)
- 75-89: Good (⭐⭐⭐⭐☆)
- 60-74: Fair (⭐⭐⭐☆☆)
- 40-59: Poor (⭐⭐☆☆☆)
- 0-39: Very Poor (⭐☆☆☆☆)

#### UI/UX Improvements

- Added Sparkles icon to sidebar navigation
- Created `/spark` route with proper routing
- Integrated with existing app layout and theme
- Responsive design for mobile, tablet, desktop
- Accessible components using Radix UI primitives
- Consistent color scheme with existing dashboard

#### Technical Implementation

- **TypeScript**: Strict typing for all components and utilities
- **React 19**: Latest React features and performance
- **Radix UI**: Accessible primitives (Accordion, RadioGroup, Collapsible, Slider, Select)
- **Tailwind CSS 4**: Utility-first styling with custom components
- **shadcn/ui**: Pre-built, customizable UI components
- **Wouter**: Lightweight routing for `/spark` page

#### File Structure

```
client/src/features/spark/
├── components/
│   ├── ModeSelector.tsx          # 95 lines
│   ├── QueryInput.tsx            # 95 lines
│   ├── QueryQualityChecker.tsx   # 165 lines
│   └── AdvancedOptions.tsx       # 145 lines
├── utils/
│   └── queryValidation.ts        # 250 lines
├── types.ts                      # 60 lines
└── SparkSearchPage.tsx           # 85 lines
```

#### Documentation

- Created `SPARK_V2.md`: Comprehensive feature documentation
- Updated `README.md`: Added Spark V2 section
- Created validation examples and best practices guide
- Documented all 7 validation rules with examples

### Fixed

- **Build Error**: Moved Spark features from `client/features/` to `client/src/features/`
  - Fixed import path resolution for TypeScript
  - Updated App.tsx to use `@/` path alias
  - Resolved Docker build failure during deployment

- **TypeScript Errors**: Fixed typo in `queryValidation.ts`
  - Changed `vagueTerm s` to `vagueTerms` (space removed)
  - All type checks now pass

- **Icon Import**: Added Sparkles icon to `client/components/ui/icons.tsx`
  - Fixed missing icon export error
  - Sidebar now displays Spark V2 with sparkles icon

### Changed

- **Sidebar Navigation**: Updated to support external routes
  - Added `href` property support for nav items
  - Spark V2 link navigates to `/spark` route
  - Maintained backward compatibility with existing tabs

### Technical Details

#### Dependencies (No New Additions)

All components use existing dependencies:
- `@radix-ui/react-accordion`: ^1.2.12
- `@radix-ui/react-radio-group`: ^1.3.8
- `@radix-ui/react-collapsible`: ^1.1.12
- `@radix-ui/react-slider`: ^1.3.6
- `@radix-ui/react-select`: ^2.2.6
- `lucide-react`: ^0.453.0 (for icons)

#### Code Quality

- ✅ TypeScript strict mode compliance
- ✅ ESLint validation passed
- ✅ Prettier formatting applied
- ✅ Zero build warnings (except chunk size)
- ✅ All imports use path aliases
- ✅ Proper React.FC typing
- ✅ Named exports (no default exports)

#### Performance

- Debounced validation (300ms) to reduce re-renders
- Memoized validation results
- Efficient re-rendering with proper React hooks
- Minimal bundle size impact (~50KB uncompressed)

### Security

- No new security vulnerabilities introduced
- All user input properly validated
- No external API calls (validation is client-side)
- XSS protection through React's built-in escaping

---

## [1.0.0] - 2024-12-10

### Added - Initial Release

#### Core Features
- **CSV Upload & Validation**: Drag-and-drop or click to upload CSV files
- **Email Processing**: RFC 5322 compliant validation, duplicate detection
- **40+ Enrichment Fields**: Personal info, professional details, contact information
- **Parallel Batch Processing**: Process up to 1M+ emails with configurable concurrency
- **Real-Time Progress Tracking**: Live progress bar and batch completion status
- **Results Table**: Search, sort, paginate through enriched contacts
- **Export Functionality**: Download results as CSV or JSON

#### Credit System
- Real-time cost estimation
- Balance tracking
- Warning system for low credits
- Usage statistics

#### UI Components
- Header with credit display
- Sidebar navigation
- Progress tracker
- Results table
- Field selection (packages and custom)

#### Technical Stack
- React 19.2.0
- TypeScript 5.x
- Tailwind CSS (via CDN)
- Vite 6.4.1
- Lucide React icons

#### API Integration
- Mock API for testing
- Real AudienceLab API support
- Parallel batch processing
- Error handling and retry logic

### Documentation
- Comprehensive README.md
- Usage guide
- API integration guide
- Deployment instructions

---

## [v0.8.0] - 2025-12-13 (ccc89ad2)

### Added
- **Real-time Progress Polling** on Enrichments page
  - Automatic data refresh every 5 seconds when page is visible
  - Intelligent polling that stops when tab is inactive (`refetchIntervalInBackground: false`)
  - Pulsing green "Live" badge in header when active jobs exist
  - "Updated [time]" timestamp showing last data fetch
  - Smooth updates without flickering for stats cards, progress bars, and status badges

### Technical Details
- Implemented `refetchInterval: 5000` on tRPC query
- Added `dataUpdatedAt` tracking with useEffect hook
- Optimized for performance with background polling disabled

---

## [v0.7.0] - 2025-12-13 (bfc09b28)

### Added
- **API Integration** for Enrichments and Audiences pages
  - Connected Enrichments page to real AudienceLab API via `trpc.audienceLabAPI.enrichment.getJobs.useQuery()`
  - Audiences page already connected with full CRUD operations
  - Loading states with spinner animations
  - Error handling with user-friendly messages
  - Empty states with helpful guidance

### Changed
- Replaced mock enrichment data with live API calls
- Transformed API response to match UI interface

### Documentation
- Created `API_INTEGRATION_TEST.md` with comprehensive test results
- Created `TRPC_API_REFERENCE.md` documenting all available procedures

### Technical Details
- API key secured server-side (never exposed to client)
- Pagination support (page size: 100)
- Zero TypeScript errors

---

## [v0.6.0] - 2025-12-13 (ec328bd9)

### Added
- **Complete UI Redesign** matching Spark V2 theme
  - Redesigned Audiences page with consistent styling
  - Redesigned Enrichments page with consistent styling
  - Redesigned Pixels page with consistent styling
  - Unified gradient backgrounds (gray-50 to gray-100)
  - Consistent white headers with blue gradient icons
  - Standardized card styling (rounded-xl, shadow-sm, border-gray-200)
  - Unified typography (text-2xl for titles, text-sm for subtitles)
  - Professional blue info cards on all pages

### Documentation
- Created `SPARK_V2_STYLE_GUIDE.md` documenting design patterns
- Created `UI_REDESIGN_TEST.md` with test results

### Technical Details
- Zero TypeScript errors
- Fully tested in browser

---

## [v0.5.0] - 2025-12-13 (81742e3e)

### Added
- **Enrichment Details Modal**
  - Comprehensive modal displaying enrichment job details
  - Progress section with visual bar and percentage
  - Details grid (Created date, Duration, Success Rate, Type)
  - Scrollable activity log with color-coded messages (info/success/warning)
  - Contextual action buttons based on status:
    - Active: Pause + Delete
    - Pending: Start + Delete
    - Completed: Download Results + Delete
  - Multiple close methods (button/X/backdrop/ESC key)
  - Smooth animations and professional design
  - Max-width 3xl, max-height 80vh with scroll

### Fixed
- Modal background styling - added explicit `bg-white` and `dark:bg-gray-900`
- Modal content now clearly visible against dark overlay

### Documentation
- Created `MODAL_TEST.md` with comprehensive test results
- Created `MODAL_FIX_TEST.md` documenting background fix

### Technical Details
- Added Dialog and Separator components from shadcn/ui
- Zero TypeScript errors

---

## [v0.4.0] - 2025-12-13 (ce6a3e95)

### Added
- **Advanced Filtering System** for Enrichments page
  - Real-time search by enrichment name
  - Status filter buttons (All, Active, Pending, Completed) with color coding
  - Type filter dropdown (All Types, Contact, Company, Demographic)
  - Combined filtering (all filters work together)
  - Clear Filters button (appears when filters active)
  - Dynamic results counter ("Showing X of Y enrichments")
  - Professional empty state with helpful message
  - Instant client-side filtering

### Documentation
- Created `FILTERING_TEST.md` with comprehensive test results

### Technical Details
- Added Select component from shadcn/ui
- Zero TypeScript errors

---

## [v0.3.0] - 2025-12-13 (74836c6c)

### Added
- **Enrichments Page** with full UI
  - Navigation link in sidebar with Database icon
  - Route `/enrichments` in App.tsx
  - 4 stats cards (Total Enrichments, Active Jobs, Records Processed, Success Rate)
  - Search bar for filtering enrichments
  - 3 mock enrichment cards with progress bars
  - Status badges (Active, Completed, Pending)
  - Type badges (Contact, Company, Demographic)
  - "New Enrichment" button
  - Clean, professional design matching other pages

### Documentation
- Created `ENRICHMENTS_TEST.md` with test results

### Technical Details
- Added Badge component from shadcn/ui
- Zero TypeScript errors

---

## [v0.2.0] - 2025-12-13 (c0f2292e)

### Added
- **Navigation Menu** with sidebar
  - DashboardLayout component with 256px sidebar
  - Navigation links: Home, Spark V2, Audiences, Pixels
  - AudienceLab Vibe branding with gradient icon
  - Active state highlighting (blue background)
  - Routes for all pages in App.tsx
  - Home route redirects to Spark V2

### Fixed
- **Nested Anchor Tag Error** in DashboardLayout
  - Changed `<a>` to `<div>` inside `<Link>` components
  - Added `cursor-pointer` class to maintain clickable appearance
  - No console errors

### Documentation
- Created `NAVIGATION_TEST.md` with test results
- Created `GITHUB_PUSH_SUMMARY.md` documenting GitHub sync

### Technical Details
- Zero TypeScript errors
- All navigation tested in browser

---

## [v0.1.0] - 2025-12-13 (30df0d4f)

### Added
- **Initial Project Setup**
  - Web-static template with React 19 + Tailwind 4
  - shadcn/ui components integrated
  - tRPC client configured
  - Basic routing with Wouter
  - Theme provider (light mode default)
  - Error boundary
  - Toast notifications (Sonner)

### Features
- **Spark V2 Page** (SparkPage.tsx)
  - Query configuration with Intent Search and B2B Search modes
  - Query input with character/word counter
  - Advanced options section
  - Validation results panel
  - Clean, modern UI with gradient backgrounds

- **Audiences Page** (AudiencesPage.tsx)
  - List view with search functionality
  - Create audience dialog
  - Delete audience with confirmation
  - Pagination support
  - Loading and error states

- **Pixels Page** (PixelsPage.tsx)
  - Pixel tracking management interface
  - Create pixel functionality
  - Installation instructions
  - Event tracking display

### Technical Stack
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui components
- tRPC for API calls
- Wouter for routing
- Sonner for toasts

---

## Version History

| Version | Checkpoint | Date | Key Feature |
|---------|-----------|------|-------------|
| v0.8.0 | ccc89ad2 | 2025-12-13 | Real-time polling with live updates |
| v0.7.0 | bfc09b28 | 2025-12-13 | API integration for Enrichments & Audiences |
| v0.6.0 | ec328bd9 | 2025-12-13 | Complete UI redesign matching Spark V2 |
| v0.5.0 | 81742e3e | 2025-12-13 | Enrichment details modal with actions |
| v0.4.0 | ce6a3e95 | 2025-12-13 | Advanced filtering system |
| v0.3.0 | 74836c6c | 2025-12-13 | Enrichments page with full UI |
| v0.2.0 | c0f2292e | 2025-12-13 | Navigation menu and routing |
| v0.1.0 | 30df0d4f | 2025-12-13 | Initial project setup |
| v1.1.0 | - | 2024-12-11 | Spark V2 Smart Query Assistant |
| v1.0.0 | - | 2024-12-10 | Initial contact enrichment dashboard |

---

## Upcoming Features

### v1.2.0 (Planned)
- [ ] Spark API Integration: Connect to actual Spark search endpoints
- [ ] Query Templates Library: Pre-built query examples by category
- [ ] Export to AudienceLab: Save Spark results as audiences
- [ ] Query History: Store and re-run previous searches

### v1.3.0 (Planned)
- [ ] User Authentication: Login and account management
- [ ] Enrichment History: View past enrichment jobs
- [ ] Advanced Analytics: Query performance tracking
- [ ] Bulk Query Processing: Process multiple queries at once

### v2.0.0 (Future)
- [ ] CRM Integrations: Salesforce, HubSpot
- [ ] Team Collaboration: Shared queries and results
- [ ] A/B Testing: Compare query variations
- [ ] Real-time Notifications: Job completion alerts

---

## Migration Guide

### Upgrading from v1.0.0 to v1.1.0

No breaking changes. Spark V2 is an additive feature:

1. Pull latest code
2. Run `pnpm install` (no new dependencies)
3. Navigate to `/spark` to access Spark V2
4. Existing enrichment features unchanged

### Configuration Changes

None required. All Spark V2 features work out of the box.

---

## Contributors

- **roALAB1** - Initial development and Spark V2 implementation

---

## License

MIT License - see LICENSE file for details
