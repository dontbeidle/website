# CLAUDE.md

## Project Overview

DontBeIdle community website at `idle.uz`. Astro 7, Tailwind CSS 4, GitHub Pages. Two languages: Karakalpak (`kaa`, default) and English (`en`).

## Commands

```bash
npm run dev        # localhost:4321
npm run build      # production build → dist/
npm run preview    # preview build
```

After changing content collection schema, clear cache: `rm -rf .astro`

## Deploy

Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) → GitHub Pages. Pages source is set to `workflow` (not branch). `CNAME` maps to `idle.uz`.

## Architecture

| Layer | Tech | Config |
|-------|------|--------|
| SSG | Astro 7 | `astro.config.mjs` |
| CSS | Tailwind 4 | `@tailwindcss/vite` in astro config |
| Content | Collections + Markdown | `src/content.config.ts` |
| i18n | Astro built-in routing | `kaa` default (no prefix), `en` under `/en/` |

### Fonts

- **Inter** — body (`--font-sans`)
- **Unbounded** — "DontBeIdle" title only (`--font-unbounded`)

Loaded in `src/layouts/Base.astro`, registered in `src/styles/global.css`.

### Key files

```
src/
├── content.config.ts              # Collection schemas (projects, blog)
├── i18n/
│   ├── ui.ts                      # All UI translations
│   └── utils.ts                   # getLangFromUrl, useTranslations, getLocalePath, getSwitchLangPath
├── layouts/Base.astro             # HTML shell (head, nav, footer)
├── components/
│   ├── Header.astro               # Nav + language switcher
│   ├── Footer.astro               # GitHub, Telegram links
│   ├── ProjectCard.astro          # Multi-repo project card
│   └── BlogCard.astro             # Blog post card
├── content/
│   ├── projects/{kaa,en}/*.md     # Project entries
│   └── blog/{kaa,en}/*.md         # Blog entries
├── pages/                         # kaa pages at root, en/ mirrors structure
└── styles/global.css              # Tailwind import, theme, animations
```

## Adding content

**Project** — create both `src/content/projects/kaa/<name>.md` and `en/<name>.md`:

```yaml
---
title: "Project name"
description: "Short description"
repos:
  - platform: "Python"
    url: "https://github.com/dontbeidle/repo"
  - platform: "Website"
    url: "https://example.com"
tags: ["nlp", "web"]
---
```

A project can have multiple `repos` entries (e.g. Python, JavaScript, CLI variants of the same project).

**Blog post** — create both `src/content/blog/kaa/<name>.md` and `en/<name>.md`:

```yaml
---
title: "Post title"
description: "Short description"
date: 2026-08-31
author: "Author name"
---
```
