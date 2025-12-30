# Project Guidelines for Claude Code

## ESLint Compliance (MANDATORY)

Always follow the ESLint rules defined in `eslint.config.mjs`. Run `pnpm lint` before completing any task.

### Naming Conventions

- **Files**: Use `kebab-case` for all file names (e.g., `auth-form.tsx`, `use-auth.ts`)
- **Folders**: Use `kebab-case` for folder names (Next.js app router conventions apply)
- **Variables**: Use `camelCase` (e.g., `userName`, `fetchData`)
- **Constants**: Use `camelCase`, `UPPER_CASE`, or `PascalCase` for const variables
- **Booleans**: Must be prefixed with `is`, `should`, `has`, `can`, `did`, or `will` (e.g., `isLoading`, `hasError`)
- **Functions**: Use `camelCase` (e.g., `handleSubmit`, `getUserData`)
- **Types/Interfaces/Enums**: Use `PascalCase` (e.g., `UserData`, `AuthState`)
- **Enum Members**: Use `PascalCase`

### Import Rules

- Sort imports using `simple-import-sort` (auto-sorted)
- Remove unused imports (enforced by `unused-imports` plugin)
- No relative imports using `../` - only sibling imports allowed
- Use type imports: `import type { X } from 'y'`
- Use type exports: `export type { X }`

### TypeScript Rules

- Never use non-null assertions (`!`)
- No unused variables (except those prefixed with `_`)
- Use consistent type imports/exports
- No `console.log` statements in production code

### React Rules

- Follow React Hooks rules (`rules-of-hooks`, `exhaustive-deps`)
- No leaked renders in JSX (use proper conditional rendering)
- No array index as key in lists
- No inline function binds in JSX (arrow functions in props are allowed)

### JSX Conditional Rendering (MANDATORY)

Use ternary operators with explicit `null` for conditional rendering. Never use `&&` operator due to potential leaked render issues:

```tsx
// BAD - && operator (can leak 0, '', etc.)
{isLoading && <Loader />}
{items.length && <List items={items} />}

// GOOD - Ternary with explicit null
{isLoading ? <Loader /> : null}
{items.length > 0 ? <List items={items} /> : null}

// GOOD - Ternary for if/else
{isLoading ? (
  <Loader />
) : (
  <Content />
)}
```

**Rules:**
1. Always use ternary operator `? :` for conditional rendering
2. Use explicit `null` when there's no else case (enforced by `react/jsx-no-leaked-render`)
3. Never use `&&` operator in JSX - it can leak falsy values like `0` or `''`

### Code Style

- No multiple empty lines (max 1)
- No underscore prefix/suffix in variable names (except `__typename`)
- No `for...in` loops, labeled statements, or `with` statements
- Avoid abbreviations (use full words, except `args` and `props`)

## Project Structure

This is a Next.js project with the App Router. Follow these patterns:

- Components go in `src/components/`
- Pages go in `src/app/`
- Hooks go in appropriate directories with `use-` prefix in filename
- Types should be co-located or in dedicated type files

### Atomic Design Architecture (MANDATORY)

This project follows atomic design principles. All components MUST be placed in the appropriate category:

```
src/components/
├── atoms/          # Basic building blocks (Button, Input, Icon, etc.)
├── molecules/      # Simple combinations of atoms (FormField, SearchBar, etc.)
├── organisms/      # Complex UI sections (Navbar, AuthForm, etc.)
└── templates/      # Page-level layouts and content components
```

**Rules:**

1. **Page files (`src/app/`) should only contain**:
   - Route configuration and metadata
   - Suspense boundaries with fallback UI
   - Import and render of template components

2. **All UI logic and content components must go in `src/components/templates/`**:
   - Page content components (e.g., `EmailSent`, `EmailVerified`, `Login`)
   - Each template should have its own folder with `index.ts` export

