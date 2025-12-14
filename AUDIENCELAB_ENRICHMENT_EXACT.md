# AudienceLab Enrichment Page - Exact Structure

**URL**: https://build.audiencelab.io/home/onboarding/enrichment

**Date Documented**: December 13, 2025

## Page Layout

### Header Section
- **Page Title**: "Enrichment"
- **Breadcrumb**: Home > Onboarding > Enrichment

### Main Content Section

**Top Bar**:
- **Left Side**: "13 Enrichment Lists" (count display)
- **Search Bar**: "Search by name..." input field (center-left)
- **Right Side**: Blue "Upload" link/button

### Table Structure

**Table Columns**:
1. **Name** ↕️ - Sortable (currently not sorted)
2. **Status** - NOT sortable (no sort indicator)
3. **Creation Date** ↓ - Sortable (currently sorted descending)

### Sample Data (10 enrichments shown, page 1 of 2)

**Row 1:**
- Name: Enrichment_2025-10-31T04-15-29-744Z
- Status: "Completed" (green badge)
- Creation Date: Oct 31 2025, 4:15 AM

**Row 2:**
- Name: Enrichment_2025-10-31T04-06-34-856Z
- Status: "Completed" (green badge)
- Creation Date: Oct 31 2025, 4:06 AM

**Row 3:**
- Name: Enrichment_2025-10-31T03-46-33-025Z
- Status: "Completed" (green badge)
- Creation Date: Oct 31 2025, 3:46 AM

**Row 4:**
- Name: Enrichment_2025-10-31T03-10-35-796Z
- Status: "Completed" (green badge)
- Creation Date: Oct 31 2025, 3:10 AM

**Row 5:**
- Name: Enrichment_2025-10-31T03-02-00-300Z
- Status: "Completed" (green badge)
- Creation Date: Oct 31 2025, 3:01 AM

**Row 6:**
- Name: Enrichment_2025-10-31T02-21-41-728Z
- Status: "Completed" (green badge)
- Creation Date: Oct 31 2025, 2:21 AM

**Row 7:**
- Name: Enrichment_2025-10-31T02-16-47-464Z
- Status: "Completed" (green badge)
- Creation Date: Oct 31 2025, 2:16 AM

**Row 8:**
- Name: Test Job
- Status: "Completed" (green badge)
- Creation Date: Oct 31 2025, 2:00 AM

**Row 9:**
- Name: 330k biz owners_LI_AND_test2
- Status: "no data" (lowercase, different styling)
- Creation Date: Sep 6 2025, 12:57 AM

**Row 10:**
- Name: 330k biz owners_EM_AND_test
- Status: "Completed" (green badge)
- Creation Date: Sep 5 2025, 8:32 PM

### Pagination Controls (Bottom)

**Left Side:**
- "Rows per page" dropdown: 10 (selected)

**Right Side:**
- "Page 1 of 2"
- Navigation buttons: « ‹ › »

### Status Values Observed
- **"Completed"**: Green badge (most common)
- **"no data"**: Different styling (lowercase, not a badge)

## Key Features

1. **Very Simple Layout**: Only 3 columns
2. **Sortable Columns**: Name and Creation Date are sortable, Status is NOT
3. **Search Functionality**: Search by name input field
4. **Enrichment Counter**: Shows total number ("13 Enrichment Lists")
5. **Upload Button**: Link/button to upload new enrichments
6. **Pagination**: Rows per page selector + page navigation
7. **Status Badges**: Color-coded for "Completed" status
8. **Auto-Generated Names**: Most enrichments use timestamp format "Enrichment_YYYY-MM-DDTHH-MM-SS-MMMZ"

## Navigation (Left Sidebar)

**Section 1: Audience**
- Audience Lists
- Studio
- Segments
- Enrichment (current page)

**Section 2: Integrations**
- Pixel
- Sync
- Workflows

**Section 3: White-label**
- Credits
- Teams
- Branding

**Section 4: Settings**
- Usage
- Settings
- Members
- API Keys

## Top Banner
- Alert: "New Texas Telephone Solicitors Law Sept 2025" with "View Details" button

## Notes

- **VERY SIMPLE**: This is exactly what we already built!
- **Only 3 Columns**: Name, Status, Creation Date
- **No Action Buttons**: No download, delete, or other actions visible
- **No Stats Cards**: No metrics at top
- **No Filters**: No status or type filters
- **No Modal**: No detailed view when clicking rows
- **Simple Search**: Just search by name
- **Upload Button**: Goes to upload page (not a modal/dialog)
- **Status Column NOT Sortable**: Unlike Name and Creation Date
- **Auto-Generated Names**: Timestamp-based naming convention

## Current Implementation Status

✅ **WE ALREADY HAVE THIS!** Our simplified EnrichmentsPage matches this exactly:
- 3 columns: Name, Status, Creation Date
- Search by name
- Upload button
- Pagination
- No fancy features

The only thing we need to verify:
1. Status column should NOT be sortable (remove sort indicator if present)
2. Make sure "Upload" is a link/button (not "New Enrichment")
3. Verify the count display shows "X Enrichment Lists" format
