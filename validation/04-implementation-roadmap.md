# Spark V2 - Implementation Roadmap

**Date**: December 11, 2024  
**Purpose**: Define step-by-step implementation plan with success criteria  
**Status**: Pre-Implementation Plan

---

## 🎯 Implementation Philosophy

### Core Principles
1. **One Thing at a Time** - Complete each step fully before moving on
2. **Test After Every Step** - Verify it works before adding more
3. **Checkpoint After Each Phase** - Save progress, enable rollback
4. **No Premature Optimization** - Get it working first, optimize later
5. **Fail Fast** - If something doesn't work, stop and fix it

### Success Criteria for Each Step
- ✅ Code compiles (no TypeScript errors)
- ✅ Build succeeds (`pnpm run build`)
- ✅ Preview works (`pnpm run preview`)
- ✅ Feature works in browser
- ✅ No console errors

---

## 📅 Implementation Timeline

**Total Estimated Time**: 4-6 hours  
**Phases**: 8  
**Checkpoints**: 8 (one per phase)

---

## 🚀 Phase 1: Project Initialization (30 min)

### Goal
Create empty project with minimal dependencies

### Steps
1. Initialize new Manus web-static project
   ```bash
   # Manus will handle this
   ```

2. Verify initial setup
   - ✅ package.json exists
   - ✅ src/ directory exists
   - ✅ vite.config.ts exists
   - ✅ `pnpm install` works
   - ✅ `pnpm run dev` starts server

3. Clean up template files
   - Remove example components
   - Keep only: App.tsx, main.tsx, index.css

4. Test build
   ```bash
   pnpm run build
   pnpm run preview
   ```

### Success Criteria
- [x] Project initializes without errors
- [x] Dev server starts on port 3000
- [x] Build succeeds
- [x] Preview shows blank page (no errors)
- [x] No TypeScript errors

### Deliverable
- Empty project with minimal setup
- **Checkpoint 1**: "Initial project setup"

---

## 🎨 Phase 2: Install UI Dependencies (20 min)

### Goal
Install shadcn/ui components and configure Tailwind

### Steps
1. Install shadcn/ui components
   ```bash
   npx shadcn@latest add button card input textarea radio-group accordion badge collapsible
   ```

2. Verify components exist
   - ✅ src/components/ui/button.tsx
   - ✅ src/components/ui/card.tsx
   - ✅ (8 components total)

3. Install Lucide icons
   ```bash
   pnpm add lucide-react
   ```

4. Test a simple component
   ```tsx
   // In App.tsx
   import { Button } from "@/components/ui/button";
   
   function App() {
     return <Button>Test</Button>;
   }
   ```

5. Verify in browser
   - ✅ Button renders
   - ✅ Tailwind styles apply
   - ✅ No console errors

### Success Criteria
- [x] All 8 UI components installed
- [x] Lucide icons installed
- [x] Test button renders correctly
- [x] Tailwind styles work
- [x] Build succeeds

### Deliverable
- Project with UI dependencies
- **Checkpoint 2**: "UI dependencies installed"

---

## 🏗️ Phase 3: Create File Structure (15 min)

### Goal
Set up folder structure and type definitions

### Steps
1. Create directories
   ```bash
   mkdir -p src/pages
   mkdir -p src/components
   mkdir -p src/lib
   mkdir -p src/types
   ```

2. Create type definitions
   ```typescript
   // src/types/index.ts
   export type Mode = "intent" | "b2b";
   
   export interface ValidationIssue {
     rule: string;
     severity: "error" | "warning" | "info";
     message: string;
     suggestion: string;
   }
   
   export interface ValidationResult {
     score: number;
     issues: ValidationIssue[];
   }
   ```

3. Create utility file
   ```typescript
   // src/lib/utils.ts
   import { clsx, type ClassValue } from "clsx";
   import { twMerge } from "tailwind-merge";
   
   export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs));
   }
   ```

