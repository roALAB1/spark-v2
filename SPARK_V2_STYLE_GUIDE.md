# Spark V2 Design Style Guide

## Overview
This document defines the design patterns, colors, spacing, and layout principles used in Spark V2 that should be applied consistently across all pages (Audiences, Enrichments, Pixels).

---

## Layout Structure

### Page Container
```tsx
<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
```
- **Background**: Subtle gradient from gray-50 to gray-100
- **Min Height**: Full viewport height (min-h-screen)

### Header
```tsx
<header className="bg-white border-b border-gray-200 shadow-sm">
  <div className="max-w-6xl mx-auto px-6 py-6">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-xl">S</span>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Spark V2</h1>
        <p className="text-sm text-gray-600">Smart Query Assistant</p>
      </div>
    </div>
  </div>
</header>
```

**Header Characteristics:**
- White background (`bg-white`)
- Bottom border (`border-b border-gray-200`)
- Subtle shadow (`shadow-sm`)
- Max width container (`max-w-6xl mx-auto`)
- Padding: `px-6 py-6`
- Icon: Gradient blue square with letter
- Title: 2xl, bold, gray-900
- Subtitle: sm, gray-600

### Main Content
```tsx
<main className="max-w-6xl mx-auto px-6 py-8">
```
- **Max Width**: 6xl (72rem / 1152px)
- **Padding**: px-6 (horizontal), py-8 (vertical)
- **Centered**: mx-auto

---

## Card Styling

### Primary Cards
```tsx
<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  <h2 className="text-lg font-semibold text-gray-900 mb-6">
    Card Title
  </h2>
  {/* Content */}
</div>
```

**Card Characteristics:**
- White background (`bg-white`)
- Rounded corners (`rounded-xl` = 12px)
- Subtle shadow (`shadow-sm`)
- Gray border (`border border-gray-200`)
- Padding: `p-6` (24px all sides)
- Card title: `text-lg font-semibold text-gray-900 mb-6`

### Info/Helper Cards
```tsx
<div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
  <h3 className="font-semibold text-blue-900 mb-2">
    💡 How it works
  </h3>
  <ul className="space-y-2 text-sm text-blue-800">
    <li>• Bullet point</li>
  </ul>
</div>
```

**Info Card Characteristics:**
- Light blue background (`bg-blue-50`)
- Blue border (`border-blue-200`)
- Rounded corners (`rounded-xl`)
- Padding: `p-6`
- Title: `font-semibold text-blue-900`
- Content: `text-sm text-blue-800`

---

## Color Palette

### Background Colors
- **Page Background**: `bg-gradient-to-br from-gray-50 to-gray-100`
- **Card Background**: `bg-white`
- **Info Card Background**: `bg-blue-50`

### Text Colors
- **Primary Text**: `text-gray-900` (headings, titles)
- **Secondary Text**: `text-gray-600` (descriptions, subtitles)
- **Muted Text**: `text-gray-500` (footer, less important info)
- **Info Text**: `text-blue-800` (info cards)
- **Info Heading**: `text-blue-900` (info card titles)

### Border Colors
- **Primary Border**: `border-gray-200`
- **Info Border**: `border-blue-200`

### Accent Colors
- **Primary**: Blue (blue-500, blue-600)
- **Success**: Green (green-600)
- **Warning**: Orange (orange-600)
- **Error**: Red (red-600)

---

## Typography

### Headings
- **Page Title (H1)**: `text-2xl font-bold text-gray-900`
- **Section Title (H2)**: `text-lg font-semibold text-gray-900 mb-6`
- **Subsection Title (H3)**: `font-semibold text-gray-900`

### Body Text
- **Primary**: `text-sm text-gray-600` or `text-base text-gray-600`
- **Small**: `text-sm text-gray-500`
- **Extra Small**: `text-xs text-gray-500`

### Font Weights
- **Bold**: `font-bold` (headings, emphasis)
- **Semibold**: `font-semibold` (section titles)
- **Medium**: `font-medium` (labels)
- **Normal**: Default (body text)

---

## Spacing

### Container Spacing
- **Horizontal Padding**: `px-6` (24px)
- **Vertical Padding**: `py-8` (32px) for main, `py-6` (24px) for header
- **Max Width**: `max-w-6xl` (1152px)

