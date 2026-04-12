# TypescriptDS

A data structures learning project — interactive visualizations of classic algorithms and data structures, built with TypeScript and Svelte.

## Stack

- **SvelteKit 2** + **Svelte 5** (runes)
- **Konva** + **svelte-konva** for canvas-based visualization
- **Tailwind CSS v4** + **DaisyUI v5** for styling
- **Biome** for linting and formatting
- **Bun** as the runtime and package manager

## Project Structure

```
src/
├── dataStructures/         # Pure TypeScript DS implementations
│   └── BinaryThree/        # Binary Search Tree
├── lib/
│   ├── features/
│   │   └── BinaryThree/    # BST visualization component + store
│   └── theme.svelte.ts     # DaisyUI CSS variable helper
└── routes/                 # SvelteKit pages
```

## Data Structures

| Structure | Location |
|-----------|----------|
| Binary Search Tree | `src/dataStructures/BinaryThree/` |

## Commands

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Production build
bun run build

# Preview production build
bun run preview
```

## Linting & Formatting

```bash
# Check and auto-fix
bunx biome check --write src/
```
