---
name: read-component-specs
description: Proactively load and consolidate specifications when discussing mistica-web components
applyTo: 'src/**/*.tsx,src/**/*.css.ts,playroom/**'
globs: src/**/*.tsx,src/**/*.css.ts,playroom/**
alwaysApply: false
---

# read-component-specs

**Proactively invoke this skill whenever a component is being discussed or modified.**

Load component specifications in order of precedence:

1. **GitHub issue ticket** — requirements and context
2. **Markdown specifications** — design team specs extracted from Figma; **overrides Figma** if conflicts
   exist
3. **Figma design** — original design file; can be superseded by markdown specs. For measurements, trust the
   dimension-annotated images ("cotas", or images under "anatomy" with red labels measuring things), not the
   raw values a Figma MCP tool reports (see [Figma MCP usage](#figma-mcp-usage))

## When to Use (Auto-trigger)

Automatically load this skill when:

- User starts working on a component (new or existing)
- User describes changes to a component
- User asks about component behavior/API
- Component is mentioned in the context of a task
- Before making any component modifications

## Workflow: Auto-load and Fetch

When component work is detected:

1. **Check for a saved spec** — Prefer Claude Code memory when it is available; otherwise read
   `.component-specs/{name}.md` from the working tree.

   - ✅ If found in either place → Load and reference existing specs
   - ❌ If neither has it → Proceed to fetch

2. **Ask for specifications** if missing:

   - "Which component are you working on?"
   - "What's the GitHub issue number? (e.g., #1592)"
   - Or provide component name directly

3. **Auto-fetch in parallel:**

   - `gh issue view {issue} --json body --jq '.body'` → extract requirements and resource links
   - `curl -s https://raw.githubusercontent.com/Telefonica/mistica-design/aweell-generate-figma-specs/specs/{name}.md`
     → fetch full spec

4. **Extract and consolidate** key sections:

   - Issue requirements and context
   - Anatomy/structure
   - Behaviour specifications
   - Token usage (default, brand, alternative, negative, media variants)
   - Design decisions and edge cases
   - Figma design link

5. **Present consolidated summary** with precedence notes:

   - Highlight conflicts between sources (markdown takes precedence)
   - Link to all three sources
   - Extract actionable requirements

6. **Save the spec** — When Claude Code memory is available, save it there as the primary store. Always also
   write `.component-specs/{name}.md` in the working tree, so tools without memory keep a usable fallback:
   - GitHub Issue link
   - Specs Markdown link
   - Figma Design link
   - Key requirements
   - Design decisions
   - Development notes

## Where the spec is stored

This follows the repo-wide rule for AI-derived local context in [AGENTS.md](../../../AGENTS.md): prefer the
tool's own memory when available, and always also write a git-ignored file so a tool without memory keeps a
fallback. For this skill the two stores are:

1. **Claude Code memory** (primary, when available) — Claude recalls it automatically in future sessions. See
   [Claude Code memory](#claude-code-memory) below.
2. **`.component-specs/{name}.md`** (fallback, always written) — a local file for tools without memory (GitHub
   Copilot, Cursor, …). The path is repo-relative, so any assistant reads and writes it with a normal file
   operation.

The canonical sources stay the GitHub issue, the specs markdown, and Figma; both stores only cache the
consolidation on your machine.

## Spec File Format

```markdown
---
name: component-{name}
description: Specifications and context for {component-name}
metadata:
  type: project
---

**GitHub Issue**: [#{issue}](url) **Specs**: [specs/{name}.md](url) **Figma**: [Design](url)

## Requirements

[From issue and specs]

## Anatomy

[Key structure]

## Behaviour

[Key behaviours]

## Tokens

[Token usage by variant]

## Design decisions

[Conflicts resolved, precedence notes]

## Notes

[Blockers, learnings, next steps]
```

## Specification Precedence

If conflicts exist between sources:

1. **Markdown specs** take precedence (design team canonical source)
2. **GitHub issue** provides context and requirements
3. **Figma design** is reference (can be superseded)

Always note conflicts when found.

## Figma MCP usage

Call a Figma MCP tool only when the markdown spec and the GitHub issue do not answer the question — each call
has a real cost. Reduce the number of calls; do not skip Figma entirely.

For **measurements**, do not trust the raw values that a Figma MCP tool returns (`get_design_context`,
`get_metadata`). The design team can set a final measurement that differs from the raw Figma layout. Use the
dimension-annotated images ("cotas") in the spec or design file instead.

## Saving the spec

After consolidating specifications, save the key details so they persist across development sessions and
across tools. Prefer Claude Code memory when available (see [Claude Code memory](#claude-code-memory)), and
always also write `.component-specs/{name}.md` using the format in [Spec File Format](#spec-file-format)
above. The directory is git-ignored, so the cache stays local and is never committed.

### Claude Code memory

When Claude Code is in use, save the spec to its private per-project memory
(`~/.claude/projects/<project>/memory/component-{name}.md`). Claude recalls it automatically in later
sessions, so it is the primary store. Other tools cannot read this memory, which is why the
`.component-specs/{name}.md` fallback must be written as well.

## Using with a subagent

For comprehensive specification gathering and analysis, use a general-purpose subagent:

```
/Agent
description: Consolidate component specifications
prompt: Use the read-component-specs skill to gather specifications for [component-name] (issue #[issue-number]). Fetch from GitHub issue, markdown specs, and Figma design. Provide a consolidated summary and highlight any conflicts or inconsistencies.
```

The subagent will fetch all three sources and synthesize them into an organized document.

## Example: Sidenav component

- **Issue**: https://github.com/Telefonica/mistica-web/issues/1592
- **Specs markdown**:
  https://github.com/Telefonica/mistica-design/blob/aweell-generate-figma-specs/specs/sidenav.md
- **Figma design**: https://www.figma.com/design/4woEBHpukbLVkmk9UJTGUD/%F0%9F%94%B8-Sidenav-Specs?m=dev