4. Create placeholder pages
   ```typescript
   // src/pages/Home.tsx
   export default function Home() {
     return <div>Home</div>;
   }
   
   // src/pages/NotFound.tsx
   export default function NotFound() {
     return <div>404</div>;
   }
   ```

5. Update App.tsx with routing
   ```typescript
   import { Route, Switch } from "wouter";
   import Home from "./pages/Home";
   import NotFound from "./pages/NotFound";
   
   function App() {
     return (
       <Switch>
         <Route path="/" component={Home} />
         <Route component={NotFound} />
       </Switch>
     );
   }
   ```

### Success Criteria
- [x] All directories created
- [x] Type definitions compile
- [x] Routing works (/ and /404)
- [x] No TypeScript errors
- [x] Build succeeds

### Deliverable
- Complete file structure
- **Checkpoint 3**: "File structure created"

---

## 🧩 Phase 4: Build Static Components (45 min)

### Goal
Create all components with static UI (no logic yet)

### Steps

#### 4.1: ModeSelector (10 min)
```typescript
// src/components/ModeSelector.tsx
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ModeSelectorProps {
  mode: "intent" | "b2b";
  onModeChange: (mode: "intent" | "b2b") => void;
}

export function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Search Mode</h2>
      <RadioGroup value={mode} onValueChange={onModeChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="intent" id="intent" />
          <label htmlFor="intent">Intent (What people search for)</label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="b2b" id="b2b" />
          <label htmlFor="b2b">B2B (What businesses offer)</label>
        </div>
      </RadioGroup>
    </Card>
  );
}
```

**Test**: Renders with both options

#### 4.2: QueryInput (10 min)
```typescript
// src/components/QueryInput.tsx
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface QueryInputProps {
  value: string;
  onChange: (value: string) => void;
  mode: "intent" | "b2b";
}

export function QueryInput({ value, onChange, mode }: QueryInputProps) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Your Query</h2>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          mode === "intent"
            ? "e.g., email marketing software for small businesses"
            : "e.g., B2B SaaS companies offering email automation"
        }
        rows={4}
      />
    </Card>
  );
}
```

**Test**: Textarea renders with correct placeholder

#### 4.3: QueryQualityChecker (15 min)
```typescript
// src/components/QueryQualityChecker.tsx
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface QueryQualityCheckerProps {
  query: string;
  mode: "intent" | "b2b";
}

export function QueryQualityChecker({ query, mode }: QueryQualityCheckerProps) {
  // Mock data for now
  const score = 75;
  const issues = [
    {
      rule: "length",
      severity: "warning" as const,
      message: "Query could be more specific",
      suggestion: "Add industry or category terms"
    }
  ];
  
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Query Quality</h2>
      <div className="text-4xl font-bold mb-4">{score}/100</div>
      <Accordion type="single" collapsible>
        {issues.map((issue, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>
              <Badge variant={issue.severity === "error" ? "destructive" : "secondary"}>
                {issue.severity}
              </Badge>
              {issue.message}
            </AccordionTrigger>
            <AccordionContent>
              {issue.suggestion}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}
```

**Test**: Renders with mock score and issues

#### 4.4: AdvancedOptions (10 min)
```typescript
// src/components/AdvancedOptions.tsx
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";

interface AdvancedOptionsProps {
  contextPhrases: string[];
  onContextPhrasesChange: (phrases: string[]) => void;
  lens: string;
  onLensChange: (lens: string) => void;
  granularity: string;
  onGranularityChange: (granularity: string) => void;
}

export function AdvancedOptions(props: AdvancedOptionsProps) {
  return (
    <Collapsible>
      <CollapsibleTrigger className="flex items-center gap-2">
        <ChevronDown className="h-4 w-4" />
        Advanced Options
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 mt-4">
        <div>
          <label>Context Phrases</label>
          <Input placeholder="e.g., enterprise, cloud-based" />
        </div>
        <div>
          <label>Lens</label>
          <Input placeholder="e.g., technology, healthcare" />
        </div>
        <div>
          <label>Granularity</label>
          <Input placeholder="e.g., high, medium, low" />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
```

