You are building a React page component that uses @telefonica/mistica (already installed).

**IMPORTANT**: You only have read tools available. Do NOT attempt to write files. Output the complete file
content as a code block in your response.

First, read the consumer documentation before writing any code:

- `skills/mistica-react/SKILL.md` — consumer skill with critical rules (READ THIS FIRST)
- `doc/llms.md` — extended component reference and critical rules
- `doc/patterns.md` — layout patterns and color rules
- `doc/components.md` — component props reference

Then create a `NotificationsPage` component in a single file `notifications-page.tsx`. It should show:

- A navigation bar with a back button and title "Notifications"
- A list of 5 mock notifications, each with: title, description, a relative timestamp, and an unread badge
  with a count
- An empty state when there are no notifications (with a button to simulate clearing all)

Hard constraints — violating any of these is a bug:

- Do NOT hardcode any color values (no hex codes like `#019df4`, no `rgb()`, no named CSS colors like `blue`)
- Do NOT set font sizes or font weights manually — use Mistica text components (`Text1`–`Text10`,
  `Title1`–`Title4`)
- Do NOT set border radius manually
- Use Mistica layout primitives (`Box`, `Stack`, `Inline`, `ResponsiveLayout`) instead of plain `<div>` for
  layout
- Access colors via `skinVars.colors.*` from `@telefonica/mistica`
- Wrap the component export with `ThemeContextProvider` using `getMovistarNewSkin()`
- Import the mistica CSS: `import '@telefonica/mistica/css/mistica.css'`
- Add `'use client';` as the first line
- Namespace all React hooks: `React.useState`, not `useState`

Output:

### notifications-page.tsx

```tsx
...full file content...
```
