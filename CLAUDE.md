# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DontBeIdle community website at `idle.uz`. Built with Astro 7, Tailwind CSS 4, and deployed via GitHub Actions to GitHub Pages. Supports two languages: Karakalpak (kaa, default) and English (en).

## Development

```bash
npm install        # install dependencies
npm run dev        # local dev server (localhost:4321)
npm run build      # production build → dist/
npm run preview    # preview production build
```

**Deployment:** Push to `main` branch triggers GitHub Actions (`.github/workflows/deploy.yml`) which builds and deploys to GitHub Pages. The `CNAME` file maps to `idle.uz`.

## Architecture

- **Astro 7** — static site generator with file-based routing
- **Tailwind CSS 4** — via `@tailwindcss/vite` plugin (configured in `astro.config.mjs`)
- **Content Collections** — type-safe Markdown for projects and blog posts (`src/content.config.ts`)
- **i18n** — Astro's built-in i18n routing; default locale `kaa` has no URL prefix, `en` pages live under `/en/`

### Fonts

- **Inter** — body text (loaded from Google Fonts)
- **Unbounded** — site title "DontBeIdle" only (header logo, hero heading)

Both fonts are loaded in `src/layouts/Base.astro` and registered as Tailwind theme tokens (`--font-sans`, `--font-unbounded`) in `src/styles/global.css`.

### Key directories

- `src/i18n/` — translations (`ui.ts`) and helper functions (`utils.ts`)
- `src/layouts/Base.astro` — shared HTML shell (head, nav, footer)
- `src/components/` — Header, Footer, ProjectCard, BlogCard
- `src/content/projects/{kaa,en}/` — project Markdown files
- `src/content/blog/{kaa,en}/` — blog post Markdown files
- `src/pages/` — Astro pages; `en/` subdirectory mirrors default locale pages
- `src/styles/global.css` — Tailwind import, custom theme tokens, animations

### i18n

Translations live in `src/i18n/ui.ts`. Helper functions in `src/i18n/utils.ts`:
- `getLangFromUrl(url)` — detect current language from URL
- `useTranslations(lang)` — returns a `t()` function for the given locale
- `getLocalePath(lang, path)` — build locale-aware URL path
- `getSwitchLangPath(lang, path)` — get URL for switching to the other language

### Adding content

**New project:** Create `src/content/projects/{kaa,en}/project-name.md` with frontmatter:
```yaml
---
title: "Project name"
description: "Short description"
github: "https://github.com/dontbeidle/repo-name"
tags: ["web", "python"]
---
```

**New blog post:** Create `src/content/blog/{kaa,en}/post-name.md` with frontmatter:
```yaml
---
title: "Post title"
description: "Short description"
date: 2026-08-31
author: "Author name"
---
```
