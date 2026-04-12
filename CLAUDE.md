
Default to using Bun instead of Node.js.

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>`
- Use `bunx <package> <command>` instead of `npx <package> <command>`

## Project Overview

TypescriptDS is a data structures learning/visualization project. It has:
- **Backend/logic**: TypeScript data structure implementations in `src/dataStructures/`
- **Frontend**: SvelteKit + Svelte 5 app for visualization, using Konva canvas

## Stack

- **Framework**: SvelteKit 2 + Svelte 5 (use runes syntax: `$state`, `$derived`, etc.)
- **Bundler**: Vite (via `@sveltejs/vite-plugin-svelte`) — **do NOT switch to `Bun.serve()`**
- **Styling**: Tailwind CSS v4 + DaisyUI v5
- **Canvas**: Konva + svelte-konva for data structure visualization
- **Linter/Formatter**: Biome
- **Language**: TypeScript (strict mode, ESNext)

## Commands

```sh
bun run dev       # start dev server
bun run build     # production build
bun run preview   # preview production build
```

## Code Style (Biome)

- **Indentation**: tabs
- **Quotes**: double quotes in JS/TS
- `useConst` rule is OFF — `let` is acceptable
- `useImportType` is OFF — regular imports for types are fine
- `noUnusedVariables` / `noUnusedImports` are OFF
- Tailwind classes should be sorted (warn level via `useSortedClasses`)
- Run `bunx biome check --write src/` to lint and format

## TypeScript

- Strict mode enabled (`strict: true`)
- `noUnusedLocals` and `noUnusedParameters` are ON in tsconfig
- Target: ESNext, module resolution: `bundler`
- Types included: `bun`, `svelte`, `vite/client`
- `noEmit: true` — the bundler handles compilation, not `tsc`

## Data Structures

- Located in `src/dataStructures/<StructureName>/`
- Each structure lives in its own directory with separate files per class
- Use **generic classes** (`class Foo<T>`) for type-safe implementations
- Use **OOP style**: private fields with public getters/setters
- Structure naming: `BinaryThree` (note: project uses "Three" not "Tree" — preserve existing spelling)
- Add an `example.ts` alongside each structure for usage demos

## Path Aliases

- `$lib` → `./src/lib` (use for shared utilities and components)
