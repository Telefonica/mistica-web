# Headers

## Header

Header organizes section-level textual hierarchy with optional headline, pretitle, title, and description in a
readable, accessible structure.

### Usage

#### Use for

- Presenting section intros where users need clear context before interacting with content
- Structuring short content hierarchy (headline, pretitle, title, description) without creating custom
  typography stacks
- Adapting header density with standard and small visual modes while preserving hierarchy
- Keeping semantic heading order clear when title and pretitle levels differ

#### Don't use for

- Do not overload the header with long paragraph content better suited to body sections
- Do not use conflicting heading levels that weaken document hierarchy
- Do not add decorative text layers that compete with the main title intent
- Do not treat Header as a full page shell when layout orchestration is needed

## HeaderLayout

HeaderLayout provides the responsive shell for page headers, combining breadcrumbs, header content, and
optional extra areas in one coherent top section.

### Usage

#### Use for

- Composing page-top structures that combine navigation breadcrumbs and header messaging
- Positioning optional extra content below or side-by-side with the main header depending on viewport strategy
- Managing branded and default header background behavior consistently across responsive layouts
- Enabling controlled bleed-style transitions for hero-like top sections when needed

#### Don't use for

- Do not use HeaderLayout when only simple text heading content is needed without layout composition
- Do not mix side-by-side and stacked extra content patterns inconsistently within the same flow
- Do not force bleed/brand treatment where the page context does not require high-emphasis top sections
- Do not skip responsive spacing logic for breadcrumbs and header presence

## MainSectionHeader

MainSectionHeader introduces major sections with high-prominence title, optional supporting description, and
optional primary action.

### Usage

#### Use for

- Introducing top-level sections where users need immediate orientation and emphasis
- Pairing concise section context with one clear, related call to action
- Creating strong visual hierarchy for key content entry points in desktop and mobile layouts
- Supporting page starts where section intent should be explicit before users scroll

#### Don't use for

- Do not use it for low-priority subsection headings that need lighter hierarchy
- Do not add multiple competing actions that weaken the main section intent
- Do not combine with oversized adjacent navigation elements that create visual overload
- Do not write long descriptive blocks where concise section framing is expected

## MainSectionHeaderLayout

MainSectionHeaderLayout wraps MainSectionHeader in a responsive, brand-aware top-area layout with consistent
spacing and width control.

### Usage

#### Use for

- Placing `MainSectionHeader` within a consistent page-top container across breakpoints
- Applying predictable horizontal/vertical spacing for major section introductions
- Enabling brand-variant top-area treatment while keeping content width readable
- Standardizing top-section layout in pages that repeat the same header composition

#### Don't use for

- Do not use this layout wrapper when your header is not a `MainSectionHeader` pattern
- Do not combine inconsistent top spacing systems in adjacent sections
- Do not force brand-style top treatment in neutral contexts without design rationale
- Do not treat this as a generic content container for non-header page regions

## Accessibility

### Heading hierarchy

Header heading levels are configurable.

- `Header` title defaults to `h2` (`titleAs`) and supports `h1` to `h6`
- `MainSectionHeader` title defaults to `h1` (`titleAs`)
- `Header` pretitle supports `h1` to `h6` (`pretitleAs`) and is non-heading by default

If you change defaults:

- If only one heading exists, that heading is announced first
- If both pretitle and title are headings, the one with higher hierarchy is read first
- Do not assign the same heading level to pretitle and title

### Text limitation

Headers support visual text truncation.

- Prefer layouts that expose full text
- If truncation is required, keep complete meaning available to assistive technologies
- Do not truncate critical section intent

### Slot

Header compositions can include custom content (headline nodes, breadcrumbs, or `extra` in `HeaderLayout`).
Because these areas are fully customizable, ensure custom controls, icons, and media preserve accessible names,
focus order, and semantics.

### Breadcrumbs and page-top composition

In `HeaderLayout`, breadcrumbs and header content are composed at the top of the page.

- Ensure breadcrumbs use a clear navigation label and current-page semantics
- Keep header text concise so users can quickly understand page context before main content
- Do not duplicate equivalent top-level headings in adjacent regions
