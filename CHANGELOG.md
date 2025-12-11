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

## Version History

- **v1.1.0** (2024-12-11): Added Spark V2 Smart Query Assistant with 7-rule validation system
- **v1.0.0** (2024-12-10): Initial release with contact enrichment dashboard

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
