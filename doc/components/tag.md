# Tag

Use tag to display short categorical or status labels, with optional icon and badge count in a compact visual
token.

## Usage

### Use for

- Highlighting concise status/category signals such as promo, info, active/inactive, success, warning, or
  error
- Attaching short contextual metadata to cards, list items, or headers without taking much space
- Adding a small icon or badge/count when extra context is needed while preserving compact layout
- Using small or default tag size to match information density of the surrounding UI

### Don't use for

- Do not use for long text, descriptions, or content that requires wrapping and detailed reading
- Do not use as a primary action control; tags communicate state/category rather than trigger complex
  interactions
- Do not use Tag for interactive behaviors (selection, navigation, dismissal); use Chip for those interaction
  patterns
- Do not combine too many tags in tight spaces if they reduce scanability
- Do not rely on color alone to convey meaning; keep label text explicit and understandable

## Accessibility

### Tag text

Keep tag text short, explicit, and self-explanatory so meaning is understandable without relying on color.

- Avoid ambiguous labels like "Active" without nearby context when multiple entities or states are present
- Treat icons and badge counts as complementary cues; the text label should still communicate the core status
  or category

### Density and truncation

If many tags are shown together, prioritize the most relevant ones to reduce cognitive load for all users.

- When truncation can occur in narrow layouts, ensure full meaning is still available in surrounding content
