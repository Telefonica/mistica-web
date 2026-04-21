You are building a React front page for a streaming service (Netflix-style) using @telefonica/mistica (already
installed).

**IMPORTANT**: You only have read tools available. Do NOT attempt to write files. Output the complete file
content as a code block in your response.

First, read these files before writing any code:

- `skills/mistica-react/SKILL.md` — consumer skill with component mapping for complex screens (READ THIS
  FIRST)
- `doc/llms.md` — critical rules and full component catalog
- `doc/patterns.md` — page composition, color rules, layout patterns
- `doc/components.md` — full component API (Hero, Carousel, CoverCard, MainNavigationBar, etc.)
- `doc/layout.md` — Box, Stack, Inline, ResponsiveLayout usage

Build a `StreamingHomePage` component in a single file `streaming-home-page.tsx`. The page must include:

1. A top navigation bar with: logo area, sections (Home, Movies, Series, Kids, My List), search icon, and
   profile avatar — use `MainNavigationBar`
2. A large hero/featured content area — use `CoverHero` with Tag, title, description, primary + secondary
   buttons
3. At least 3 horizontal scrolling content rows, each with a `Title1` section heading and a `Carousel` of
   `CoverCard` items (at least 6 cards per row) — some cards with `Tag type="promo"` for NEW/TOP labels
4. An `EmptyState` component for the "My List" section when it has no saved content
5. State management with `React.useState` for the active nav section and for toggling My List empty state

Mock data can be inline arrays. Use `https://picsum.photos/seed/{n}/400/600` for poster images.

Output:

### streaming-home-page.tsx

```tsx
...full file content...
```
