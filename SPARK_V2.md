# Spark V2 - Smart Query Assistant

> **Intelligent query validation and quality checking for Spark AI search**

## 🎯 Overview

Spark V2 is an enhanced frontend interface for Spark AI that provides **real-time query quality checking** with a 7-rule validation system. It helps users craft better search queries for both **Intent Search** (what people search for) and **B2B Search** (what businesses offer), ensuring optimal results from Spark's AI-powered search engine.

## ✨ Key Features

- **🎯 Dual Search Modes**: Intent Search (OpenAI embeddings) and B2B Search (BAAI/bge-large-en-v1.5)
- **📊 QueryQualityChecker**: Real-time validation with 0-100 scoring system
- **✨ 7 Validation Rules**: Length, personas, descriptors, hype words, mode clarity, specificity, questions
- **🎨 Advanced Options**: Context phrases, lens selection, granularity control
- **📱 Responsive Design**: Built with Tailwind CSS 4 and shadcn/ui components
- **🔗 AudienceLab Integration**: Export search results directly to AudienceLab audiences

## 🚀 Quick Start

### Accessing Spark V2

1. Navigate to `/spark` in the application
2. Or click "Spark V2" in the sidebar navigation

### Basic Usage

1. **Select Search Mode**: Choose between Intent Search or B2B Search
2. **Enter Query**: Type your search query (2-10 words recommended)
3. **Check Quality**: Review the real-time quality score and suggestions
4. **Adjust Query**: Follow suggestions to improve your query score
5. **Search**: Click search to get results from Spark AI

## 📊 Query Quality Rules

The QueryQualityChecker validates queries against 7 rules:

### 1. Length Check (2-10 words optimal)

**✅ Good Examples:**
- "email marketing software"
- "cold email deliverability"
- "SaaS companies in healthcare"

**❌ Bad Examples:**
- "email" (too short)
- "best email marketing software for small businesses looking to grow their customer base" (too long)

### 2. No Personas (Intent Search)

**✅ Good Examples:**
- "email marketing software"
- "cold email tips"

**❌ Bad Examples:**
- "marketers who need email tools"
- "people interested in email marketing"
- "businesses that use email automation"

### 3. No Audience Descriptors

**✅ Good Examples:**
- "email marketing software"
- "cold email deliverability"

**❌ Bad Examples:**
- "interested in email marketing"
- "looking for email tools"
- "want to improve email deliverability"

### 4. No Hype Words

**✅ Good Examples:**
- "email marketing software"
- "enterprise CRM platforms"

**❌ Bad Examples:**
- "best email marketing software"
- "top email tools"
- "leading email platforms"

### 5. Mode-Specific Validation

**Intent Search** (what people search for):
- ✅ "email deliverability tips"
- ✅ "cold email best practices"
- ❌ "email software companies"

**B2B Search** (what businesses offer):
- ✅ "SaaS companies"
- ✅ "marketing agencies"
- ❌ "how to do marketing"

### 6. Specificity Check

**✅ Good Examples:**
- "email marketing software"
- "B2B SaaS companies"

**❌ Bad Examples:**
- "various marketing stuff"
- "general business things"
- "misc software tools"

### 7. No Questions

**✅ Good Examples:**
- "email marketing software"
- "cold email deliverability"

**❌ Bad Examples:**
- "what is email marketing?"
- "how to improve deliverability?"
- "which email tool is best?"

## 🎨 Advanced Options

### Context Phrases

Add related terms to refine search context:

**Example:**
- Query: "email marketing"
- Context: ["deliverability", "inbox placement", "automation"]

### Lens Selection

Choose the perspective for interpreting the query:

- **Brand**: Focus on brand names and companies
- **Product**: Focus on specific products and services
- **Function**: Focus on job functions and roles
- **Service**: Focus on service offerings
- **Solution**: Focus on problem-solving approaches
- **Event**: Focus on events and occasions

### Granularity Control

Control the specificity of results (1-5):

- **1 - Broad**: General, high-level results
- **2 - General**: Somewhat broad results
- **3 - Mid-Specific**: Balanced specificity (default)
- **4 - Advanced**: More specific results
- **5 - Niche/Elite**: Highly specific, niche results

## 📈 Quality Score System

### Score Calculation

```typescript
// Base score: (passed_rules / total_rules) * 100
let score = (passedRules.length / 7) * 100;

// Bonus: +5 points for optimal length (3-6 words)
if (wordCount >= 3 && wordCount <= 6) {
  score = Math.min(100, score + 5);
}

// Penalty: -5 points per critical error
score = Math.max(0, score - criticalErrors * 5);
```

### Score Ranges

| Score | Rating | Description |
|-------|--------|-------------|
| 90-100 | ⭐⭐⭐⭐⭐ Excellent | All rules passed, optimal query |
| 75-89 | ⭐⭐⭐⭐☆ Good | Minor improvements possible |
| 60-74 | ⭐⭐⭐☆☆ Fair | Several issues to address |
| 40-59 | ⭐⭐☆☆☆ Poor | Significant improvements needed |
| 0-39 | ⭐☆☆☆☆ Very Poor | Major issues, rewrite recommended |

## 🏗️ Architecture

### Component Structure

