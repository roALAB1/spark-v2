# Complete Enrichment API Specification

## Endpoint
**POST** `https://api.audiencelab.io/enrichments`

## Headers
```
Content-Type: application/json
X-API-Key: YOUR_API_KEY
```

## Request Body

```json
{
  "name": "Sample Upload",
  "operator": "OR",
  "columns": ["EMAIL", "FIRST_NAME", "LAST_NAME", "PHONE"],
  "records": [
    {
      "first_name": "Harper",
      "last_name": "Nguyen",
      "phone": "+12145550123",
      "email": "harper.nguyen@example.com"
    },
    {
      "first_name": "Liam",
      "last_name": "Carter",
      "phone": "+18305550987",
      "email": "liam.carter@example.com"
    }
  ]
}
```

## Request Parameters

### `name` (string, required)
- Example: `"Prospect Upload"`
- The name of the enrichment job
- **User provides this in the modal dialog**

### `records` (object[], required)
- Array of contact records to enrich
- Each record contains lowercase field names
- Example:
```json
[
  {
    "first_name": "Ava",
    "last_name": "Stone",
    "phone": "+12145550123",
    "email": "ava.stone@example.com"
  }
]
```

### `operator` (enum<string>, optional)
- Default: `"OR"`
- Available options: `"AND"`, `"OR"`
- **User selects this in the modal dialog**

### `columns` (string[], optional)
- Optional explicit list of fields included in each record
- **UPPERCASE field names**
- Accepted values:
  - `EMAIL`
  - `PERSONAL_EMAIL`
  - `BUSINESS_EMAIL`
  - `FIRST_NAME`
  - `LAST_NAME`
  - `PHONE`
  - `PERSONAL_ADDRESS`
  - `PERSONAL_CITY`
  - `PERSONAL_STATE`
  - `PERSONAL_ZIP`
  - `COMPANY_NAME`
  - `COMPANY_DOMAIN`
  - `COMPANY_INDUSTRY`
  - `SHA256_PERSONAL_EMAIL`
  - `LINKEDIN_URL`
  - `UP_ID`

## Response

### Success (202 Accepted)
```json
{
  "jobId": "399e88c3-3263-4d9a-826c-437ef57f7b6c",
  "status": "IN_QUEUE"
}
```

### Error Responses
- **400**: Bad Request
- **401**: Unauthorized
- **500**: Internal Server Error

## Key Findings

### Field Name Convention
1. **`columns` array**: UPPERCASE (e.g., `"FIRST_NAME"`, `"EMAIL"`)
2. **`records` objects**: lowercase (e.g., `"first_name"`, `"email"`)

### Transformation Required
Our field mapping uses UPPERCASE internally, so we need to:
1. Keep `columns` array as UPPERCASE
2. Transform record field names to lowercase when building the request

### Example Transformation

**Our Field Mapping:**
```javascript
{
  csvColumn: "FIRST_NAME",
  mappedField: "FIRST_NAME",  // UPPERCASE
  samples: ["John", "Jane"]
}
```

**API Request:**
```json
{
  "name": "Test Enrichment Job",
  "operator": "OR",
  "columns": ["FIRST_NAME", "LAST_NAME", "EMAIL"],  // UPPERCASE
  "records": [
    {
      "first_name": "John",      // lowercase
      "last_name": "Doe",        // lowercase
      "email": "john@gmail.com"  // lowercase
    }
  ]
}
```

## Implementation Checklist

- [ ] Add "Start Enrichment" modal dialog
- [ ] Add enrichment name input field
- [ ] Add operator selection (OR/AND toggle)
- [ ] Transform field names: columns (UPPERCASE), records (lowercase)
- [ ] Call POST /enrichments endpoint
- [ ] Handle 202 response (job accepted)
- [ ] Show success toast
- [ ] Redirect to enrichments list
- [ ] Handle error responses (400, 401, 500)
