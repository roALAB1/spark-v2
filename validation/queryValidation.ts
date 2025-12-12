/**
 * Query Validation Logic for Spark V2
 * 
 * This module provides comprehensive query validation with 7 rules:
 * 1. Length Check - Min/max character limits
 * 2. Vague Terms - Detect non-specific language
 * 3. Question Format - Identify questions vs statements
 * 4. Specificity - Check for industry/category terms
 * 5. Keyword Density - Detect excessive repetition
 * 6. Mode Alignment - Validate Intent vs B2B appropriateness
 * 7. Actionability - Ensure query has enough context
 * 
 * Score Calculation:
 * - Errors: -20 points each
 * - Warnings: -10 points each
 * - Info: -5 points each
 * - Base score: 100
 * - Minimum score: 0
 */

import type { ValidationIssue, ValidationResult, Mode } from "@/types";

/**
 * Validates a query string based on the selected mode
 * @param query - The query string to validate
 * @param mode - The search mode ("intent" or "b2b")
 * @returns ValidationResult with score (0-100) and list of issues
 */
export function validateQuery(query: string, mode: Mode): ValidationResult {
  const issues: ValidationIssue[] = [];

  // Skip validation for empty queries
  if (!query || query.trim().length === 0) {
    return { score: 0, issues: [] };
  }

  // Rule 1: Length Check
  validateLength(query, issues);

  // Rule 2: Vague Terms
  validateVagueTerms(query, issues);

  // Rule 3: Question Format
  validateQuestionFormat(query, issues);

  // Rule 4: Specificity
  validateSpecificity(query, issues);

  // Rule 5: Keyword Density
  validateKeywordDensity(query, issues);

  // Rule 6: Mode Alignment
  validateModeAlignment(query, mode, issues);

  // Rule 7: Actionability
  validateActionability(query, issues);

  // Calculate final score
  const score = calculateScore(issues);

  return { score, issues };
}

/**
 * Rule 1: Length Check
 * Validates that the query is within acceptable length bounds
 */
function validateLength(query: string, issues: ValidationIssue[]): void {
  const MIN_LENGTH = 10;
  const MAX_LENGTH = 500;
  const length = query.length;

  if (length < MIN_LENGTH) {
    issues.push({
      rule: "min_length",
      severity: "error",
      message: `Query too short (${length} characters, minimum ${MIN_LENGTH})`,
      suggestion: `Add more descriptive terms to reach at least ${MIN_LENGTH} characters. Include specific details about what you're searching for.`,
    });
  }

  if (length > MAX_LENGTH) {
    issues.push({
      rule: "max_length",
      severity: "error",
      message: `Query too long (${length} characters, maximum ${MAX_LENGTH})`,
      suggestion: `Simplify your query to under ${MAX_LENGTH} characters. Focus on the most important keywords and remove unnecessary details.`,
    });
  }

  // Warning for queries that are too short but above minimum
  if (length >= MIN_LENGTH && length < 20) {
    issues.push({
      rule: "length_warning",
      severity: "warning",
      message: "Query could be more detailed",
      suggestion: "Consider adding more context or specific terms to improve search results.",
    });
  }
}

/**
 * Rule 2: Vague Terms
 * Detects non-specific or subjective language that reduces search quality
 */
function validateVagueTerms(query: string, issues: ValidationIssue[]): void {
  const vagueTerms = [
    "good",
    "best",
    "top",
    "popular",
    "great",
    "nice",
    "amazing",
    "awesome",
    "excellent",
    "quality",
    "leading",
    "premier",
    "superior",
    "optimal",
  ];

  const lowerQuery = query.toLowerCase();
  const foundVague = vagueTerms.filter((term) =>
    lowerQuery.includes(term)
  );

  if (foundVague.length > 0) {
    const termList = foundVague.map((t) => `"${t}"`).join(", ");
    issues.push({
      rule: "vague_terms",
      severity: "warning",
      message: `Contains vague terms: ${termList}`,
      suggestion:
        "Replace subjective terms with specific, measurable criteria. For example, instead of 'best', specify features, size, location, or other concrete attributes.",
    });
  }
}

/**
 * Rule 3: Question Format
 * Identifies queries phrased as questions, which may be less effective
 */
