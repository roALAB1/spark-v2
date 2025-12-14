# AudienceLab Audience Lists Page Research

**URL:** https://build.audiencelab.io/home/onboarding (default landing page shows Audience Lists)

## Page Structure

### Header
- Page title: "Audience Lists"
- Subtitle: "3 Audience Lists"
- **Create** button (top right, black background)

### Search & Filters
- Search input: "Search by name..."
- No additional filters visible

### Table Columns
1. **Name** - Audience name (sortable)
2. **Status** - Badge showing "No Data", "Completed", etc.
3. **Creation Date** - Date/time created (sortable, currently sorted descending ↓)
4. **Last Refreshed** - Date/time last updated (sortable)
5. **Audience Size** - Number of records (sortable)
6. **Refresh Count** - Number of times refreshed (sortable)
7. **Next Refresh** - Scheduled refresh date/time (sortable)
8. **Actions** - Action buttons (refresh, delete, etc.)

### Sample Data
| Name | Status | Creation Date | Last Refreshed | Audience Size | Refresh Count | Next Refresh |
|------|--------|---------------|----------------|---------------|---------------|--------------|
| Test from New Key 1785669103653 | No Data | Dec 13 2025, 11:38 PM | Dec 13 2025, 11:38 PM | 0 | - | - |
| gsync test 2 | Completed | Jul 27 2025, 11:33 PM | Dec 13 2025, 8:00 AM | 186343 | 140 | Dec 14 2025, 8:00 AM |
| B2B ICP Adtech | Completed | Jul 21 2025, 5:59 PM | Dec 13 2025, 8:00 AM | 87672 | 152 | Dec 14 2025, 8:00 AM |

### Pagination
- "Rows per page: 10" dropdown
- "Page 1 of 1"
- Navigation arrows: « ‹ › »

## Key Differences from Our Implementation

**AudienceLab has:**
- ✅ More columns (7 columns vs our 3)
- ✅ Status badges with colors
- ✅ Sortable columns with indicators
- ✅ Refresh scheduling information
- ✅ Action buttons per row
- ✅ Pagination controls
- ✅ Rows per page selector

**Our current implementation:**
- ❌ Only 3 columns (Name, Size, Created Date)
- ❌ No status badges
- ❌ No sorting
- ❌ No refresh information
- ❌ No action buttons
- ❌ No pagination

## Simplification Strategy

To match AudienceLab exactly, we need to:
1. Add all 7 columns to table
2. Add status badges (No Data, Completed, etc.)
3. Implement sortable column headers
4. Add refresh scheduling columns
5. Add action buttons (refresh, delete)
6. Add pagination with rows per page selector
7. Keep search functionality
8. Keep Create button

**Note:** This is actually MORE complex than our current implementation, not simpler!
