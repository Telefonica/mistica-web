---
name: read-component-specs
description: Specification precedence and workflow for developing new mistica-web components
---

# read-component-specs

When developing a new component in mistica-web, consult specifications in this order of precedence:

1. **GitHub issue ticket** — requirements and context
2. **Markdown specifications** — design team specs extracted from Figma; **overrides Figma** if conflicts
   exist
3. **Figma design** — original design file; can be superseded by markdown specs

## Workflow

- Start with the GitHub issue ticket—it often already contains links to both the markdown specs and Figma
  design
- Ask for these resources when starting component work if not already available in the ticket
- Always verify specifications match across all three sources before implementation
- If you find conflicts, markdown specs take precedence over the Figma design

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
