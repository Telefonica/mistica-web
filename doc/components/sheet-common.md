Children:
- SheetBody → Sheet

---

## Sheet

Sheet presents temporary, focus-trapped bottom-sheet content for contextual decisions, actions, and
  lightweight task flows.

### Use for

- Presenting contextual options or explanations without navigating away from the current screen
- Supporting mobile-friendly bottom-sheet interactions with clear dismissal behavior
- Hosting short, focused interactions such as single selection, action lists, or informative content
- Keeping temporary decision points consistent across web and hybrid sheet experiences

### Don't use for

- Do not use Sheet for complex multi-step workflows that require full-page ownership
- Do not overload sheets with dense content that reduces scanability and quick decision making
- Do not hide critical irreversible actions inside transient sheet surfaces without stronger confirmation
  flows
- Do not stack multiple sheet layers at once

## SheetBody

SheetBody structures sheet content with sticky title/actions regions, optional descriptive text, and
  scroll-aware dividers.

### Use for

- Composing sheet content with consistent title, subtitle, description, and action areas
- Keeping primary actions persistently reachable through sticky bottom action zones
- Improving readability with structured spacing and optional multi-paragraph description support
- Preserving context during scroll using sticky headers and divider cues

### Don't use for

- Do not place long unstructured content without hierarchy inside SheetBody
- Do not overload sticky action areas with too many competing controls
- Do not omit clear title context when the sheet drives a user decision
- Do not use SheetBody outside sheet containers as a generic page layout wrapper
