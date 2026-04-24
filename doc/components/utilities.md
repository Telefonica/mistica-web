# Utilities

## ThemeConfig

ThemeConfig provides reusable behavior to keep component logic consistent across the product.

### Usage

#### Use for

- Sharing common state and behavior across multiple components
- Keeping implementation aligned with Mística patterns

#### Don't use for

- Do not duplicate equivalent logic when this utility already exists
- Do not use it without understanding its side effects and scope

## ThemeContext

ThemeContext provides reusable behavior to keep component logic consistent across the product.

### Usage

#### Use for

- Sharing common state and behavior across multiple components
- Keeping implementation aligned with Mística patterns

#### Don't use for

- Do not duplicate equivalent logic when this utility already exists
- Do not use it without understanding its side effects and scope

## ThemeContextProvider

ThemeContextProvider provides reusable behavior to keep component logic consistent across the product.

### Usage

#### Use for

- Sharing common state and behavior across multiple components
- Keeping implementation aligned with Mística patterns

#### Don't use for

- Do not duplicate equivalent logic when this utility already exists
- Do not use it without understanding its side effects and scope

## ThemeVariant

Theme variant/context: Adjustments at the component level based on configuration.

### Usage

#### Use for

- Applying the documented component pattern in product UI
- Keeping user experience coherent across screens and flows

#### Don't use for

- Do not replace a more suitable semantic component with this one
- Do not customize behavior in ways that conflict with Mística guidance

## TrackingConfig

TrackingConfig provides reusable behavior to keep component logic consistent across the product.

### Usage

#### Use for

- Sharing common state and behavior across multiple components
- Keeping implementation aligned with Mística patterns

#### Don't use for

- Do not duplicate equivalent logic when this utility already exists
- Do not use it without understanding its side effects and scope

## useTrackingConfig

useTrackingConfig provides reusable behavior to keep component logic consistent across the product.

### Usage

#### Use for

- Sharing common state and behavior across multiple components
- Keeping implementation aligned with Mística patterns

#### Don't use for

- Do not duplicate equivalent logic when this utility already exists
- Do not use it without understanding its side effects and scope

## OverscrollColorProvider

OverscrollColorProvider provides reusable behavior to keep component logic consistent across the product.

### Usage

#### Use for

- Sharing common state and behavior across multiple components
- Keeping implementation aligned with Mística patterns

#### Don't use for

- Do not duplicate equivalent logic when this utility already exists
- Do not use it without understanding its side effects and scope

## useSetOverscrollColor

useSetOverscrollColor provides reusable behavior to keep component logic consistent across the product.

### Usage

#### Use for

- Sharing common state and behavior across multiple components
- Keeping implementation aligned with Mística patterns

#### Don't use for

- Do not duplicate equivalent logic when this utility already exists
- Do not use it without understanding its side effects and scope

## TopDistanceContext

TopDistanceContext provides reusable behavior to keep component logic consistent across the product.

### Usage

#### Use for

- Sharing common state and behavior across multiple components
- Keeping implementation aligned with Mística patterns

#### Don't use for

- Do not duplicate equivalent logic when this utility already exists
- Do not use it without understanding its side effects and scope

## Overlay

Overlay provides a full-viewport interaction layer behind temporary surfaces, enabling outside-click dismissal
and optional body scroll lock.

### Usage

#### Use for

- Dimming or blocking background interaction while a modal, menu, or transient surface is open
- Enabling outside-tap/click dismissal patterns for contextual surfaces
- Preventing background page scroll when focus should remain on the active overlayed content
- Creating consistent full-screen interaction coverage across desktop and mobile browsers

#### Don't use for

- Do not use Overlay as a standalone content container for primary page layouts
- Do not lock body scroll when background interaction should remain available
- Do not rely on overlay dismissal for destructive or irreversible flows without explicit confirmation
- Do not stack multiple independent overlays when a single coordinated layer can manage focus and dismissal

## FocusTrap

FocusTrap keeps keyboard focus constrained within a subtree while it is active, helping modal surfaces remain
accessible and self-contained.

### Usage

#### Use for

- Trapping tab navigation inside active dialogs, drawers, popovers, or other temporary surfaces
- Preventing focus from escaping to background content while a modal interaction is open
- Grouping related focus locks when multiple coordinated trapped regions are needed
- Temporarily disabling the trap when the same surface transitions between modal and non-modal behavior

#### Don't use for

- Do not use FocusTrap for non-modal inline content where free page navigation is expected
- Do not leave background content interactive without matching dismissal/focus management strategy
- Do not nest independent focus traps without intentional coordination, as this can break keyboard flow
- Do not rely on focus trapping alone for accessibility; pair it with clear labels and predictable dismissal

## Portal

Portal renders children outside the parent DOM hierarchy (into `document.body`), which is useful for overlays
and floating layers that need independent stacking and positioning.

### Usage

#### Use for

- Rendering modals, overlays, tooltips, or menus that must escape ancestor clipping or stacking contexts
- Isolating floating UI layers from parent layout constraints while preserving React state ownership
- Mounting temporary surfaces near the document root for reliable fixed/absolute positioning behavior
- Keeping layered UI predictable across complex containers with transforms or overflow rules

#### Don't use for

- Do not use Portal for regular in-flow content that should participate in local layout
- Do not assume portal rendering solves focus/keyboard handling by itself; manage accessibility explicitly
- Do not mount many unrelated portals when one coordinated layer strategy is enough
- Do not forget cleanup expectations for temporary surfaces and listeners attached to portaled content

## applyAlpha

applyAlpha returns a color with an updated alpha channel, supporting raw skin RGB CSS variables, hex, rgb, and
rgba inputs for consistent translucent styling.

### Usage

#### Use for

- Applying opacity consistently without duplicating manual rgba conversions across components
- Working directly with `skinVars.rawColors` tokens and preserving theme-driven color behavior
- Normalizing alpha application across mixed color input formats in reusable styling utilities

#### Don't use for

- Do not pass out-of-range alpha values; keep alpha between `0` and `1`
- Do not use applyAlpha as a substitute for semantic color-token selection
- Do not assume the resulting translucent color always meets contrast requirements; validate accessibility
- Do not rely on color-format fallbacks in critical paths when deterministic color output is required

## createNestableContext

createNestableContext provides reusable behavior to keep component logic consistent across the product.

### Usage

#### Use for

- Sharing common state and behavior across multiple components
- Keeping implementation aligned with Mística patterns

#### Don't use for

- Do not duplicate equivalent logic when this utility already exists
- Do not use it without understanding its side effects and scope

## NestableContext

NestableContext provides reusable behavior to keep component logic consistent across the product.

### Usage

#### Use for

- Sharing common state and behavior across multiple components
- Keeping implementation aligned with Mística patterns

#### Don't use for

- Do not duplicate equivalent logic when this utility already exists
- Do not use it without understanding its side effects and scope
