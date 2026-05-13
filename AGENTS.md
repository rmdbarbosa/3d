# AGENTS.md - Next.js Architecture & Coding Rules

## Objective

All code must be:

- easy to read
- easy to maintain
- predictable
- scalable over time

Prioritize clarity over cleverness.

---

## Core Principles

- Prefer simple over complex
- Prefer explicit over magic
- Prefer consistency over personal style
- Avoid premature abstraction
- Keep files small and focused
- Optimize for readability and future changes

---

## Architecture Rules

### 1. Use Feature-Based Structure

Organize code by feature/domain:

```txt
src/
  app/
  features/
  components/
  lib/
```

### 2. Responsibilities

#### `app/`

- Routing only
- `page.tsx`, `layout.tsx`, `loading.tsx`
- NO business logic

#### `features/*`

Each feature owns:

- `components/`
- `server/`
- `actions/`
- `schemas.ts`
- `types.ts`

Example:

```txt
features/
  users/
    components/
    server/
      queries.ts
      mutations.ts
    schemas.ts
    types.ts
```

#### `components/`

- `ui/` -> reusable primitives
- `shared/` -> cross-feature components

#### `lib/`

- global helpers (`db`, `auth`, `utils`)
- DO NOT turn into dumping ground

---

## Server vs Client Rules

- Default: Server Components
- DO NOT use `"use client"` unless required

Prefer server rendering for:

- data fetching
- business logic
- security

Client Components ONLY for:

- interactivity (`click`, `input`, `animation`)
- browser APIs
- local UI state

Rule:

- Client components must be thin

---

## Data Fetching Rules

- Fetch data on the server first
- NEVER duplicate fetch logic across files

Centralize in:

- `features/*/server/queries.ts`
- `features/*/server/mutations.ts`

Example:

```ts
export async function getUser(id: string) {
  // DB logic
}
```

---

## State Management Rules

Priority order:

- Server state (preferred)
- Local component state
- URL (search params)
- Shared client state
- Global store (LAST RESORT)

DO NOT:

- introduce Redux/Zustand early
- globalize simple UI state

ONLY use global state for:

- cross-app UI state
- complex multi-component workflows

---

## Component Rules

- One responsibility per component
- Split large components
- Avoid mixing:
  - fetching
  - business logic
  - UI rendering

Avoid:

```ts
items.filter().map().sort(); // inside JSX
```

Prefer:

```ts
const processedItems = getProcessedItems(items);
```

---

## Function Rules

- One responsibility
- Clear naming
- Avoid side effects
- Prefer early returns

Bad:

```ts
function handleData() {}
```

Good:

```ts
function calculateTotalPrice() {}
```

---

## Naming Rules

- Components -> `PascalCase`
- Hooks -> `useSomething`
- Functions -> `camelCase`
- Constants -> `UPPER_SNAKE_CASE`

Avoid vague names:

- `data`
- `stuff`
- `handler`
- `temp`

---

## TypeScript Rules

- NO `any`
- Use `unknown` if needed
- Define types close to features
- Export only when reused

---

## Validation Rules

Validate ALL external input:

- forms
- APIs
- server actions
- env variables

Keep schemas in feature:

```txt
features/checkout/schemas.ts
```

---

## Error Handling

- Never swallow errors
- Provide useful logs
- Show safe messages to users

---

## Styling Rules

- Keep Tailwind readable
- Extract repeated UI into components
- Avoid huge class strings

---

## Localization Rules

- All user-facing UI text MUST be written in PT-BR
- Keep code, file names, variables, functions, types, logs, and technical contracts in English
- If a technical/internal message needs to be shown in the UI, wrap it with a safe PT-BR user-facing message

---

## Hooks Rules

- Keep focused
- Avoid unnecessary custom hooks
- Prefer server logic over client hooks

---

## API Rules

Prefer:

- Server Actions (internal mutations)

Use Route Handlers ONLY for:

- webhooks
- external APIs

---

## Reuse Rules

- Duplicate first, abstract later
- Abstract only when pattern is stable

Rule:

- 3+ real uses -> extract

---

## Performance Rules

- Do NOT optimize early
- Prefer server-first rendering
- Avoid unnecessary client JS

---

## Testing Rules

Test:

- business logic
- critical flows
- edge cases

Avoid testing implementation details.

---

## Readability Rules

Code must be scannable:

- small functions
- early returns
- clear names
- shallow nesting

---

## Anti-Patterns (FORBIDDEN)

- business logic inside `page.tsx`
- excessive `"use client"`
- giant utils files
- global state for simple UI
- massive components
- duplicated fetch logic
- vague naming
- `any` usage
- premature abstraction

---

## AI Behavior Rules

When generating code:

- follow existing structure
- keep route files thin
- place logic inside features
- default to server-first
- minimize client components
- avoid global state unless justified
- write readable code

If unsure:

- choose the simplest maintainable solution

---

## Definition of Good Code

Good code is:

- clear
- modular
- predictable
- easy to change
- aligned with feature structure
- server-first

If a solution is clever but harder to understand:

- REJECT IT