function validateQuestionFormat(query: string, issues: ValidationIssue[]): void {
  const trimmed = query.trim();

  // Check for question marks
  if (trimmed.endsWith("?")) {
    issues.push({
      rule: "question_format",
      severity: "info",
      message: "Query is phrased as a question",
      suggestion:
        "Rephrase as a statement for better results. For example, change 'What are the best CRM tools?' to 'CRM tools for small businesses'.",
    });
    return;
  }

  // Check for question words at the start
  const questionWords = [
    "what",
    "where",
    "when",
    "who",
    "why",
    "how",
    "which",
    "can",
    "could",
    "should",
    "would",
    "is",
    "are",
    "do",
    "does",
  ];

  const firstWord = trimmed.split(/\s+/)[0]?.toLowerCase();
  if (questionWords.includes(firstWord)) {
    issues.push({
      rule: "question_format",
      severity: "info",
      message: "Query starts with a question word",
      suggestion:
        "Consider rephrasing as a descriptive statement. Remove question words like 'what', 'how', 'where' and focus on the key terms.",
    });
  }
}

/**
 * Rule 4: Specificity
 * Checks for industry, category, or domain-specific terms
 */
function validateSpecificity(query: string, issues: ValidationIssue[]): void {
  const specificTerms = [
    // Business types
    "saas",
    "software",
    "platform",
    "tool",
    "service",
    "solution",
    "system",
    "application",
    "app",
    
    // Organization types
    "company",
    "companies",
    "business",
    "businesses",
    "enterprise",
    "startup",
    "startups",
    "agency",
    "agencies",
    "firm",
    "firms",
    "organization",
    "vendor",
    "provider",
    
    // Industries
    "healthcare",
    "health",
    "medical",
    "finance",
    "financial",
    "banking",
    "education",
    "educational",
    "retail",
    "ecommerce",
    "e-commerce",
    "manufacturing",
    "technology",
    "tech",
    "marketing",
    "sales",
    "hr",
    "legal",
    "real estate",
    "hospitality",
    "logistics",
    "insurance",
    
    // Sizes/Scales
    "small",
    "medium",
    "large",
    "enterprise",
    "sme",
    "b2b",
    "b2c",
    "b2b2c",
  ];

  const lowerQuery = query.toLowerCase();
  const hasSpecific = specificTerms.some((term) =>
    lowerQuery.includes(term)
  );

  if (!hasSpecific) {
    issues.push({
      rule: "specificity",
      severity: "warning",
      message: "Query lacks industry or category terms",
      suggestion:
        "Add specific terms like 'SaaS', 'healthcare', 'enterprise', 'small business', or other industry/category identifiers to improve targeting.",
    });
  }
}

/**
 * Rule 5: Keyword Density
 * Detects excessive repetition of the same words
 */
function validateKeywordDensity(query: string, issues: ValidationIssue[]): void {
  // Split into words and count occurrences
  const words = query
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 2); // Ignore very short words

  if (words.length === 0) return;

  const wordCounts = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const maxCount = Math.max(...Object.values(wordCounts));
  const maxWord = Object.entries(wordCounts).find(
    ([, count]) => count === maxCount
  )?.[0];

  // Flag if any word appears more than 3 times
  if (maxCount > 3) {
    issues.push({
      rule: "keyword_density",
      severity: "warning",
      message: `Word "${maxWord}" repeated ${maxCount} times`,
      suggestion:
        "Vary your vocabulary for better results. Use synonyms or related terms instead of repeating the same word.",
    });
  }

  // Info if any word appears exactly 3 times
  if (maxCount === 3) {
    issues.push({
      rule: "keyword_density",
      severity: "info",
      message: `Word "${maxWord}" repeated ${maxCount} times`,
      suggestion:
        "Consider using synonyms or related terms to add variety to your query.",
    });
  }
}

/**
 * Rule 6: Mode Alignment
 * Validates that the query matches the selected search mode
 */
