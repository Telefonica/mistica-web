
# Layout

## ResponsiveLayout

ResponsiveLayout provides a responsive page container that keeps content within adaptive bounds or expands to full width when needed.

### Usage

#### Use for

- Wrapping page sections in consistent responsive margins and maximum content widths
- Keeping layout rhythm stable across mobile, tablet, and desktop breakpoints
- Applying container-level variant/background surfaces around a responsive content area
- Switching to full-width mode when content intentionally needs edge-to-edge presentation

#### Don't use for

- Do not nest multiple ResponsiveLayout wrappers unnecessarily, as it can create redundant spacing behavior
- Do not use full-width mode by default when readable bounded content is expected
- Do not mix container variants and custom backgrounds without clear hierarchy intent
- Do not use ResponsiveLayout to solve component-level spacing issues that belong inside local layouts

## Grid

Grid is a responsive layout primitive for arranging content in rows and columns with controlled spacing and alignment.

### Usage

#### Use for

- Building multi-column layouts where content needs consistent structural rhythm
- Defining responsive track patterns with fixed counts or auto-fill behavior
- Controlling horizontal and vertical spacing independently across breakpoints
- Aligning groups of elements within a shared grid context for dashboards, cards, and content blocks

#### Don't use for

- Do not use Grid when simpler stack/inline patterns solve the layout more clearly
- Do not force complex track definitions that reduce readability and maintainability
- Do not rely on fixed dimensions that break content adaptability at smaller sizes
- Do not use layout-only structure as a substitute for semantic grouping and headings

## GridItem

GridItem defines how each element occupies and aligns within a Grid, including span, start position, and ordering.

### Usage

#### Use for

- Positioning individual blocks precisely inside a Grid layout
- Spanning items across multiple rows or columns when visual hierarchy requires larger footprints
- Controlling per-item alignment and order for responsive composition refinements
- Creating balanced layouts where featured elements coexist with standard-sized content

#### Don't use for

- Do not overuse manual start/span overrides when natural grid flow already works
- Do not create fragmented layouts with excessive custom placement rules
- Do not use item reordering in ways that hurt reading flow or accessibility expectations
- Do not treat GridItem positioning as a replacement for meaningful content hierarchy

## GridLayout

GridLayout provides predefined responsive column templates to compose balanced page sections with predictable proportions.

### Usage

#### Use for

- Building page sections with curated layout ratios such as `6+6`, `8+4`, `4+6`, `5+4`, and `3+9`
- Structuring two-area compositions (main + side content) without manually managing low-level grid math
- Centering medium or narrow content blocks using templates like `10` and `8`
- Controlling vertical rhythm and collapse behavior for responsive transitions from desktop to smaller
  breakpoints

#### Don't use for

- Do not use GridLayout when your composition requires fully custom per-item placement better suited to `Grid`
- Do not mix inconsistent templates in adjacent sections without clear visual rationale
- Do not force wide split templates for content that needs single-column reading focus
- Do not ignore collapse behavior when designing tablet/mobile experiences

## Stack

Use stack to arrange content vertically with a predefined spacing scale, including responsive spacing and distribution modes.

### Usage

#### Use for

- Building vertical layouts where each child needs consistent separation
- Applying the supported spacing scale values (0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 72, 80) between
  blocks, including responsive values by breakpoint
- Distributing children across available vertical space with `between`, `around`, or `evenly` when a
  flex-style layout is needed
- Grouping semantic lists by setting list roles so each child is exposed as a list item

#### Don't use for

- Do not use stack as a replacement for components that already define their own internal structure and
  spacing
- Do not assume arbitrary spacing values are supported; keep to the provided spacing scale
- Do not use flex distribution modes when fixed spacing values communicate hierarchy better
- Do not rely on visual grouping alone when content is a real list; provide the appropriate semantic role

## Inline

Inline arranges elements in a horizontal row with controlled spacing, optional wrapping, and responsive gap behavior across breakpoints.

### Usage

#### Use for

- Composing compact horizontal groups such as chips, metadata, tags, or inline actions
- Keeping consistent spacing between sibling elements with optional responsive spacing rules
- Allowing items to wrap onto multiple lines while preserving horizontal rhythm
- Building simple list-like horizontal collections when semantic list roles are needed

