# Navigation

## MainNavigationBar

MainNavigationBar provides primary product navigation with section switching, responsive desktop menus, and mobile burger-menu behavior.

### Usage

#### Use for

- Organizing top-level product areas with clear section navigation from a persistent header
- Supporting responsive navigation patterns that adapt from desktop section menus to mobile burger menu
- Combining brand/logo presence with primary navigation and optional high-priority right-side actions
- Managing information architecture where users need predictable access to multiple main sections

#### Don't use for

- Do not use MainNavigationBar for simple single-flow screens with only back/title needs
- Do not overload section menus with deep, hard-to-scan content hierarchies
- Do not mix inconsistent section interaction patterns that confuse open/close behavior
- Do not use it for short transactional funnels where reduced navigation is preferable

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| burgerMenuExtra | `ReactNode` | No | - |  |
| desktopLargeMenu | `boolean` | No | false |  |
| large | `boolean` | No | false |  |
| logo | `ReactNode` | No | - |  |
| right | `ReactNode` | No | - |  |
| sections | `readonly MainNavigationBarSection[]` | No | [] |  |
| selectedIndex | `number` | No | - |  |
| topFixed | `boolean` | No | true |  |
| topSlot | `ReactNode` | No | - |  |
| topSlotBackgroundColor | `string` | No | - |  |
| variant | `"default" \| "brand" \| "negative" \| "alternative" \| "media" \| "inverse"` | No | default |  |
| wide | `boolean \| WideConfig` | No | false |  |
| withBorder | `boolean` | No | true |  |

## NavigationBar

NavigationBar is the standard top app bar for page-level navigation, supporting back navigation, title, and contextual right-side actions.

### Usage

#### Use for

- Structuring screen-level navigation with clear title context and optional back behavior
- Hosting a small set of high-priority contextual actions in the right area
- Keeping page chrome stable across flows where users move between hierarchical views
- Building standard app-level headers when global section menus are not required

#### Don't use for

- Do not use NavigationBar as a global multi-section site menu; use MainNavigationBar instead
- Do not overcrowd the right slot with many competing actions
- Do not hide essential navigation intent behind ambiguous icon-only controls
- Do not use it as a funnel-specific confirmation header when funnel behavior is needed

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| onBack | `() => void` | No | - |  |
| paddingX | `number` | No | 0 | @deprecated use wide |
| right | `ReactNode` | No | - |  |
| title | `string` | No | - |  |
| titleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| topFixed | `boolean` | No | true |  |
| variant | `"default" \| "brand" \| "negative" \| "alternative" \| "media" \| "inverse"` | No | default |  |
| wide | `boolean \| WideConfig` | No | false |  |
| withBorder | `boolean` | No | true |  |

## NavigationBarAction

NavigationBarAction is an interactive header control used for concise contextual actions in navigation bars.

### Usage

#### Use for

- Triggering high-priority contextual actions from the top navigation area
- Providing compact entry points to search, close, edit, or secondary utility behaviors
- Maintaining consistent interaction affordance for header-level touch targets
- Combining with NavigationBarActionGroup when multiple related actions are required

#### Don't use for

- Do not use NavigationBarAction for primary content actions better placed in page body
- Do not place destructive or high-risk actions without clear affordance and confirmation pattern
- Do not rely on ambiguous controls that lack clear meaning in the current screen context
- Do not overload the navigation bar with many standalone actions instead of grouped prioritization

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| aria-checked | `boolean \| "true" \| "false"` | No | - |  |
| aria-controls | `string` | No | - |  |
| aria-current | `boolean \| "true" \| "false" \| "page" \| "step" \| "location" \| "date" \| "time"` | No | - |  |
| aria-describedby | `string` | No | - |  |
| aria-description | `string` | No | - |  |
| aria-disabled | `boolean` | No | - |  |
| aria-expanded | `boolean \| "true" \| "false"` | No | - |  |
| aria-haspopup | `boolean \| "true" \| "false" \| "menu" \| "dialog"` | No | - |  |
| aria-hidden | `boolean \| "true" \| "false"` | No | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| aria-live | `"polite" \| "off" \| "assertive"` | No | - |  |
| aria-selected | `boolean \| "true" \| "false"` | No | - |  |
| as | `"a"` | No | - |  |
| className | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - | "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" |
| disabled | `boolean` | No | - |  |
| formId | `string` | No | - |  |
| fullPageOnWebView | `boolean` | No | - |  |
| href | `string` | No | - |  |
| id | `string` | No | - |  |
| loadOnTop | `boolean` | No | - |  |
| maybe | `true` | No | - |  |
| newTab | `boolean` | No | - |  |
| onNavigate | `() => void \| Promise<void>` | No | - |  |
| onPress | `PressHandler` | No | - |  |
| replace | `boolean` | No | - |  |
| role | `string` | No | - | IMPORTANT: try to avoid using role="link" with onPress and first consider other alternatives like to/href + onNavigate |
| stopPropagation | `boolean` | No | - |  |
| style | `CSSProperties` | No | - |  |
| tabIndex | `number` | No | - |  |
| to | `string \| Location` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |
| type | `"submit"` | No | - |  |

## NavigationBarActionGroup

NavigationBarActionGroup arranges multiple navigation-bar actions into a compact, coherent right-side action cluster.

### Usage

#### Use for

- Grouping two or more related header actions with consistent spacing and visual rhythm
- Keeping right-side navigation bar actions organized when more than one control is needed
- Preserving clear scanability of utility actions in compact top-bar areas
- Supporting predictable action placement across screens that share similar header controls

#### Don't use for

- Do not group unrelated or conflicting actions that should be separated by context
- Do not add too many controls in one group, reducing tappability and clarity
- Do not use action groups as a substitute for overflow or menu patterns when action count grows
- Do not place low-priority actions in the primary header action cluster

