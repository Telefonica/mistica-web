
# Mosaic

## HorizontalMosaic

HorizontalMosaic groups content into swipeable mosaic pages with alternating layouts to keep discovery flows visually dynamic.

### Usage

#### Use for

- Building swipeable discovery sections where users browse grouped cards horizontally
- Highlighting mixed-priority items with alternating horizontal and square compositions per page
- Showing curated content sets where carousel bullets/controls help navigation between groups
- Rendering adaptable items that respond well to `horizontal` and `square` grid modes

#### Don't use for

- Do not use HorizontalMosaic when users need to compare many items at once without pagination
- Do not use it for dense textual content that requires strict reading continuity
- Do not include item designs that break when aspect ratio changes between mosaic slots
- Do not use it when a static, list-semantic composition is more appropriate; use VerticalMosaic instead

## VerticalMosaic

VerticalMosaic arranges content in static mosaic blocks with list semantics, combining vertical and square slots for scannable editorial layouts.

### Usage

#### Use for

- Building non-carousel mosaics where users scan groups of up to four related items
- Preserving semantic list behavior for assistive technologies in content collections
- Emphasizing one featured item while supporting it with secondary square items
- Creating stable, page-level compositions where all visible items are available at once

#### Don't use for

- Do not use VerticalMosaic when horizontal swipe navigation is expected; use HorizontalMosaic instead
- Do not force uniform card ratios if your design requires equal tiles in every slot
- Do not overload each item with long copy that breaks compact mosaic readability
- Do not rely on custom manual placement patterns outside the supported 1–4 item structures per block
