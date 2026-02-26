---
name: SkeletonCircle
description:
  'It is a more atomic type of skeleton to create compositions that do not fit with the rest of the skeleton
  types.'
---

## Usage

### Use for

- Representing circular loading placeholders such as avatars, profile images, or round icons
- Composing custom skeleton layouts that require circular visual anchors
- Preserving expected media footprint in list rows and identity-driven components
- Pairing with line/text skeletons to build richer loading compositions

### Don't use for

- Do not use SkeletonCircle for rectangular media slots; use SkeletonRectangle instead
- Do not use circular placeholders when final content is not round-shaped
- Do not keep circular skeletons visible after actual media is ready
- Do not combine circle sizes inconsistently in the same loading pattern without hierarchy rationale
