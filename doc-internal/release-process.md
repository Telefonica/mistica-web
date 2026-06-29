> **Internal contributor doc.** This file is for people authoring the `@telefonica/mistica` library source. It
> is **NOT** shipped to consumers of the published package and must never be linked from a consumer-facing
> skill or from `doc/`.

# Release process and what ships

This document records how the package is released and, critically, which paths reach consumers.

## Conventional commits and contributing

Read `CONTRIBUTING.md` before opening a pull request. Commits follow the Conventional Commits specification;
the release is automated from commit history, so the commit type and scope drive the next version bump.
Release commits are tagged `[skip ci]`.

## The tarball allowlist

`package.json` uses a `files` **allowlist**. Only the globs listed there are published; anything not listed is
excluded by default. The shipped trees are:

- `dist/**`, `dist-es/**`, `css/**` — the build outputs.
- `doc/**` — consumer documentation, including `doc/llms/llms.md`.
- `src/**` minus tests, stories, and generated sources.
- `community.js`, `community.d.ts`.

Because the mechanism is an allowlist, the contributor-only trees are excluded automatically and must stay
that way:

- `.agents/` — develop-the-library skills, active only in this workspace.
- `published-skills/` — the consumer skill _sources_; consumers fetch these through
  `npx skills add telefonica/mistica-web`, not through `node_modules`.
- `doc-internal/` — this contributor documentation.
- `.claude-plugin/`, `TESTING-MISTICA-SKILL.md` — tooling and methodology.

After changing the `files` allowlist, verify the tarball contents:

```
npm pack --dry-run
```

Confirm that `doc/` is present and that `.agents/`, `published-skills/`, and `doc-internal/` are absent.

## Two independent distribution channels

The library reaches agents through two separate channels, and they resolve from different roots:

- **`npx skills add telefonica/mistica-web`** (the `skills` CLI) discovers the consumer skill from
  `published-skills/` via the root `.claude-plugin/plugin.json` `skills` array. The develop skills under
  `.agents/skills/` carry `metadata.internal: true`, so this channel skips them.
- **The Claude Code plugin marketplace** historically pinned the `plugin/` subdir at a fixed SHA. When
  re-pinning to a commit that adopts this layout, point the marketplace source `path` at the repository root
  so it reads the root `.claude-plugin/plugin.json` and `published-skills/`.
