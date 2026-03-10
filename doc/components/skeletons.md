
# Skeletons

## SkeletonCircle

It is a more atomic type of skeleton to create compositions that do not fit with the rest of the skeleton types.

### Usage

#### Use for

- Representing circular loading placeholders such as avatars, profile images, or round icons
- Composing custom skeleton layouts that require circular visual anchors
- Preserving expected media footprint in list rows and identity-driven components
- Pairing with line/text skeletons to build richer loading compositions

#### Don't use for

- Do not use SkeletonCircle for rectangular media slots; use SkeletonRectangle instead
- Do not use circular placeholders when final content is not round-shaped
- Do not keep circular skeletons visible after actual media is ready
- Do not combine circle sizes inconsistently in the same loading pattern without hierarchy rationale

## SkeletonLine

SkeletonLine displays a single loading placeholder bar for short linear content blocks.

### Usage

#### Use for

- Representing one pending text line, label, or compact metadata element
- Preserving horizontal rhythm while content is loading asynchronously
- Matching simple one-line placeholders in tight list or form contexts
- Building custom skeleton compositions where a single line unit is needed

#### Don't use for

- Do not use SkeletonLine to represent multi-paragraph text blocks; use SkeletonText instead
- Do not keep line skeletons visible after content is already available
- Do not use a single line placeholder when structural loading context is unclear
- Do not mix inconsistent line widths randomly without content hierarchy intent

## SkeletonRectangle

SkeletonRectangle provides a block-shaped loading placeholder for media and container surfaces of varying sizes.

### Usage

#### Use for

- Representing pending image, video, banner, or card-surface content with rectangular geometry
- Reserving stable layout space while large visual assets load
- Supporting full-size loading placeholders in media-first cards and sections
- Matching container-level loading states where line or circular skeletons are insufficient

#### Don't use for

- Do not use SkeletonRectangle for round media placeholders; use SkeletonCircle instead
- Do not keep rectangular skeletons after real media/content is available
- Do not use oversized placeholder blocks that distort expected final layout proportions
- Do not present skeleton rectangles without nearby context when users need clearer loading meaning

## SkeletonRow

Skeleton row can be used to represent components like lists (also in its boxed variant).

### Usage

#### Use for

- Representing list-row loading states that combine avatar/media and one-line text content
- Preserving row-level structure in feeds, option lists, or summary rows while loading
- Providing realistic row placeholders for patterns that mirror list-item anatomy
- Maintaining perceived progress in list-heavy screens where content arrives incrementally

#### Don't use for

- Do not use SkeletonRow for complex card layouts with multiple text blocks and actions
- Do not use row skeletons when final UI is not row-based
- Do not keep row placeholders visible after row data is rendered
- Do not stack excessive row skeletons when a smaller preview set can communicate loading state

## SkeletonText

Skeleton text should be used where text elements like headings, paragraphs, or labels will be rendered.

### Usage

#### Use for

- Representing loading states for text-heavy content blocks with multiple lines
- Preserving expected text rhythm before headings, paragraphs, or descriptions are available
- Signaling asynchronous content loading in cards, detail views, and textual summaries
- Providing a more realistic text placeholder than isolated single-line skeletons

#### Don't use for

- Do not use SkeletonText for media-first placeholders where rectangle or circle shapes are more accurate
- Do not leave skeleton text active after loading completes
- Do not use text skeletons when no textual content is expected in the final layout
- Do not overload screens with too many simultaneous skeleton blocks that harm readability
