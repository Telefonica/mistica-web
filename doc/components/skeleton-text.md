---
name: SkeletonText
description:
  'Skeleton text should be used where text elements like headings, paragraphs, or labels will be rendered.'
---

## Usage

### Use for

- Representing loading states for text-heavy content blocks with multiple lines
- Preserving expected text rhythm before headings, paragraphs, or descriptions are available
- Signaling asynchronous content loading in cards, detail views, and textual summaries
- Providing a more realistic text placeholder than isolated single-line skeletons

### Don't use for

- Do not use SkeletonText for media-first placeholders where rectangle or circle shapes are more accurate
- Do not leave skeleton text active after loading completes
- Do not use text skeletons when no textual content is expected in the final layout
- Do not overload screens with too many simultaneous skeleton blocks that harm readability
