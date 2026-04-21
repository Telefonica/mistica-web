# /check-conventions

Load the `mistica-contributor` skill, then audit a component for convention violations.

## Instructions

1. Read `skills/mistica-contributor/SKILL.md` — specifically "Task: check conventions on a component"
2. Read all 4 files for the named component (tsx, css.ts, story, test)
3. Run every check listed in the skill and report violations in format: `[RULE] file:line — description — fix`
4. If all checks pass, print: `✓ All conventions pass for {component}`
5. Offer to fix violations automatically

The user will provide: component name or file path.
