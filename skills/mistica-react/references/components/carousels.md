# Carousels

## Carousel

Carousel presents related content in horizontal pages with optional bullets, arrows, and autoplay controls.

### Usage

#### Use for

- Browsing related cards or modules when horizontal exploration is the intended interaction
- Revealing progressive content with clear page feedback (bullets) and optional directional controls
- Supporting both manual navigation and optional autoplay for highlight-driven content
- Adapting visible items by breakpoint so collections stay readable across devices

#### Don't use for

- Do not place critical content only inside the carousel when users may never swipe to it
- Do not overload the carousel with too many pages, which weakens orientation and discovery
- Do not mix competing interaction patterns that make horizontal navigation unclear
- Do not force autoplay for content that requires careful reading or deliberate comparison

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| items | `readonly ReactNode[]` | Yes | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| autoplay | `boolean \| { time: number; loop?: boolean \| undefined; }` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| free | `boolean` | No | - | If true, scroll snap doesn't apply and the user has a free scroll |
| initialActiveItem | `number` | No | - |  |
| itemClassName | `string` | No | - |  |
| itemsPerPage | `number \| { mobile?: number \| undefined; tablet?: number \| undefined; desktop?: DesktopItemsPerPage \| undefined; }` | No | - |  |
| itemsToScroll | `number` | No | - | scrolls one page by default |
| itemStyle | `CSSProperties` | No | - |  |
| mobilePageOffset | `"regular" \| "large"` | No | - |  |
| onPageChange | `(newPageInfo: { pageIndex: number; shownItemIndexes: number[]; }) => void` | No | - |  |
| renderBullets | `(bulletsProps: PageBulletsProps) => ReactNode` | No | - | @deprecated use CarouselContextProvider and CarouselContextConsumer to provide bullets props to custom bullets component. See an example here: https://mistica-web.vercel.app/?path=/story/components-carousels-carousel--with-carousel-context |
| withBullets | `boolean` | No | - |  |
| withControls | `boolean` | No | true |  |

## CenteredCarousel

CenteredCarousel emphasizes one item at a time on mobile while preserving multi-item browsing on larger screens.

### Usage

#### Use for

- Highlighting one primary card per step in mobile contexts with adjacent items as context
- Creating storytelling or featured-content flows where focus should remain on the current item
- Combining focused mobile presentation with denser desktop distribution in the same component pattern
- Keeping horizontal progression clear when each item deserves individual attention

#### Don't use for

- Do not use it for dense, comparison-first grids where multiple items must be equally visible at once
- Do not overload each slide with heavy content that breaks quick horizontal scanning
- Do not hide mandatory actions exclusively inside non-initial slides
- Do not use centered emphasis when all items should carry the same immediate priority

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| items | `readonly ReactNode[]` | Yes | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| initialActiveItem | `number` | No | - |  |
| itemClassName | `string` | No | - |  |
| itemStyle | `CSSProperties` | No | - |  |
| onPageChange | `(newPageInfo: { pageIndex: number; shownItemIndexes: number[]; }) => void` | No | - |  |
| renderBullets | `(bulletsProps: PageBulletsProps) => ReactNode` | No | - | @deprecated use CarouselContextProvider and CarouselContextConsumer to provide bullets props to custom bullets component. See an example here: https://mistica-web.vercel.app/?path=/story/components-carousels-carousel--with-carousel-context |
| withBullets | `boolean` | No | - |  |
| withControls | `boolean` | No | true |  |

## Slideshow

Use slideshow for full-width, page-by-page sequences of visual content with optional bullets, controls, and autoplay.

### Usage

#### Use for

- Showing a small sequence of prominent slides (for example hero banners or featured stories) one page at a
  time
- Letting people move between pages with swipe/scroll gestures plus optional previous/next controls
- Providing orientation in the sequence with bullets, including inverse bullets on visual backgrounds when
  needed
- Running optional autoplay for passive browsing contexts where motion is secondary and can be paused

#### Don't use for

- Do not use for long or dense collections where users need fast scanning; use list/grid or carousel patterns
  instead
- Do not force autoplay in primary task flows or when users need to read/interact with slide content
- Do not depend on autoplay alone to communicate critical information; each slide must remain understandable
  when viewed manually
- Do not hide navigation affordances when there are multiple slides; provide bullets and/or controls so
  position and movement are clear

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| items | `readonly ReactNode[]` | Yes | - |  |
| autoplay | `boolean \| { time: number; loop?: boolean \| undefined; }` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| initialPageIndex | `number` | No | 0 |  |
| inverseBullets | `boolean` | No | true |  |
| onPageChange | `(newPageIndex: number) => void` | No | - |  |
| withBullets | `boolean` | No | - |  |
| withControls | `boolean` | No | true |  |

## PageBullets

PageBullets indicates carousel pagination state, helping users understand position and progress across pages.

