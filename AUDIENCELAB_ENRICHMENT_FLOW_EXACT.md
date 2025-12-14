# AudienceLab Enrichment Flow - Exact Documentation

**Date**: December 13, 2025  
**Source**: https://build.audiencelab.io/home/onboarding/enrichment/upload

## Overview

This document captures the **exact enrichment flow** used in the AudienceLab platform for creating a carbon copy implementation.

---

## Step 1: Upload CSV File

**URL**: `/home/onboarding/enrichment/upload`

### Page Structure

**Title**: "Enrichment"  
**Subtitle**: "Upload CSV File"

### Upload Interface

- **Large upload box** with dashed border
- **Text**: "Click to upload or drag and drop a file"
- **Icon**: Upload icon (arrow pointing up)
- **File type**: CSV only
- **Interaction**: Click to open file picker OR drag and drop

### Bottom Right Button

- **Button**: "Submit Enrichment" (disabled/gray until file uploaded)
- **Position**: Fixed bottom-right corner

### Breadcrumb Navigation

- Home > Onboarding > Enrichment > Upload

---

## Step 2: Field Detection & Mapping

**Status**: ✅ DOCUMENTED

### Automatic Processing

After uploading a CSV file:

1. **Success Toast**: Green toast message "Successfully processed X rows"
2. **File Display**: Shows filename with X button to remove
3. **Row Count**: Bottom shows "Detected X rows"

### "Map CSV Columns to Fields" Section

**Icon**: Mapping icon (two arrows)
**Title**: "Map CSV Columns to Fields"

**Three-Column Layout**:

1. **Column Name** (Left)
   - Shows CSV column header
   - Green checkmark icon when field is successfully mapped
   - Percentage text below (e.g., "100% complete", "98% complete")
   - **Percentage = Data Completeness**: Shows % of non-empty values in that column
     - 100 rows with 100 emails = "100% complete"
     - 100 rows with 98 emails (2 blank) = "98% complete"
   - Green checkmark appears when intelligent mapping detects the field type

2. **Select Fields** (Middle)
   - Dropdown/combobox for field selection
   - Search bar at top: "Search fields..."
   - Shows currently selected field
   - Yellow highlighted box around dropdown

3. **Samples** (Right)
   - Shows 4 sample values from that column
   - Helps user verify correct mapping

### Available Fields in Dropdown

**Personal Information**:
- First Name
- Last Name
- Email
- Phone Number
- Personal Address
- Personal Zip
- Personal State
- Personal City
- Personal Email
- SHA256 Personal Email

**Business Information**:
- Business Email
- Company Name
- Company Domain
- Company Industry
- LinkedIn URL

**System Fields**:
- UP ID

**Special Option**:
- Do Not Import (to skip a column)

### Intelligent Pre-Mapping

**Observed Behavior**:
- CSV column "Email" → automatically mapped to "Email" field
- System detected the column name and pre-selected the matching field
- Shows "100% complete" (meaning 100% of rows have email values)
- Green checkmark appears because field was successfully detected and mapped

**Data Completeness Logic**:
- Percentage = (non-empty values / total rows) × 100
- Example: 2,954 rows with 2,954 emails = "100% complete"
- Example: 2,954 rows with 2,900 emails = "98% complete"
- Green checkmark shows regardless of percentage (as long as field is mapped)

**Expected Logic**:
- Matches column names to field names (case-insensitive)
- Common variations handled:
  - "email", "Email", "EMAIL" → Email
  - "first_name", "First Name", "firstname" → First Name
  - "company", "Company Name" → Company Name
  - etc.

### Validation

- At least one field must be mapped
- "Submit Enrichment" button enabled when valid
- Button disabled (gray) until file uploaded and fields mapped

---

## Step 3: Enrichment Job Submission

After field mapping is confirmed:

1. **Job Name**: Auto-generated or user-provided
2. **Submit**: Creates enrichment job
3. **Redirect**: Back to enrichment list page
4. **Status**: Job shows as "Processing" or "Pending"

---

## Current Implementation Issues

### ❌ What We Have Wrong

1. **No CSV upload interface** - We don't have the upload page
2. **No field detection** - We skip this critical step
3. **No intelligent mapping** - We don't pre-map fields
4. **Wrong flow** - We're not following the AudienceLab process

### ✅ What We Need to Build

1. **Upload Page** - `/enrichments/upload` with CSV upload
2. **Field Detection** - Parse CSV and detect columns
3. **Intelligent Mapping** - Pre-map common fields automatically
4. **Mapping Interface** - Allow user to review/adjust mappings
5. **Job Submission** - Create enrichment job with mappings

---

## Next Steps

1. Upload a sample CSV to AudienceLab to see field mapping interface
2. Document exact field mapping UI
3. Screenshot all steps
4. Implement carbon copy in our app

---

## Screenshots

- **Step 1**: Upload CSV File interface captured
- **Step 2**: Field mapping (need to upload file to see)
- **Step 3**: Job submission (need to complete mapping)