3. **Component placement guidelines**:
   - **Atoms**: Single-purpose, no dependencies on other components
   - **Molecules**: Combine 2-3 atoms, minimal logic
   - **Organisms**: Complex components with business logic, may use atoms/molecules
   - **Templates**: Full page content, use AuthLayout or other layouts

4. **Export pattern**: Each component folder must have an `index.ts` that exports the component

## Internationalization (i18n)

This project uses `next-intl` for internationalization. All user-facing text MUST be translated.

### File Structure

```
src/i18n/
├── config.ts           # Locale configuration (supported locales, default locale)
├── request.ts          # Server-side i18n configuration
├── index.ts            # Public exports
└── messages/
    └── en.json         # English translations (add other locales as needed)
```

### Translation Keys Structure

Translation keys are organized by feature/section in `src/i18n/messages/en.json`:

```json
{
  "common": { ... },           // Shared strings (buttons, labels, etc.)
  "auth": {
    "login": { ... },          // Login page strings
    "signup": { ... },         // Signup page strings
    "forgotPassword": { ... }, // Forgot password strings
    "resetPassword": { ... },  // Reset password strings
    "emailSent": { ... },      // Email sent confirmation strings
    "emailVerified": { ... },  // Email verification strings
    "fields": { ... }          // Form field labels and placeholders
  },
  "metadata": { ... }          // Page metadata (title, description)
}
```

### Usage in Components

```tsx
'use client';

import { useTranslations } from 'next-intl';

export const MyComponent = () => {
  const t = useTranslations('auth.login');
  const tCommon = useTranslations('common');

  return (
    <div>
      <h1>{t('title')}</h1>
      <button>{tCommon('submit')}</button>
    </div>
  );
};
```

### Rules

1. **Never hardcode user-facing text** - Always use translation keys
2. **Use descriptive key names** - e.g., `submitButton` not `btn1`
3. **Organize keys by feature** - Keep related translations together
4. **Add new keys to en.json first** - English is the source language
5. **Use nested keys for context** - e.g., `auth.login.title` not `loginTitle`

## Responsive Design (MANDATORY)

All components MUST be responsive and work on mobile, tablet, and desktop devices.

### Breakpoints

Use Mantine's `useMediaQuery` hook for responsive behavior:

```tsx
import { useMediaQuery } from '@mantine/hooks';

const isMobile = useMediaQuery('(max-width: 768px)');
const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
const isDesktop = useMediaQuery('(min-width: 1025px)');
```

### Standard Breakpoints

- **Mobile**: `max-width: 768px`
- **Tablet**: `min-width: 769px` and `max-width: 1024px`
- **Desktop**: `min-width: 1025px`

### Responsive Guidelines

1. **Sidebars**: Use `Drawer` component on mobile, fixed sidebar on tablet/desktop
2. **Navigation**: Use hamburger menu on mobile, full navigation on desktop
3. **Typography**: Reduce heading sizes on mobile (e.g., `Title order={isMobile ? 4 : 3}`)
4. **Spacing**: Use smaller padding/margins on mobile (e.g., `padding: isMobile ? '1rem' : '1.5rem'`)
5. **Layout**: Stack elements vertically on mobile, use `Group`/`Flex` on larger screens
6. **Images**: Use responsive sizes and consider lazy loading
7. **Performance**: Disable heavy animations (e.g., Three.js particles) on mobile

### Pattern Example

```tsx
export const ResponsiveComponent = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Box
      style={{
        padding: isMobile ? 16 : 32,
        fontSize: isMobile ? 14 : 16,
      }}
    >
      {isMobile ? (
        <MobileView />
      ) : (
        <DesktopView />
      )}
    </Box>
  );
};
```

### Accessibility

- Ensure touch targets are at least 44x44px on mobile
- Use `aria-label` for icon-only buttons
- Test with screen readers

## Before Completing Any Task

1. Ensure code follows all ESLint rules above
2. Run `pnpm lint` to verify no linting errors
3. Run `pnpm build` to ensure no type errors
4. Test responsive behavior on mobile, tablet, and desktop viewports