function validateModeAlignment(
  query: string,
  mode: Mode,
  issues: ValidationIssue[]
): void {
  const lowerQuery = query.toLowerCase();

  if (mode === "intent") {
    // Intent mode: Looking for what people search for
    const intentTerms = [
      "find",
      "search",
      "looking for",
      "need",
      "want",
      "seeking",
      "trying to",
      "help me",
      "where to",
      "how to get",
      "looking to buy",
      "in the market for",
    ];

    const hasIntent = intentTerms.some((term) =>
      lowerQuery.includes(term)
    );

    if (!hasIntent) {
      issues.push({
        rule: "mode_alignment",
        severity: "info",
        message: "Intent queries work best with action words",
        suggestion:
          "Try phrases like 'looking for', 'need', 'want', 'trying to find', or 'searching for' to better match intent-based search.",
      });
    }
  } else {
    // B2B mode: Looking for what businesses offer
    const b2bTerms = [
      "offer",
      "offers",
      "provide",
      "provides",
      "sell",
      "sells",
      "company",
      "companies",
      "business",
      "businesses",
      "vendor",
      "vendors",
      "supplier",
      "suppliers",
      "that offer",
      "that provide",
      "that sell",
      "specializing in",
      "focused on",
    ];

    const hasB2B = b2bTerms.some((term) =>
      lowerQuery.includes(term)
    );

    if (!hasB2B) {
      issues.push({
        rule: "mode_alignment",
        severity: "info",
        message: "B2B queries work best with business-focused terms",
        suggestion:
          "Try phrases like 'companies that offer', 'businesses providing', 'vendors selling', or 'suppliers of' to better match B2B search.",
      });
    }
  }
}

/**
 * Rule 7: Actionability
 * Ensures the query has enough context to be actionable
 */
function validateActionability(query: string, issues: ValidationIssue[]): void {
  const words = query.trim().split(/\s+/);

  // Check minimum word count
  if (words.length < 3) {
    issues.push({
      rule: "actionability",
      severity: "error",
      message: `Query too short (${words.length} words, minimum 3)`,
      suggestion:
        "Add more context with at least 3 words. Include details about what you're searching for, the industry, or specific features.",
    });
    return;
  }

  // Check for single-word queries (even if repeated)
  const uniqueWords = new Set(words.map((w) => w.toLowerCase()));
  if (uniqueWords.size === 1) {
    issues.push({
      rule: "actionability",
      severity: "error",
      message: "Query contains only one unique word",
      suggestion:
        "Add different words to provide context. Describe the category, industry, features, or use case.",
    });
    return;
  }

  // Warning for queries with very few unique words
  if (uniqueWords.size === 2 && words.length >= 3) {
    issues.push({
      rule: "actionability",
      severity: "warning",
      message: "Query has limited vocabulary",
      suggestion:
        "Add more varied terms to improve search accuracy. Include industry, size, location, or specific features.",
    });
  }
}

/**
 * Calculates the final quality score based on validation issues
 * @param issues - Array of validation issues
 * @returns Score from 0 to 100
 */
function calculateScore(issues: ValidationIssue[]): number {
  const errorCount = issues.filter((i) => i.severity === "error").length;
  const warningCount = issues.filter((i) => i.severity === "warning").length;
  const infoCount = issues.filter((i) => i.severity === "info").length;

  // Scoring system:
  // - Start with 100 points
  // - Errors: -20 points each (critical issues)
  // - Warnings: -10 points each (important issues)
  // - Info: -5 points each (suggestions)
  const score = Math.max(
    0,
    100 - errorCount * 20 - warningCount * 10 - infoCount * 5
  );

  return score;
}

/**
 * Gets a human-readable quality rating based on the score
 * @param score - Quality score (0-100)
 * @returns Rating string
 */
export function getQualityRating(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 60) return "Fair";
  if (score >= 40) return "Poor";
  return "Very Poor";
}

/**
 * Gets a color class for the score display
 * @param score - Quality score (0-100)
 * @returns Tailwind color class
 */
export function getScoreColor(score: number): string {
  if (score >= 90) return "text-green-600";
  if (score >= 75) return "text-blue-600";
  if (score >= 60) return "text-yellow-600";
  if (score >= 40) return "text-orange-600";
  return "text-red-600";
}

/**
 * Gets a badge variant for the severity level
 * @param severity - Issue severity
 * @returns Badge variant string
 */
export function getSeverityVariant(
  severity: "error" | "warning" | "info"
): "destructive" | "default" | "secondary" {
  switch (severity) {
    case "error":
      return "destructive";
    case "warning":
      return "default";
    case "info":
      return "secondary";
  }
}
