# CLAUDE.md

## Tech Stack

- Next.js (App Router): 16.2.9
- React: 19.2.4
- TypeScript: 5.9.3
- ESLint: 9.39.4
- Prettier: 3.8.4

## Coding Conventions

- Naming
  - camelCase for functions and variables
  - PascalCase for components, types, and component/class file names
  - kebab-case for non-component file names and directory names
  - UPPER_SNAKE_CASE for exported constants
- Indentation: 2 spaces
- Do not use `React.FC`
- Prefer `type` over `interface`
- `export default` is allowed only for page components
- Import order: external packages → internal alias (`@/*`) → relative paths
- `any` type is forbidden
- Minimize direct DOM access (`document`, `window`)
- Minimize `'use client'`; use it only when strictly necessary
- Extract any string reused 2+ times into a constant
- Console usage
  - Allowed: `console.info`, `console.warn`, `console.error`, `console.table`
  - Not allowed: `console.log`, `console.debug`, `console.dir`, `console.time`
- All code comments must be written in Korean