#### Don't use for

- Do not use Inline for vertical stacking patterns better handled by Stack or column layouts
- Do not force no-wrap behavior when content length is unpredictable and likely to overflow
- Do not combine mixed spacing strategies that produce inconsistent alignment between breakpoints
- Do not rely on Inline alone to solve complex grid compositions with asymmetrical structure

## Box

Box is a low-level spacing primitive used to apply consistent, responsive padding around content.

### Usage

#### Use for

- Applying consistent spacing rhythm around content blocks
- Adapting padding by breakpoint (mobile/tablet/desktop) without custom CSS
- Wrapping sections that need lightweight structural separation before using higher-level layout components

#### Don't use for

- Do not treat Box as a full layout system for complex composition
- Do not use it to replace semantic UI components that already define spacing behavior
- Do not rely on custom styling through this primitive; keep it focused on spacing and simple structure

## NegativeBox

NegativeBox offsets horizontal container gutters by applying negative side margins, allowing content to bleed to one or both edges.

### Usage

#### Use for

- Letting selected content extend beyond standard horizontal padding in constrained layouts
- Aligning edge-to-edge media or separators with surrounding full-bleed patterns
- Applying controlled left, right, or bilateral gutter compensation without custom wrapper styles
- Resolving specific alignment mismatches when parent container padding must be preserved

#### Don't use for

- Do not use NegativeBox as a general spacing system; reserve it for targeted gutter compensation
- Do not stack multiple negative-offset wrappers, which can create unpredictable overflow
- Do not use it to hide structural layout issues that should be solved at container level
- Do not apply edge bleed to critical text content when readability relies on safe horizontal padding

## Boxed

Boxed is a themed surface container used to group content inside a bounded, variant-aware block.

### Usage

#### Use for

- Grouping related content inside a clear visual container with consistent radius and background
- Creating emphasized sections that adapt to theme variant contexts (default, brand, alternative, negative,
  media)
- Applying responsive container dimensions when layout needs controlled width or height across breakpoints
- Building card-like blocks where content should read as one unit

#### Don't use for

- Do not use Boxed as a replacement for semantic components with their own interaction patterns
- Do not mix too many container variants in the same section without clear hierarchy
- Do not rely on fixed dimensions that can break content adaptability
- Do not use boxed emphasis for every section; reserve it for meaningful grouping

## Align

Align is a layout primitive that positions children on the horizontal and vertical axes using x/y alignment props, with optional width and height constraints.

### Usage

#### Use for

- Positioning content with simple axis-based alignment (`x` and `y`: start, center, end)
- Wrapping one or more elements in a container with optional `width` and `height`
- Passing telemetry or testing metadata through prefixed `dataAttributes`

#### Don't use for

- Do not use `Align` as a substitute for semantic layout structures that require dedicated components
- Do not rely on `Align` for complex multi-area layouts better handled by grid or other layout primitives

## FixedFooterLayout

FixedFooterLayout keeps footer content anchored to the bottom when space allows, while preserving readable scrollable content above it.

### Usage

#### Use for

- Keeping key actions persistently reachable at the bottom during long mobile-first flows
- Combining scrollable content with a stable footer action zone without covering focused elements
- Supporting responsive behavior where footer fixation adapts to available viewport height
- Maintaining visual continuity with contextual elevation and safe-area-aware spacing

#### Don't use for

- Do not use fixed footers for short/simple screens where inline actions are clearer
- Do not overload the footer with too many controls; keep it focused on essential actions
- Do not assume the footer is always fixed on every viewport; layout should still work when it is not
- Do not ignore background and contrast transitions between content area and footer layer

## FixedToTop

FixedToTop coordinates stacked fixed-top elements by sharing cumulative top offset, avoiding overlap between layered sticky regions.

### Usage

#### Use for

- Building interfaces with multiple fixed/sticky top layers that must stack predictably
- Positioning new fixed-top elements relative to already occupied top space
- Keeping global UI regions (for example headers and contextual bars) visually aligned during scroll
- Preserving layout coherence when different components need awareness of top offset accumulation

#### Don't use for