```
client/src/features/spark/
├── components/
│   ├── ModeSelector.tsx          # Intent vs B2B mode selection
│   ├── QueryInput.tsx            # Query text input with validation
│   ├── QueryQualityChecker.tsx   # Real-time quality checking
│   └── AdvancedOptions.tsx       # Context, lens, granularity
├── utils/
│   └── queryValidation.ts        # Validation logic and scoring
├── types.ts                      # TypeScript type definitions
└── SparkSearchPage.tsx           # Main page component
```

### Key Components

#### ModeSelector

Allows users to toggle between Intent Search and B2B Search modes with clear descriptions and examples.

**Props:**
- `mode: SearchMode` - Current search mode
- `onChange: (mode: SearchMode) => void` - Mode change handler

#### QueryInput

Text area for entering search queries with real-time character/word count and validation feedback.

**Props:**
- `value: string` - Current query text
- `onChange: (value: string) => void` - Query change handler
- `mode: SearchMode` - Current search mode
- `onSearch: () => void` - Search handler
- `isLoading?: boolean` - Loading state

#### QueryQualityChecker

Real-time validation component that displays quality score, passed/failed rules, and actionable suggestions.

**Props:**
- `query: string` - Query to validate
- `mode: SearchMode` - Current search mode

#### AdvancedOptions

Collapsible section for advanced search options including context phrases, lens selection, and granularity control.

**Props:**
- `contextPhrases: string[]` - Current context phrases
- `onContextPhrasesChange: (phrases: string[]) => void` - Context change handler
- `lens: Lens` - Current lens selection
- `onLensChange: (lens: Lens) => void` - Lens change handler
- `granularity: number` - Current granularity level (1-5)
- `onGranularityChange: (level: number) => void` - Granularity change handler

## 🔧 Configuration

### TypeScript Types

```typescript
export type SearchMode = "intent" | "b2b";

export type Lens =
  | "brand"
  | "product"
  | "function"
  | "service"
  | "solution"
  | "event";

export interface SearchQuery {
  query: string;
  mode: SearchMode;
  contextPhrases?: string[];
  lens?: Lens;
  granularity?: number; // 1-5
  topK?: number;
}

export interface QueryQualityResult {
  score: number; // 0-100
  issues: QueryValidationIssue[];
  passedRules: string[];
  failedRules: string[];
}
```

## 📚 Best Practices

### Writing Good Intent Queries

1. **Focus on what people search for**, not who they are
2. **Use 3-6 words** for optimal results
3. **Be specific** about the topic or interest
4. **Avoid business descriptors** (companies, enterprises)

**Examples:**
- ✅ "email deliverability best practices"
- ✅ "cold email outreach strategies"
- ✅ "B2B lead generation tactics"

### Writing Good B2B Queries

1. **Focus on what businesses do or offer**, not user interests
2. **Use industry-specific terms** when possible
3. **Be clear about business type** (SaaS, agency, etc.)
4. **Avoid how-to or tutorial language**

**Examples:**
- ✅ "independent hotels"
- ✅ "B2B SaaS companies"
- ✅ "digital marketing agencies"

## 🧪 Testing

### Manual Testing Checklist

- [ ] Mode selection toggles correctly
- [ ] Query input accepts text and shows character/word count
- [ ] Quality checker updates in real-time
- [ ] All 7 validation rules trigger correctly
- [ ] Advanced options expand/collapse
- [ ] Context phrases can be added/removed
- [ ] Lens selection updates
- [ ] Granularity slider works
- [ ] Search button triggers correctly

### Example Test Queries

**High Quality (90+):**
- "email marketing software"
- "independent hotels"
- "B2B SaaS companies"

**Medium Quality (60-75):**
- "best email tools" (hype word)
- "how to do marketing" (question format)

**Low Quality (<60):**
- "email" (too short)
- "people interested in marketing" (persona + descriptor)
- "what is the best email marketing software for small businesses?" (multiple issues)

## 🚀 Future Enhancements

### Planned Features

- [ ] **Spark API Integration**: Connect to actual Spark search endpoints
- [ ] **Query Templates Library**: Pre-built query examples by category
- [ ] **Export to AudienceLab**: Save search results as audiences
- [ ] **Query History**: Store and re-run previous searches
- [ ] **Query Analytics**: Track query performance over time
- [ ] **Bulk Query Processing**: Process multiple queries at once
- [ ] **A/B Testing**: Compare different query variations

### API Integration (TODO)

```typescript
// Intent Search
const intentResults = await trpc.spark.searchIntent.query({
  query: "email marketing software",
  contextPhrases: ["deliverability", "automation"],
  lens: "product",
  granularity: 3,
  topK: 50,
});

// B2B Search
const b2bResults = await trpc.spark.searchB2B.query({
  query: "SaaS companies",
  contextPhrases: ["B2B", "enterprise"],
  lens: "brand",
  granularity: 4,
  topK: 100,
});
```

## 📖 Resources

### Documentation

- [Query Best Practices](../spark-investigation/08-query-best-practices.md)
- [Frontend Architecture](../spark-v2-design/01-frontend-architecture.md)
- [Tech Stack Validation](../spark-v2-design/02-tech-stack-alignment.md)
- [Coding Standards](../spark-v2-design/03-coding-validation.md)

### Related Projects

- **Spark AI**: AI-powered search engine
- **AudienceLab**: Audience enrichment platform
- **Manus**: Development and hosting platform

## 🙏 Acknowledgments

- **shadcn/ui**: Beautiful UI components
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **React 19**: Latest React features and performance

---

**Built with ❤️ for better search queries**