**Test**: Collapsible expands/collapses

### Success Criteria
- [x] All 4 components render
- [x] No TypeScript errors
- [x] Styling looks correct
- [x] No console errors
- [x] Build succeeds

### Deliverable
- All static components
- **Checkpoint 4**: "Static components complete"

---

## 🔗 Phase 5: Compose Components (30 min)

### Goal
Bring all components together in Home page with state

### Steps

1. Update Home.tsx with state
   ```typescript
   // src/pages/Home.tsx
   import { useState } from "react";
   import { ModeSelector } from "@/components/ModeSelector";
   import { QueryInput } from "@/components/QueryInput";
   import { QueryQualityChecker } from "@/components/QueryQualityChecker";
   import { AdvancedOptions } from "@/components/AdvancedOptions";
   
   export default function Home() {
     const [mode, setMode] = useState<"intent" | "b2b">("intent");
     const [query, setQuery] = useState("");
     const [contextPhrases, setContextPhrases] = useState<string[]>([]);
     const [lens, setLens] = useState("");
     const [granularity, setGranularity] = useState("medium");
     
     return (
       <div className="container mx-auto py-8 space-y-6">
         <h1 className="text-3xl font-bold">Spark V2 - Smart Query Assistant</h1>
         
         <ModeSelector mode={mode} onModeChange={setMode} />
         
         <QueryInput value={query} onChange={setQuery} mode={mode} />
         
         <QueryQualityChecker query={query} mode={mode} />
         
         <AdvancedOptions
           contextPhrases={contextPhrases}
           onContextPhrasesChange={setContextPhrases}
           lens={lens}
           onLensChange={setLens}
           granularity={granularity}
           onGranularityChange={setGranularity}
         />
       </div>
     );
   }
   ```

2. Test interactivity
   - ✅ Mode selector changes mode
   - ✅ Query input updates state
   - ✅ Advanced options expand
   - ✅ All inputs work

### Success Criteria
- [x] All components render together
- [x] State management works
- [x] All interactions work
- [x] No console errors
- [x] Build succeeds

### Deliverable
- Interactive UI (no validation yet)
- **Checkpoint 5**: "Interactive UI complete"

---

## 🧮 Phase 6: Implement Validation Logic (45 min)

### Goal
Add query validation with 7 rules

### Steps

