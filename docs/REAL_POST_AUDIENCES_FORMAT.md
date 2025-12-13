# Real POST Audiences Format (Captured from Dashboard)

**Date:** December 13, 2025  
**Source:** Live capture from build.audiencelab.io dashboard  
**Test Account:** rohitiyer11@gmail.com  
**Team:** Onboarding (slug: `onboarding`)

---

## Summary

The actual audience creation endpoint is **completely different** from what we assumed based on API documentation.

### ❌ What We Assumed (WRONG)
```
POST https://api.audiencelab.io/audiences
Body: {
  "name": "Test Audience",
  "filters": [...]
}
```

### ✅ What Actually Works (CORRECT)
```
POST https://build.audiencelab.io/home/{teamSlug}
Body: [{
  "accountId": "786342df-76b1-4bcc-82cb-69126b014268",
  "name": "API Test Audience"
}]
```

---

## Key Differences

| Aspect | Assumed | Actual |
|--------|---------|--------|
| **Base URL** | `api.audiencelab.io` | `build.audiencelab.io` |
| **Endpoint** | `/audiences` | `/home/{teamSlug}` |
| **Body Type** | Single object `{}` | Array `[{}]` |
| **Required Fields** | `name`, `filters` | `accountId`, `name` |
| **Filters** | Required in POST | Added later (separate step) |

---

## Captured Request Details

### Full Request
```json
{
  "url": "/home/onboarding",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": "[{\"accountId\":\"786342df-76b1-4bcc-82cb-69126b014268\",\"name\":\"API Test Audience\"}]"
}
```

### Parsed Body
```json
[
  {
    "accountId": "786342df-76b1-4bcc-82cb-69126b014268",
    "name": "API Test Audience"
  }
]
```

---

## Response

After successful POST, the dashboard redirects to:
```
https://build.audiencelab.io/home/onboarding/audience/{audienceId}
```

Example:
```
https://build.audiencelab.io/home/onboarding/audience/425c2e2f-86f9-4d55-9046-354fc0c17c01
```

This is the **Audience Filters** page where you configure:
- Intent filters
- Business filters
- Financial filters
- Personal filters
- Family filters
- Housing filters
- Location filters
- Contact filters

---

## Workflow

The audience creation is a **2-step process**:

### Step 1: Create Empty Audience
```bash
POST /home/{teamSlug}
Body: [{
  "accountId": "{teamId}",
  "name": "Audience Name"
}]
```

**Result:** Audience created with ID, redirects to filters page

### Step 2: Add Filters (Separate Page)
User configures filters on the audience detail page:
- `/home/{teamSlug}/audience/{audienceId}`

Then clicks "Generate Audience" to build the audience with filters.

---

## Important Notes

1. **Team Slug Required:** You must know the team slug (e.g., "onboarding")
2. **Account ID Required:** You must know the team/account ID
3. **Array Format:** Body must be an array, even for single audience
4. **No Filters Initially:** Filters are NOT part of the initial creation
5. **Different Domain:** Uses `build.audiencelab.io`, not `api.audiencelab.io`

---

## How to Get Team Info

### Team Slug
- Visible in URL after clicking team name from home page
- Format: `/home/{teamSlug}`

### Account ID
- Captured from the POST request body
- For "Onboarding" team: `786342df-76b1-4bcc-82cb-69126b014268`

---

## Next Steps

1. ✅ Update API client to use correct endpoint format
2. ✅ Add method to get team slug and account ID
3. ✅ Update tests with correct request format
4. ✅ Document that filters are a separate step
5. ⏳ Investigate if there's an API endpoint for adding filters

---

## Questions to Investigate

1. Is there an API endpoint for adding filters after creation?
2. Can we use `api.audiencelab.io` or must we use `build.audiencelab.io`?
3. How do we get the account ID programmatically?
4. Is there a GET endpoint to list teams/accounts?

---

**This is the REAL format captured from actual dashboard usage. Use this, not assumptions!**
