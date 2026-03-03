## Video

Use video for embedded media playback with responsive sizing, poster/error fallbacks, and controllable
  autoplay/loading behavior.

### Use for

- Showing inline video content in cards, pages, or media sections with fixed dimensions or aspect ratio
- Providing a poster image so layout remains stable while media loads or when playback is stopped
- Delivering multiple video sources/formats for broader playback compatibility
- Scenarios that need controlled playback behavior (manual, when-loaded autoplay, or streaming autoplay)
- Experiences where custom play/pause/stop/load handling is orchestrated from parent logic

### Don't use for

- Do not rely on autoplay as the only way users can consume important information
- Do not omit fallback strategy (poster/error handling) when video availability is uncertain
- Do not use heavy video assets in contexts where lightweight images communicate the same message
- Do not choose inconsistent aspect ratios across related media blocks if visual rhythm matters
- Do not treat this as background decoration only when no meaningful media interaction/value is provided

## VideoElement

VideoElement is a Mística component used to build consistent and accessible product interfaces.

### Use for

- Applying the documented component pattern in product UI
- Keeping user experience coherent across screens and flows

### Don't use for

- Do not replace a more suitable semantic component with this one
- Do not customize behavior in ways that conflict with Mística guidance