1. Create validation utility
   ```typescript
   // src/lib/queryValidation.ts
   import type { ValidationIssue, ValidationResult, Mode } from "@/types";
   
   export function validateQuery(query: string, mode: Mode): ValidationResult {
     const issues: ValidationIssue[] = [];
     
     // Rule 1: Length check
     if (query.length < 10) {
       issues.push({
         rule: "min_length",
         severity: "error",
         message: "Query too short (< 10 characters)",
         suggestion: "Add more descriptive terms (at least 10 characters)"
       });
     }
     
     if (query.length > 500) {
       issues.push({
         rule: "max_length",
         severity: "error",
         message: "Query too long (> 500 characters)",
         suggestion: "Simplify your query to under 500 characters"
       });
     }
     
     // Rule 2: Vague terms
     const vagueTerms = ["good", "best", "top", "popular", "great"];
     const foundVague = vagueTerms.filter(term => 
       query.toLowerCase().includes(term)
     );
     if (foundVague.length > 0) {
       issues.push({
         rule: "vague_terms",
         severity: "warning",
         message: `Contains vague terms: ${foundVague.join(", ")}`,
         suggestion: "Replace with specific, measurable criteria"
       });
     }
     
     // Rule 3: Question format
     if (query.trim().endsWith("?")) {
       issues.push({
         rule: "question_format",
         severity: "info",
         message: "Query is phrased as a question",
         suggestion: "Rephrase as a statement for better results"
       });
     }
     
     // Rule 4: Specificity (has industry/category terms)
     const specificTerms = [
       "saas", "software", "platform", "tool", "service",
       "company", "business", "enterprise", "startup",
       "healthcare", "finance", "education", "retail"
     ];
     const hasSpecific = specificTerms.some(term =>
       query.toLowerCase().includes(term)
     );
     if (!hasSpecific) {
       issues.push({
         rule: "specificity",
         severity: "warning",
         message: "Query lacks industry or category terms",
         suggestion: "Add terms like 'SaaS', 'healthcare', 'enterprise', etc."
       });
     }
     
     // Rule 5: Keyword density
     const words = query.toLowerCase().split(/\s+/);
     const wordCounts = words.reduce((acc, word) => {
       acc[word] = (acc[word] || 0) + 1;
       return acc;
     }, {} as Record<string, number>);
     const maxCount = Math.max(...Object.values(wordCounts));
     if (maxCount > 3) {
       issues.push({
         rule: "keyword_density",
         severity: "warning",
         message: "Too many repeated words",
         suggestion: "Vary your vocabulary for better results"
       });
     }
     
     // Rule 6: Mode alignment
     if (mode === "intent") {
       const intentTerms = ["find", "search", "looking for", "need", "want"];
       const hasIntent = intentTerms.some(term =>
         query.toLowerCase().includes(term)
       );
       if (!hasIntent) {
         issues.push({
           rule: "mode_alignment",
           severity: "info",
           message: "Intent queries work best with action words",
           suggestion: "Try: 'looking for', 'need', 'want', etc."
         });
       }
     } else {
       const b2bTerms = ["offer", "provide", "sell", "company", "business"];
       const hasB2B = b2bTerms.some(term =>
         query.toLowerCase().includes(term)
       );
       if (!hasB2B) {
         issues.push({
           rule: "mode_alignment",
           severity: "info",
           message: "B2B queries work best with business terms",
           suggestion: "Try: 'companies that offer', 'businesses providing', etc."
         });
       }
     }
     
     // Rule 7: Actionability
     if (words.length < 3) {
       issues.push({
         rule: "actionability",
         severity: "error",
         message: "Query too short to be actionable",
         suggestion: "Add more context (at least 3 words)"
       });
     }
     
     // Calculate score
     const errorCount = issues.filter(i => i.severity === "error").length;
     const warningCount = issues.filter(i => i.severity === "warning").length;
     const infoCount = issues.filter(i => i.severity === "info").length;
     
     const score = Math.max(
       0,
       100 - (errorCount * 20) - (warningCount * 10) - (infoCount * 5)
     );
     
     return { score, issues };
   }
   ```

2. Update QueryQualityChecker to use real validation
   ```typescript
   import { validateQuery } from "@/lib/queryValidation";
   
   export function QueryQualityChecker({ query, mode }: QueryQualityCheckerProps) {
     const validation = validateQuery(query, mode);
     
     // Use validation.score and validation.issues
     // ...
   }
   ```

3. Test all 7 rules
   - ✅ Length check works
   - ✅ Vague terms detected
   - ✅ Question format detected
   - ✅ Specificity check works
   - ✅ Keyword density works
   - ✅ Mode alignment works
   - ✅ Actionability works

### Success Criteria
- [x] All 7 validation rules work
- [x] Score calculates correctly
- [x] Issues display properly
- [x] Suggestions show
- [x] Build succeeds

### Deliverable
- Fully functional validation
- **Checkpoint 6**: "Validation logic complete"

---

## 🎨 Phase 7: Polish & Styling (30 min)

### Goal
Improve UI/UX and add final touches

### Steps

1. Add loading states
   - Skeleton for query checker while typing
   - Smooth transitions

2. Improve styling
   - Better spacing
   - Color-coded severity badges
   - Responsive design

