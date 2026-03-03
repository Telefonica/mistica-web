Typologies:
- MediaCard
- HighlightedCard (deprecated → MediaCard size="default" mediaPosition="right")

---

## MediaCard

MediaCard combines media and content in one card surface, balancing visual storytelling with clear text
  hierarchy and actions.

### Use for

- Presenting content where image or video provides key context for the card message
- Building discovery and editorial card collections with consistent media-plus-text structure
- Combining optional top actions, slot content, and CTA buttons in a single modular card pattern
- Adapting composition by media position when visual emphasis should support, not overpower, text hierarchy

### Don't use for

- Do not use media-heavy cards for dense data-first scenarios better served by informational card patterns
- Do not overload each card with too many competing actions and secondary elements
- Do not rely on decorative media that weakens readability or action clarity
- Do not mix unrelated media positioning strategies in one card set without clear layout rationale

## HighlightedCard

HighlightedCard is a legacy highlighted media-card pattern; use the equivalent MediaCard layout in new
  designs.

### Use for

- Maintaining backward-compatible highlighted card layouts in existing screens
- Showing media-supported content where right-positioned visual context improves scanability
- Supporting migration scenarios where legacy highlighted cards are being progressively replaced
- Prefering the equivalent `MediaCard` composition for new product work

### Don't use for

- Do not create new UI patterns based on this deprecated variant
- Do not mix legacy highlighted cards and modern media card variants without intentional transition strategy
- Do not use highlighted treatment when content does not require visual emphasis
- Do not prioritize legacy convenience over consistent modern card-system usage