## FunnelNavigationBar

FunnelNavigationBar is a simplified top bar for focused transactional flows, keeping only essential branding and contextual actions.

### Usage

#### Use for

- Guiding users through linear checkout, onboarding, or form funnels with minimal navigation distraction
- Keeping focus on task completion while preserving essential brand and utility actions
- Replacing broad section navigation when users should stay inside a constrained flow
- Maintaining consistent funnel framing across multi-step transactional journeys

#### Don't use for

- Do not use FunnelNavigationBar when users need access to full primary section navigation
- Do not add excessive secondary actions that compete with completion flow
- Do not use it as a generic app header outside funnel-style task contexts
- Do not combine it with parallel global menus that break focused journey intent

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| logo | `ReactNode` | No | - |  |
| right | `ReactNode` | No | - |  |
| topFixed | `boolean` | No | true |  |
| variant | `"default" \| "brand" \| "negative" \| "alternative" \| "media" \| "inverse"` | No | default |  |
| wide | `boolean \| WideConfig` | No | false |  |
| withBorder | `boolean` | No | true |  |

## NavigationBreadcrumbs

Breadcrumbs are a navigational element to help users to understand where they are in a website as well as content structure and hierarchy.

### Usage

#### Use for

- Applying the documented component pattern in product UI
- Keeping user experience coherent across screens and flows

#### Don't use for

- Don't use Breadcrumbs to show steps in a process.
- Do not replace a more suitable semantic component with this one
- Do not customize behavior in ways that conflict with Mística guidance

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| breadcrumbs | `readonly { readonly title: string; readonly url: string; onNavigate?: (() => void) \| undefined; }[]` | Yes | - |  |
| title | `string` | Yes | - |  |
| aria-label | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |

## Tabs

Use tabs to switch between related sections within the same context, with one active tab at a time.

### Usage

#### Use for

- Organizing peer sections of content that belong to the same page or task context
- Allowing quick switching between views while keeping the user in place
- Short tab labels (with optional icons) that remain scannable in horizontal navigation
- Accessible tab interfaces with clear tablist, tab, and tabpanel relationships and keyboard arrow navigation

#### Don't use for

- Do not use tabs for primary app/site navigation between unrelated destinations
- Do not use when users need to compare multiple sections side by side; tabs hide non-selected content
- Do not create too many tabs with long labels that cause poor discoverability and scrolling overhead
- Do not break tab-to-panel semantics when providing custom panel rendering

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| onChange | `(selectedIndex: number) => void` | Yes | - |  |
| selectedIndex | `number` | Yes | - |  |
| tabs | `readonly { readonly text: string; readonly trackingEvent?: TrackingEvent \| readonly TrackingEvent[] \| undefined; readonly Icon?: ((props: IconProps) => Element) \| undefined; readonly 'aria-contr...` | Yes | - |  |
| aria-describedby | `string` | No | - |  |
| aria-description | `string` | No | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| renderPanel | `(config: { selectedIndex: number; panelProps: { id: string; role: string; tabIndex: number; 'aria-labelledby': string; }; }) => ReactNode` | No | - |  |
| selectedTabRef | `null \| (instance: HTMLDivElement \| null) => void \| (() => VoidOrUndefinedOnly) \| RefObject<HTMLDivElement \| null>` | No | - |  |

## Stepper

Use stepper to show progress through a linear multi-step flow, highlighting completed and current steps.

### Usage

#### Use for

- Communicating where users are within a predefined sequence of steps
- Flows where step order matters and users benefit from seeing completed, current, and upcoming stages
- Processes that have clear, short labels for each step so progress remains understandable
- Interfaces that need accessible step status announcements (current/completed) for assistive technologies

#### Don't use for

- Do not use for non-linear navigation where users can jump freely between unrelated sections
- Do not use when there are too many steps or long labels that make progress hard to scan
- Do not use as the only guidance in complex flows; pair it with clear page titles and instructions
- Do not treat it as a clickable navigation menu if the interaction model is only progress indication

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| currentIndex | `number` | Yes | - |  |
| steps | `readonly string[]` | Yes | - |  |
| aria-describedby | `string` | No | - |  |
| aria-description | `string` | No | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |

## SkipLink

A skip link allows keyboard and screen reader users to bypass repeated blocks of content and jump directly to other content of the page.

### Usage

#### Use for

- Letting keyboard users skip repetitive header/navigation blocks and jump to main content quickly
- Providing fast access to key page landmarks such as content, filters, or footer regions
- Improving accessibility in layouts with repeated structural elements across pages
- Supporting assistive-technology workflows that depend on predictable in-page anchor targets

#### Don't use for

- Do not point SkipLink to missing or unstable target ids
- Do not use vague link text that does not clearly describe destination context
- Do not hide critical navigation only inside skip links; they complement, not replace, primary navigation
- Do not add skip links when there is no repeated block to bypass

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| targetId | `string` | Yes | - |  |
| aria-label | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |

## SkipLinkNav

SkipLinkNav groups multiple skip links inside a labeled navigation landmark for accessible quick-jump navigation.

### Usage

#### Use for

- Grouping multiple skip destinations in one dedicated accessibility navigation block
- Providing a clear labeled landmark for assistive technologies to discover skip options
- Organizing skip links consistently when pages contain several major content regions
- Maintaining coherent keyboard-first navigation patterns across complex layouts

#### Don't use for

- Do not use SkipLinkNav for regular site navigation menus
- Do not include redundant skip entries that point to the same destination
- Do not omit descriptive navigation labeling when multiple skip groups exist
- Do not overpopulate skip navigation with low-value destinations

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| aria-label | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
