---
name: SkeletonRectangle
description:
  'SkeletonRectangle provides a block-shaped loading placeholder for media and container surfaces of varying
  sizes.'
---

## Usage

### Use for

- Representing pending image, video, banner, or card-surface content with rectangular geometry
- Reserving stable layout space while large visual assets load
- Supporting full-size loading placeholders in media-first cards and sections
- Matching container-level loading states where line or circular skeletons are insufficient

### Don't use for

- Do not use SkeletonRectangle for round media placeholders; use SkeletonCircle instead
- Do not keep rectangular skeletons after real media/content is available
- Do not use oversized placeholder blocks that distort expected final layout proportions
- Do not present skeleton rectangles without nearby context when users need clearer loading meaning
