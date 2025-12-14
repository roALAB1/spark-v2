# Enrichment Flow Findings from AudienceLab Dashboard

## Date: 2025-12-14

## Flow Steps Observed

### Step 1: Upload CSV
- URL: `/home/onboarding/enrichment/upload`
- User uploads CSV file
- System parses CSV and detects columns

### Step 2: Field Mapping
- Three-column interface appears:
  - Column Name (with % complete)
  - Select Fields (dropdown)
  - Samples (2 values shown)
- Intelligent auto-mapping occurs
- Green checkmarks show successfully mapped fields
- "Detected X rows" shown at bottom

### Step 3: Submit Button Click
- User clicks "Submit Enrichment" button
- **Modal appears**: "Start Enrichment"
  - **Enrichment Name** input field (required)
  - **Operator** selection: OR / AND buttons
  - **Cancel** and **Create** buttons

### Step 4: Create Enrichment Job
- User fills enrichment name
- User selects operator (OR is default)
- User clicks "Create" button
- **Success toast**: "Data uploaded successfully and queued for enrichment"
- **Redirect**: Back to `/home/onboarding/enrichment` list page
- **New job appears**: With status "Processing"

## Key Differences from Our Implementation

### ❌ What We're Missing:
1. **Modal dialog** after Submit button click
2. **Enrichment Name** input field
3. **Operator selection** (OR/AND)
4. **Two-step submission** process (Submit → Modal → Create)

### ✅ What We Have Correct:
1. CSV upload interface
2. Field detection and mapping
3. Three-column layout
4. Data completeness calculation
5. Dropdown search
6. Sample values display

## Next Steps

1. **Capture actual API call**: Need to use browser DevTools Network tab to see the exact request
2. **Add modal dialog**: Implement "Start Enrichment" modal in our app
3. **Add enrichment name field**: Required input before submission
4. **Add operator selection**: OR/AND toggle buttons
5. **Update submission flow**: Submit → Modal → Create (two-step process)

## API Call Capture Status

⚠️ **Not yet captured** - Network interceptors didn't work due to page navigation
- Need to use browser DevTools Network tab directly
- Or check browser's network history/HAR export
- Or inspect the actual fetch/XHR calls in the source code
