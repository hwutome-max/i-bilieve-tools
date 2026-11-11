# Repository Guidelines

## Project Structure & Module Organization

This repository currently contains design documentation only. `DESIGN.md` is the source of truth for the Apple-inspired visual system, including color, typography, component, layout, and elevation guidance. Add future implementation files in clear top-level directories such as `src/` for application code, `tests/` for automated tests, `assets/` for images or fonts, and `docs/` for supporting documentation. Keep design decisions close to `DESIGN.md` or link them from it.

## Build, Test, and Development Commands

No package manifest, build script, or test runner is currently present. Until tooling is added, validate Markdown changes with a local preview or editor Markdown linting.

Examples for future contributors:

```sh
rg "Apple Blue" DESIGN.md
```

Searches the design guide for a specific token or decision.

```sh
git status
```

Checks local changes once this directory is initialized as a Git repository.

## Coding Style & Naming Conventions

For Markdown, use sentence-case section headings unless matching an existing title. Keep paragraphs short and prefer bullets for design tokens, rules, and examples. Use fenced code blocks for commands and wrap literal paths, colors, CSS values, and file names in backticks. Preserve the existing design vocabulary: Apple Blue, SF Pro Display, SF Pro Text, light/dark section rhythm, and product-as-hero imagery.

For future code, prefer descriptive file names such as `product-hero.tsx`, `design-tokens.css`, or `layout-grid.test.ts`. Keep naming consistent within each language or framework once one is introduced.

## Testing Guidelines

There are no automated tests yet. For documentation updates, verify that headings render correctly, links resolve, examples are accurate, and design tokens remain consistent with `DESIGN.md`. If application code is added, place tests under `tests/` or beside source files using the framework convention, for example `component-name.test.ts` or `component-name.spec.ts`.

## Commit & Pull Request Guidelines

This directory is not currently a Git repository, so no project-specific commit history is available. Use concise, imperative commit messages, for example `Document design token usage`. Pull requests should summarize the change, explain why it is needed, reference related issues when available, and include screenshots for visual or design-system changes.

## Security & Configuration Tips

Do not commit credentials, private API keys, local environment files, or licensed font binaries. If future implementations require configuration, provide a checked-in example such as `.env.example` and document required variables without real secrets.