### Usage

#### Use for

- Showing current page position in carousels and slideshows with multiple pages
- Reinforcing orientation when users swipe through visual or editorial content
- Supporting compact pagination feedback when full page controls are not always visible
- Keeping page-state communication consistent across breakpoints and item-per-page changes

#### Don't use for

- Do not use PageBullets as the only navigation mechanism when explicit previous/next controls are required
- Do not display bullets for single-page carousels with no real pagination state
- Do not combine conflicting pagination metaphors in the same carousel surface
- Do not treat bullets as decorative dots without meaningful current-page feedback

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| currentIndex | `number` | Yes | - |  |
| numPages | `number \| { mobile: number; tablet?: number \| undefined; desktop: number; }` | Yes | - |  |

## CarouselAutoplayControl

CarouselAutoplayControl toggles carousel autoplay state, including pause/play and restart behavior when the last page is reached.

### Usage

#### Use for

- Giving users explicit control over autoplay behavior in moving carousels
- Supporting pause/play expectations for accessibility and reading comfort
- Providing replay intent when autoplay reaches the final page
- Integrating autoplay control in carousel headers or control groups with consistent icon behavior

#### Don't use for

- Do not enable autoplay controls when carousel autoplay is not part of the experience
- Do not force autoplay in content where users need full manual reading pace
- Do not hide autoplay state changes; users should clearly understand whether motion is active
- Do not use autoplay control as a substitute for clear manual pagination controls

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| isAtLastPage | `boolean` | Yes | - |  |
| isAutoplayEnabled | `boolean` | Yes | - |  |
| onAutoplayChanged | `(autoplay: boolean) => void` | Yes | - |  |
| bleedLeft | `boolean` | No | false |  |
| bleedRight | `boolean` | No | false |  |

## CarouselContextConsumer

CarouselContextConsumer reads shared carousel actions and state to render custom controls aligned with active carousel behavior.

### Usage

#### Use for

- Building custom bullets, arrows, or autoplay controls that react to real carousel state
- Accessing carousel navigation callbacks without prop-drilling through multiple layers
- Keeping custom control components visually flexible while preserving behavior consistency
- Integrating carousel state into bespoke layouts that still follow carousel interaction rules

#### Don't use for

- Do not use CarouselContextConsumer outside CarouselContextProvider
- Do not cache context values as static assumptions when carousel state is dynamic
- Do not use consumer-only patterns when default built-in controls already cover requirements
- Do not mix unrelated non-carousel concerns into carousel context-driven components

## CarouselContextProvider

CarouselContextProvider shares carousel navigation and state props so custom controls stay synchronized with carousel behavior.

### Usage

#### Use for

- Coordinating custom carousel controls with internal carousel state from a single source
- Exposing navigation actions (`goPrev`, `goNext`, `goToPage`) to external control compositions
- Keeping bullets, page controls, and autoplay controls synchronized across custom layouts
- Building advanced carousel UIs without duplicating internal carousel state logic

#### Don't use for

- Do not build custom carousel controls outside provider scope when synchronized behavior is required
- Do not mix multiple providers around the same control set without clear separation
- Do not use provider patterns when default carousel controls already satisfy the experience
- Do not bypass context and recreate competing autoplay/navigation state manually

## CarouselPageControls

CarouselPageControls provides previous/next arrow navigation for carousels, with contextual enable/disable behavior and page-aware labeling.

### Usage

#### Use for

- Enabling explicit previous/next navigation in carousels where swipe alone is not enough
- Providing stronger navigation affordance for desktop and accessibility-focused interactions
- Supporting page-aware movement where control availability reflects current position
- Complementing bullets with direct directional controls in multi-page content sets

#### Don't use for

- Do not show page controls when there is only one reachable page
- Do not keep arrows visually enabled when movement is not possible
- Do not overload small mobile layouts with controls that obscure core carousel content
- Do not use page controls as a substitute for clear content hierarchy inside each slide

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| goNext | `() => void` | Yes | - |  |
| goPrev | `() => void` | Yes | - |  |
| nextArrowEnabled | `boolean` | Yes | - |  |
| prevArrowEnabled | `boolean` | Yes | - |  |
| setShouldAutoplay | `(autoplay: boolean) => void` | Yes | - |  |
| bleedLeft | `boolean` | No | false |  |
| bleedRight | `boolean` | No | false |  |
| currentPageIndex | `number` | No | - |  |
| pagesCount | `number` | No | - |  |

## useCarouselContext

useCarouselContext provides reusable behavior to keep component logic consistent across the product.

### Usage

#### Use for

- Sharing common state and behavior across multiple components
- Keeping implementation aligned with Mística patterns

#### Don't use for

- Do not duplicate equivalent logic when this utility already exists
- Do not use it without understanding its side effects and scope
