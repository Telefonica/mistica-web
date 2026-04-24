# Navigation

## MainNavigationBar

MainNavigationBar provides primary product navigation with section switching, responsive desktop menus, and
mobile burger-menu behavior.

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

## NavigationBar

NavigationBar is the standard top app bar for page-level navigation, supporting back navigation, title, and
contextual right-side actions.

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

## NavigationBarActionGroup

NavigationBarActionGroup arranges multiple navigation-bar actions into a compact, coherent right-side action
cluster.

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

FunnelNavigationBar is a simplified top bar for focused transactional flows, keeping only essential branding
and contextual actions.

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

## Accessibility

### Heading hierarchy

Provide a clear, descriptive page title in `NavigationBar`.

- Keep heading hierarchy consistent in the screen content below it

### Accessibility label

Add explicit accessible labels to icon-only `NavigationBarAction` controls.

- Ensure purpose is clear without visual context (for example, search, close, help, cart)
- For back navigation, ensure the destination is predictable (for example, previous screen or parent section)
- Keep header actions short and high-priority

### Keyboard interaction

When a section opens additional menu content, ensure users can operate the full flow with keyboard only.

- Open, move through items, dismiss, and continue navigation
- In `MainNavigationBar`, use concise and distinct section titles so menu triggers are easy to differentiate

### Slot

If section content is customized, preserve the same accessibility quality as default menu content.

- Keep clear labels, logical focus order, and reachable interactive elements
- In `FunnelNavigationBar`, keep only essential actions for task completion
