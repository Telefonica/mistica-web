# Breadcrumbs

Breadcrumbs are a navigational element to help users to understand where they are in a website as well as
content structure and hierarchy.

## Usage

### Use for

- Applying the documented component pattern in product UI
- Keeping user experience coherent across screens and flows

### Don't use for

- Don't use Breadcrumbs to show steps in a process.
- Do not replace a more suitable semantic component with this one
- Do not customize behavior in ways that conflict with Mística guidance

## Accessibility

### Accessibility label

You can add an accessibility label to Breadcrumbs to describe the navigation type via `aria-label`. By
default, the component uses `"Breadcrumb"`.

If your product language is not English, provide a localized `aria-label` explicitly.

### Current page semantics

Breadcrumbs expose the current location as the last item with `aria-current="page"`. Provide the current page
title through `title`, and include only previous navigable levels in `breadcrumbs`.
