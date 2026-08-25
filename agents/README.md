# Agent skills

This directory holds the skills that an AI agent follows when it works on this repository. Each skill is one
directory with a `SKILL.md` inside, in plain markdown, and it belongs to no vendor.

| Skill                                                          | Purpose                                                                            |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [run-in-browser](./skills/run-in-browser/SKILL.md)             | Drive a component in the dockerized Chromium: interact, catch errors, measure, see |
| [read-component-specs](./skills/read-component-specs/SKILL.md) | Load the issue, the markdown specs, and the Figma design of a component            |

[AGENTS.md](../AGENTS.md) at the root carries the always-on rules, and links here.

## The vendor paths are symlinks

Every tool reads a file, or a directory, at a path of its own. Each of those paths is a symlink into this
directory, so one skill serves every tool, and no copy can drift.

| Path                                          | Tool                                                     | Links to                        |
| --------------------------------------------- | -------------------------------------------------------- | ------------------------------- |
| `AGENTS.md`                                   | Codex, Cursor, Gemini CLI, Jules, Zed, Copilot in GitHub | Nothing. It holds the rules     |
| `CLAUDE.md`                                   | Claude Code                                              | `AGENTS.md`                     |
| `.github/copilot-instructions.md`             | Copilot in VS Code                                       | `AGENTS.md`                     |
| `.claude/skills/<name>/SKILL.md`              | Claude Code, on demand by `description`                  | `agents/skills/<name>/SKILL.md` |
| `.github/instructions/<name>.instructions.md` | Copilot, by the `applyTo` key                            | `agents/skills/<name>/SKILL.md` |
| `.cursor/rules/<name>.mdc`                    | Cursor, by the `globs` key                               | `agents/skills/<name>/SKILL.md` |

Every pointer links to a file, never to a directory. Two tools taught us that rule:

- Git refuses to write a path that lies beyond a symbolic link. A directory symlink at a path that an older
  commit filled with real files breaks `git stash`, so it breaks the pre-commit hook.
- Prettier 3 rejects a symbolic link that you name on the command line, and `.prettierignore` does not
  suppress that error. `lint-staged` names every staged file, so the `lint-staged` key in `package.json` skips
  `.claude/`, `.cursor/`, and `.github/`, and a second key brings the real files of `.github/workflows/`,
  `.github/actions/`, and `.github/ISSUE_TEMPLATE/` back. `yarn prettier-check` still covers the js, ts, tsx,
  json, css, and html files of those directories.

A skill that needs a file beside its `SKILL.md` therefore needs one more symlink per file.

A skill carries the frontmatter keys of every tool at once:

```yaml
---
name: run-in-browser
description: What the skill does, and when a tool must load it
applyTo: 'src/**/*.tsx' # Copilot
globs: src/**/*.tsx # Cursor
alwaysApply: false # Cursor
---
```

A tool ignores a key that it does not know, and a human reads the markdown below the block. That costs
nothing, and it keeps the skill free of any vendor.

## How to extend this

- **A new skill.** Create `agents/skills/<name>/SKILL.md`, with the frontmatter above. Then add one symlink
  per tool that must load it, one per file, and one row in the first table.
- **A new tool.** Add one symlink at the path that the tool expects, and change no skill. If the tool needs a
  key of its own, add that key to the frontmatter.
- **A tool you drop.** Delete its symlinks. The skills stay.
