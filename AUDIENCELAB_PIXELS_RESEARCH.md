# AudienceLab Pixels Page Research

**URL:** https://build.audiencelab.io/home/onboarding/pixel

## Page Structure

### Header
- Page title: "Manage Pixels"
- Subtitle: "0 Pixels"
- **Create** button (top right, black background)

### Available Pixel Actions (Blue info box)
- **See Resolutions** button (with chart icon)
- **Install** button (with code icon)
- **Webhook** button (with webhook icon)
- **Delete** button (with trash icon)

### Search & Filters
- Search input: "Search by name..."
- No additional filters visible

### Table Columns
1. **Website Name** - Pixel name (sortable)
2. **Website Url** - URL where pixel is installed
3. **Last Sync** - Date/time last synced (sortable)

### Empty State
- "No results." message shown when no pixels exist

### Pagination
- "Rows per page: 10" dropdown
- "Page 0 of 0"
- Navigation arrows: « ‹ › »

## Key Differences from Our Implementation

**AudienceLab has:**
- ✅ "Available Pixel Actions" info box with 4 action buttons
- ✅ 3 columns (Website Name, Website Url, Last Sync)
- ✅ Sortable columns
- ✅ Pagination controls
- ✅ Rows per page selector
- ✅ Search by name

**Our current implementation:**
- ❌ No "Available Pixel Actions" box
- ❌ Different columns (Name, Install URL, Created Date)
- ❌ No sorting
- ❌ Basic pagination
- ❌ May have different action buttons

## Simplification Strategy

To match AudienceLab exactly, we need to:
1. Add "Available Pixel Actions" blue info box with 4 buttons
2. Update table columns to: Website Name, Website Url, Last Sync
3. Implement sortable column headers
4. Add pagination with rows per page selector
5. Keep search functionality
6. Keep Create button
7. Match empty state message

**Note:** Like Audiences, this is MORE complex than expected!
