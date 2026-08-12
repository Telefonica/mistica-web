---
name: read-component-specs
description: Proactively load and consolidate specifications when discussing mistica-web components
---

# read-component-specs

**Proactively invoke this skill whenever a component is being discussed or modified.**

Load component specifications in order of precedence:

1. **GitHub issue ticket** — requirements and context
2. **Markdown specifications** — design team specs extracted from Figma; **overrides Figma** if conflicts
   exist
3. **Figma design** — original design file; can be superseded by markdown specs

## When to Use (Auto-trigger)

Automatically load this skill when:

- User starts working on a component (new or existing)
- User describes changes to a component
- User asks about component behavior/API
- Component is mentioned in the context of a task
- Before making any component modifications

## Workflow: Auto-load and Fetch

When component work is detected:

1. **Check memory** — Is there already a `component-{name}.md` in project memory?

   - ✅ If yes → Load and reference existing specs
   - ❌ If no → Proceed to fetch

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

6. **Save to memory** — Create `component-{name}.md` for future sessions:
   - GitHub Issue link
   - Specs Markdown link
   - Figma Design link
   - Key requirements
   - Design decisions
   - Development notes

## Memory Format

Store specs in
`/Users/mbertamini/.claude/projects/-Users-mbertamini-Code-Work-mistica-web/memory/component-{name}.md`:

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

## Saving to memory

After consolidating specifications, save key details to project memory so they persist across development
sessions:

- **Component name** and GitHub issue reference
- **Resource links**: GitHub issue, markdown specs, Figma design
- **Key requirements**: scope, API, interactions, edge cases
- **Design decisions**: conflicts resolved, precedence notes, implementation approach
- **Development notes**: blockers, learnings, next steps

Store in `/Users/mbertamini/.claude/projects/-Users-mbertamini-Code-Work-mistica-web/memory/` with a file
named `component-{name}.md` using this format:

```markdown
---
name: component-{name}
description: Specifications and context for {component-name}
metadata:
  type: project
---

**GitHub Issue**: [#{issue-number}](issue-url) **Specs Markdown**: [specs/{name}.md](specs-url) **Figma
Design**: [Figma file](figma-url)

## Requirements

[Key requirements from issue and specs]

## Design decisions

[Conflicts resolved, precedence notes, implementation approach]

## Notes

[Blockers, learnings, next steps]
```

In future sessions, Claude will automatically recall this context from memory.

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
