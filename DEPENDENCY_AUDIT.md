# Dependency Audit Report

**Date**: December 11, 2024  
**Project**: audiencelab-enrichment  
**Total Dependencies**: 92 (62 production + 30 dev)  
**Total Installed Packages**: 721 (including transitive dependencies)  
**node_modules Size**: 519MB

---

## 🔴 Security Issues

### Critical Vulnerabilities
1. **tar** (via @tailwindcss/vite → @tailwindcss/oxide)
   - Action: Update to 7.5.2
   - Severity: Unknown (needs review)

2. **glob** (via @vercel/node → @vercel/nft)
   - Action: Update to 10.5.0
   - Severity: Unknown (needs review)

3. **undici** (via @vercel/node)
   - Action: Review required
   - Multiple vulnerabilities (IDs: 1101610, 1104501)

---

## 🟡 Unused Dependencies (Can Be Removed)

### Production Dependencies
1. **framer-motion** (0 imports found)
   - Size impact: ~500KB
   - Recommendation: Remove

2. **dotenv** (0 imports found)
   - Note: Environment variables handled by Manus runtime
   - Recommendation: Remove

### Dev Dependencies
1. **add** (CLI tool, not a library)
   - Recommendation: Remove

2. **autoprefixer** (not configured)
   - Note: Tailwind CSS 4 has built-in autoprefixing
   - Recommendation: Remove

3. **@tailwindcss/typography** (not used)
   - Recommendation: Remove unless planning to use prose classes

4. **@vercel/node** (not needed for Manus deployment)
   - Contains security vulnerabilities
   - Recommendation: Remove

5. **tw-animate-css** (not imported)
   - Recommendation: Remove (using tailwindcss-animate instead)

---

## 🟢 Dependencies in Use (Keep)

### Core Framework
- react, react-dom (19.2.0)
- vite (7.1.7)
- typescript (5.9.3)
- wouter (3.3.5) - with custom patch

### UI Components (Radix UI)
All Radix UI components appear to be in use:
- accordion, alert-dialog, checkbox, collapsible
- dialog, dropdown-menu, label, popover
- radio-group, scroll-area, select, separator
- slider, slot, switch, tabs, tooltip

### State Management & Data Fetching
- @tanstack/react-query (5.90.5)
- @trpc/client, @trpc/server, @trpc/react-query (11.7.1)

### Database
- drizzle-orm (0.44.7)
- drizzle-kit (0.31.6)
- mysql2 (3.15.3)

### AWS/Storage
- @aws-sdk/client-s3 (3.921.0)
- @aws-sdk/s3-request-presigner (3.921.0)

### Utilities
- axios (1.12.0) - HTTP client
- zod (4.1.12) - Validation
- jose (6.1.0) - JWT handling
- clsx, tailwind-merge, class-variance-authority - CSS utilities
- lucide-react (0.453.0) - Icons
- sonner (2.0.7) - Toast notifications

### Forms & Data Display
- react-hook-form (7.64.0)
- react-day-picker (9.11.1)
- recharts (2.15.2)
- cmdk (1.1.1) - Command palette
- input-otp (1.4.2)
- embla-carousel-react (8.6.0)
- react-resizable-panels (3.0.6)
- vaul (1.1.2) - Drawer component

---

## 📊 Size Analysis

### Largest Dependencies
1. @radix-ui/* - 216KB (multiple packages)
2. @smithy/* - 192KB (AWS SDK dependencies)
3. @aws-sdk/* - 128KB
4. @babel/* - 64KB
5. @types/* - 52KB

### Bundle Size (Production Build)
- Frontend JS: 996KB (gzipped: 262KB) ⚠️ **Large!**
- Frontend CSS: 128KB (gzipped: 20KB)
- Server JS: 22.6KB

**Warning**: Frontend bundle exceeds 500KB recommendation. Consider code splitting.

---

## 🎯 Recommendations

### Immediate Actions (Remove Unused)
```bash
pnpm remove framer-motion dotenv add autoprefixer @tailwindcss/typography @vercel/node tw-animate-css
```

**Expected Impact**:
- Reduce node_modules by ~50MB
- Remove 3 security vulnerabilities
- Faster install times
- Cleaner dependency tree

### Security Updates
```bash
pnpm update tar glob
pnpm audit --fix
```

### Bundle Size Optimization
1. **Code Splitting**: Implement dynamic imports for large routes
2. **Tree Shaking**: Verify all imports are ESM-compatible
3. **Lazy Loading**: Load Spark V2 and other features on demand

### Future Considerations
1. **Radix UI**: Consider using only needed components via tree-shaking
2. **AWS SDK**: Use modular imports to reduce bundle size
3. **Recharts**: Heavy library (~200KB), consider lighter alternatives if not heavily used

---

## 📝 Notes

- **Dev server instability** is likely NOT caused by dependency conflicts
- More likely causes:
  1. Large bundle size (996KB) causing memory pressure
  2. Hot Module Replacement (HMR) issues with React 19
  3. Vite 7 compatibility issues
  4. Memory constraints in sandbox environment

- **Recommended next steps**:
  1. Remove unused dependencies (immediate)
  2. Implement code splitting (medium priority)
  3. Monitor dev server after cleanup
  4. Consider upgrading to stable React/Vite versions if issues persist