### Card Spacing
- **Internal Padding**: `p-6` (24px)
- **Title Margin Bottom**: `mb-6` (24px)
- **Section Spacing**: `space-y-6` (24px between sections)

### Grid Spacing
- **Gap**: `gap-8` (32px) for main grid
- **Gap**: `gap-4` (16px) for stats grid
- **Gap**: `gap-3` (12px) for icon+text

---

## Layout Patterns

### Two-Column Layout
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <div className="space-y-6">
    {/* Left Column */}
  </div>
  <div className="space-y-6">
    {/* Right Column */}
  </div>
</div>
```

### Stats Grid
```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  <div className="text-center">
    <div className="text-2xl font-bold text-gray-900">Value</div>
    <div className="text-sm text-gray-600">Label</div>
  </div>
</div>
```

---

## Shadows & Borders

### Shadows
- **Card Shadow**: `shadow-sm` (subtle, consistent)
- **No heavy shadows**: Keep it minimal and clean

### Borders
- **Card Border**: `border border-gray-200` (1px solid)
- **Header Border**: `border-b border-gray-200` (bottom only)

### Border Radius
- **Cards**: `rounded-xl` (12px)
- **Icons**: `rounded-lg` (8px)
- **Buttons**: `rounded-md` (6px) or `rounded-lg` (8px)

---

## Icons & Badges

### Icon Container
```tsx
<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
  <span className="text-white font-bold text-xl">S</span>
</div>
```
- **Size**: 10x10 (40px)
- **Background**: Gradient (from-blue-500 to-blue-600)
- **Rounded**: `rounded-lg`
- **Content**: Centered, white, bold

---

## Responsive Design

### Breakpoints
- **Mobile**: Default (< 640px)
- **Tablet**: `sm:` (≥ 640px)
- **Desktop**: `lg:` (≥ 1024px)

### Grid Responsive
- **Mobile**: Single column (`grid-cols-1`)
- **Desktop**: Two columns (`lg:grid-cols-2`)

---

## Key Principles

1. **Clean & Minimal**: White cards on subtle gray gradient background
2. **Consistent Spacing**: Use p-6 for cards, gap-8 for grids, space-y-6 for sections
3. **Subtle Shadows**: shadow-sm only, no heavy drop shadows
4. **Soft Borders**: border-gray-200 for separation
5. **Clear Typography**: Bold headings (gray-900), muted body (gray-600)
6. **Rounded Corners**: rounded-xl for cards, rounded-lg for icons
7. **Blue Accents**: Use blue-500/600 for primary actions and icons
8. **Centered Content**: max-w-6xl mx-auto for consistent width

---

## Implementation Checklist

For each page (Audiences, Enrichments, Pixels):

- [ ] Use gradient background: `bg-gradient-to-br from-gray-50 to-gray-100`
- [ ] Add consistent header with icon, title, subtitle
- [ ] Wrap content in `max-w-6xl mx-auto px-6 py-8`
- [ ] Use white cards with `bg-white rounded-xl shadow-sm border border-gray-200 p-6`
- [ ] Apply consistent typography (text-2xl for h1, text-lg for h2)
- [ ] Use gray-900 for headings, gray-600 for body text
- [ ] Add subtle shadows (shadow-sm only)
- [ ] Use rounded-xl for cards, rounded-lg for icons
- [ ] Maintain consistent spacing (p-6, gap-8, space-y-6)
- [ ] Ensure responsive grid layouts (grid-cols-1 lg:grid-cols-2)

---

## Example Component Structure

```tsx
<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
  {/* Header */}
  <header className="bg-white border-b border-gray-200 shadow-sm">
    <div className="max-w-6xl mx-auto px-6 py-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Page Title</h1>
          <p className="text-sm text-gray-600">Page Description</p>
        </div>
      </div>
    </div>
  </header>

  {/* Main Content */}
  <main className="max-w-6xl mx-auto px-6 py-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Section Title
          </h2>
          {/* Content */}
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Section Title
          </h2>
          {/* Content */}
        </div>
      </div>
    </div>
  </main>
</div>
```

---

This style guide ensures visual consistency across all pages in the AudienceLab Vibe platform.