- Do not use this pattern when only one fixed-top element exists and no stacking logic is needed
- Do not hardcode top offsets that can conflict with accumulated fixed-top height
- Do not mix unmanaged fixed-position elements with FixedToTop-managed layers in the same stack
- Do not treat FixedToTop as a visual component; its role is layout coordination

## MasterDetailLayout

MasterDetailLayout adapts list-detail experiences across breakpoints, switching from single-pane on smaller screens to split-pane on larger screens.

### Usage

#### Use for

- Building master-detail flows where users browse a collection and open one item for deeper context
- Preserving a focused single-pane experience on mobile/tablet while keeping side-by-side context on desktop
- Supporting transitions between list view and detail view without changing overall page architecture
- Handling responsive information density where desktop benefits from concurrent master and detail visibility

#### Don't use for

- Do not use MasterDetailLayout when both panes must always be visible on all breakpoints
- Do not use it for unrelated side-by-side content that is not a true master-detail relationship
- Do not overload the master pane with complex controls that compete with detail comprehension
- Do not rely on this layout for multi-column dashboards requiring more than two coordinated regions

## HorizontalScroll

HorizontalScroll creates a horizontal overflow area so content can be explored by sideways scrolling when items do not fit in the available width.

### Usage

#### Use for

- Presenting rows of cards, chips, or media previews that need horizontal exploration
- Preserving item size and composition when compressing into narrow viewports would harm readability
- Enabling simple, touch-friendly sideways navigation without introducing carousel pagination logic
- Hiding the scrollbar only in polished surfaces where discoverability of horizontal movement remains clear

#### Don't use for

- Do not hide the scrollbar when users need clear affordance to understand the area is scrollable
- Do not place long-form text flows in HorizontalScroll; it is for lateral scanning patterns
- Do not use HorizontalScroll as a replacement for components that require grouped pages and controls
- Do not rely on it to solve poor content hierarchy; simplify item density and priorities first

## Divider

Divider is a subtle visual separator used to split related content areas while preserving rhythm and scanability.

### Usage

#### Use for

- Separating adjacent content blocks that belong to the same section but need clearer visual boundaries
- Improving scanability in dense lists, cards, and stacked layouts
- Reinforcing content grouping without introducing heavy structural containers
- Keeping separator styling consistent with the active theme variant

#### Don't use for

- Do not use dividers where spacing alone already provides clear separation
- Do not stack multiple dividers to simulate complex layout structures
- Do not rely on dividers as the only cue for section hierarchy when headings are needed
- Do not add separators after every minor element if it creates visual noise

#### Built-in separators

- `RowList` already renders dividers between rows
- `Accordion` already renders dividers between accordion items
- `Menu`/`MenuSection` already includes section separators
- `Drawer` and `Sheet` patterns render contextual dividers based on scroll state
- Prefer these built-in separators before adding extra `Divider` instances manually

## Accessibility

### Preserve semantics over visual layout

Use layout primitives for visual structure, and add semantics in the content they organize.

- Do not rely on spacing/alignment wrappers to communicate meaning
- Add headings, list semantics, and landmark roles in the content they wrap
- Use region naming (`aria-label` / `aria-labelledby`) when a section needs a clear accessible name

### Lists and grouped content

When a layout visually behaves like a list, ensure users also get list context.

- Add list semantics when users need to perceive grouped list items
- Keep list labels specific when multiple grouped regions are present

### Reading order and visual reordering

Keep DOM order aligned with reading order, especially in responsive layouts.

- Avoid visual reordering that breaks reading and focus order
- Ensure master/detail content remains understandable in both single-pane and split-pane views
- If content priority changes by breakpoint, verify keyboard and screen reader flow in each breakpoint

### Scrollable and fixed regions

Scrollable and fixed regions need clear purpose cues.

- Provide nearby heading/label context for horizontally scrollable content
- If scrollbars are hidden, keep alternative affordances that reveal overflow
- Keep fixed footer actions clearly labeled and easy to reach

### Decorative separators

`Divider` is visual separation, not structure.

- Do not use dividers as the only cue for hierarchy or section meaning
- Keep semantic grouping in headings, lists, and landmarks, with dividers as complementary decoration
