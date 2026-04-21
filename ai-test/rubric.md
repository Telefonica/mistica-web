# AI Output Quality Rubric

Each rule is checked by `scripts/score-ai-output.js` against the saved `.txt` response files. A rule is PASS
when the condition holds; FAIL otherwise.

## Prompt 01 — New Component (12 rules)

| ID  | Rule                                                               | Check                                                                                              |
| --- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| R01 | `'use client'` directive present in tsx block                      | tsx code block contains `'use client'`                                                             |
| R02 | React hooks are namespaced (`React.useState`, not bare `useState`) | tsx block does NOT match `\buseState\(` or `\buseEffect\(` or `\buseRef\(` without `React.` prefix |
| R03 | No `@vanilla-extract/css` imported inside a `.tsx` block           | tsx block does NOT contain `from '@vanilla-extract/css'`                                           |
| R04 | No `sprinkles.css` imported inside a `.tsx` block                  | tsx block does NOT contain `sprinkles.css`                                                         |
| R05 | Colors use design tokens, not hardcoded values                     | tsx and css blocks do NOT match `#[0-9a-fA-F]{3,6}\b` or `rgb\(`                                   |
| R06 | Story uses `StoryComponent<Args>` generic                          | story block contains `StoryComponent<Args>`                                                        |
| R07 | Story sets `.storyName`                                            | story block contains `.storyName =`                                                                |
| R08 | Story sets `.args`                                                 | story block contains `.args =`                                                                     |
| R09 | Test wraps with `ThemeContextProvider` + `makeTheme`               | test block contains `ThemeContextProvider` AND `makeTheme`                                         |
| R10 | Test uses semantic queries (`getByRole` or `getByLabelText`)       | test block contains `getByRole\|getByLabelText`                                                    |
| R11 | Component exported from `src/index.tsx`                            | index.tsx block or edit contains the component name                                                |
| R12 | All 4 file types present (tsx + css.ts + story + test)             | output contains at least 4 code blocks with these file names                                       |

## Prompt 02 — Add Prop (3 rules)

| ID  | Rule                                   | Check                                       |
| --- | -------------------------------------- | ------------------------------------------- |
| R13 | Story `argTypes` updated with new prop | story block contains `outlined` in argTypes |
| R14 | Story `args` updated with new prop     | story block contains `outlined` in args     |
| R15 | Playroom snippet updated               | playroom block contains `outlined`          |

## Prompt 03 — Consumer Screen (5 rules)

| ID  | Rule                                        | Check                                                             |
| --- | ------------------------------------------- | ----------------------------------------------------------------- |
| R16 | No hardcoded colors                         | output does NOT match `#[0-9a-fA-F]{3,6}\b` or `rgb\(`            |
| R17 | Uses `skinVars.colors` for token access     | output contains `skinVars`                                        |
| R18 | Layout via Mistica primitives, not raw divs | output contains `Stack\|Box\|Inline\|ResponsiveLayout` for layout |
| R19 | Text via Mistica text components            | output contains `Text[1-9]\|Title[1-4]`                           |
| R20 | `ThemeContextProvider` present              | output contains `ThemeContextProvider`                            |

## Prompt 04 — Complex Screen / Netflix Front Page (10 rules)

| ID  | Rule                                                          | Check                                                          |
| --- | ------------------------------------------------------------- | -------------------------------------------------------------- |
| R21 | `'use client'` directive present                              | output contains `'use client'`                                 |
| R22 | React hooks namespaced (no bare useState/useEffect)           | output does NOT match bare `useState\|useEffect\|useRef` calls |
| R23 | Uses `MainNavigationBar` for top navigation                   | output contains `MainNavigationBar`                            |
| R24 | Uses `CoverHero` or `Hero` or `Slideshow` for featured banner | output matches `CoverHero\|<Hero\|Slideshow`                   |
| R25 | Uses `Carousel` for horizontal content rows                   | output contains `Carousel`                                     |
| R26 | Uses `CoverCard` or `MediaCard` for content tiles             | output matches `CoverCard\|MediaCard`                          |
| R27 | No hardcoded colors (no hex, no rgb)                          | output does NOT match `#[0-9a-fA-F]{3,6}\b` or `rgb\(`         |
| R28 | Uses `skinVars` for any color tokens                          | output contains `skinVars`                                     |
| R29 | Uses Mistica text components                                  | output matches `Text[1-9]\|Text10\|Title[1-4]`                 |
| R30 | `ThemeContextProvider` wraps the component                    | output contains `ThemeContextProvider`                         |

## Scoring

- Total rules: 30
- Each PASS = 1 point
- Score = PASS count / 30 × 100%
- Per-prompt subscores also shown