3. Add 404 page
   ```typescript
   // src/pages/NotFound.tsx
   import { Button } from "@/components/ui/button";
   import { useLocation } from "wouter";
   
   export default function NotFound() {
     const [, setLocation] = useLocation();
     
     return (
       <div className="container mx-auto py-16 text-center">
         <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
         <p className="mb-8">The page you're looking for doesn't exist.</p>
         <Button onClick={() => setLocation("/")}>Go Home</Button>
       </div>
     );
   }
   ```

4. Add error boundary
   ```typescript
   // src/components/ErrorBoundary.tsx
   import { Component, type ReactNode } from "react";
   
   export class ErrorBoundary extends Component<
     { children: ReactNode },
     { hasError: boolean }
   > {
     constructor(props: { children: ReactNode }) {
       super(props);
       this.state = { hasError: false };
     }
     
     static getDerivedStateFromError() {
       return { hasError: true };
     }
     
     render() {
       if (this.state.hasError) {
         return <div>Something went wrong.</div>;
       }
       return this.props.children;
     }
   }
   ```

### Success Criteria
- [x] UI looks polished
- [x] Responsive design works
- [x] 404 page works
- [x] Error boundary works
- [x] Build succeeds

### Deliverable
- Polished, production-ready UI
- **Checkpoint 7**: "Polish complete"

---

## 🚀 Phase 8: Final Testing & Deployment (30 min)

### Goal
Comprehensive testing and successful deployment

### Steps

1. Manual testing checklist
   - [ ] All components render
   - [ ] Mode selector works
   - [ ] Query input works
   - [ ] Validation runs correctly
   - [ ] Advanced options work
   - [ ] Responsive design works
   - [ ] No console errors

2. Build testing
   ```bash
   rm -rf node_modules dist
   pnpm install
   pnpm run build
   pnpm run preview
   ```

3. Docker testing (if possible)
   ```bash
   docker build -t spark-v2 .
   docker run -p 4173:4173 spark-v2
   ```

4. Performance check
   - [ ] Bundle < 150KB (gzipped)
   - [ ] Build < 15 seconds
   - [ ] Page load < 2 seconds

5. Deploy to Manus
   - Create final checkpoint
   - Click Publish button
   - Verify deployment succeeds

### Success Criteria
- [x] All manual tests pass
- [x] Build succeeds
- [x] Preview works
- [x] Docker works (if tested)
- [x] Performance targets met
- [x] Deployment succeeds

### Deliverable
- Production-ready Spark V2
- **Checkpoint 8**: "Production ready"

---

## ✅ Final Validation

### Code Quality
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] No unused imports
- [ ] Clean code structure

### Functionality
- [ ] All features work
- [ ] All 7 validation rules work
- [ ] All interactions work
- [ ] Error handling works

### Performance
- [ ] Bundle < 150KB (gzipped)
- [ ] Build < 15 seconds
- [ ] Page load < 2 seconds
- [ ] No performance warnings

### Deployment
- [ ] Build succeeds locally
- [ ] Preview works locally
- [ ] Docker build succeeds
- [ ] Manus deployment succeeds

---

## 🎯 Success Metrics

| Metric | Target | Status |
|--------|--------|--------|
| **Bundle Size** | < 150KB | ⏳ |
| **Build Time** | < 15s | ⏳ |
| **Components** | 4 | ⏳ |
| **Validation Rules** | 7 | ⏳ |
| **Checkpoints** | 8 | ⏳ |
| **Deployment** | Success | ⏳ |

---

## 📝 Next Steps

1. ✅ Tech stack validated
2. ✅ Architecture designed
3. ✅ Build process validated
4. ✅ Implementation roadmap defined
5. ⏳ Get user approval
6. ⏳ Initialize project (Phase 1)
7. ⏳ Implement phases 2-8

---

## 🎉 Roadmap Status

**Planning**: ✅ **COMPLETE**  
**Validation**: ✅ **COMPLETE**  
**Implementation**: ⏳ **READY TO START**  
**Risk Level**: ✅ **LOW**

**Ready to begin implementation? YES** ✅
