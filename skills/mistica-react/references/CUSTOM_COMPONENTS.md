# Custom Components

These are product-specific components that are not part of the core Mistica design system but are useful to
cover product requirements that are too specific for the shared library.

Guiding principles

- Build on Mistica primitives: compose existing Mistica components (Box, Text, Button, Card, Row, Grid, etc.)
  rather than reimplementing visual primitives.
- Respect tokens and spacing: use Mistica design tokens (colors, typography, radii, spacing) so custom
  components remain consistent with the core system and respond to theming.
- Reuse primitives and utilities: accessibility helpers, trackingEvent props, layout primitives and any
  `dataAttributes` patterns should be preserved.
- Keep API minimal: surface only the props product teams need. Accept `className` / `style` / `dataAttributes`
  and a `ref` when relevant.
- Make accessibility explicit: label, role, keyboard interaction, and focus behavior must be documented and
  implemented.

When to create a custom component

**IMPORTANT**: Before creating a custom component, you MUST explicitly ask the user for confirmation. Explain
why an existing Mistica component cannot satisfy the requirement and wait for the user's approval before
proceeding with implementation.

- The UI requirement cannot be satisfied by composition of existing Mistica components without repeated
  boilerplate.
- The visual or interaction model is product-specific (e.g., a unique promotional carousel with business
  rules).
- There is a clear reuse surface across multiple screens or flows in the product.

API design recommendations

- Keep props focused: content, options, and callbacks.
- Prefer `children` for content composition; provide named slots (e.g., `primaryAction`, `secondaryAction`)
  when helpful.
- Support `dataAttributes` and `trackingEvent` when the component triggers analytics.
- Accept `style` and `className` only for last-resort visual overrides; prefer token-driven variants.

Examples (continued)

1. Product color chip

Props: `label: string`, `variant?: 'default'|'success'|'warning'`, `icon?: ReactNode`, `dataAttributes?`

Usage example (TypeScript / TSX):

```tsx
// Custom color chip — uses Mistica tokens and primitives
import React from 'react';
import {Inline, Circle, Text2, skinVars} from '@telefonica/mistica';

type ColorChipProps = {
  color?: string;
  label?: string;
  active?: boolean;
};

export const ColorChip: React.FC<ColorChipProps> = ({color = 'red', label = 'Red', active = false}) => (
  <div
    style={{
      minHeight: 40,
      padding: '0 12px',
      border: `1px solid ${active ? skinVars.colors.controlActivated : skinVars.colors.control}`,
      borderRadius: skinVars.borderRadii.chip,
      display: 'flex',
      alignItems: 'center',
      background: active ? skinVars.colors.brandLow : undefined,
    }}
  >
    <Inline space={4} alignItems="center">
      <Circle size={16} backgroundColor={color} />
      <Text2>{label}</Text2>
    </Inline>
  </div>
);
```

This is a custom chip to select color. When the chip is active pass `active={true}`: the border uses the
`controlActivated` token and the chip background uses the `brandLow` token so selection is token-driven and
theme-aware.

2. FooterPreview — footer block with configurable columns, logo and footer text

Props: `items: { title?: string; links: { label: string; href: string }[] }[]`, `logo?: React.ReactNode`,
`right?: React.ReactNode`, `footerText?: string`

Usage example (TypeScript / TSX):

```tsx
import React from 'react';
import {Box, Stack, Divider, Inline, TextLink, Text2, skinVars} from '@telefonica/mistica';

type FooterLink = {label: string; href: string};

type FooterColumn = {title?: string; links: FooterLink[]};

type FooterPreviewProps = {
  items: FooterColumn[]; // array of columns; each column has optional title and items
  logo?: React.ReactNode; // optional logo or branding node
  right?: React.ReactNode; // slot for extra content (small forms, social icons)
  footerText?: string; // configurable bottom text
};

export const FooterPreview: React.FC<FooterPreviewProps> = ({items, logo, right, footerText}) => {
  return (
    <Box as="footer" padding={16} role="contentinfo">
      <Stack space={16}>
        <Divider />
        <Inline fullWidth space="between">
          <nav aria-label="Footer navigation" style={{flex: 1}}>
            <Inline space={24}>
              {items.map((col, idx) => (
                <Stack space={8} key={idx}>
                  {col.title && <Text2 weight="medium">{col.title}</Text2>}
                  <Stack space={8}>
                    {col.links.map((link) => (
                      <TextLink key={link.label} href={link.href}>
                        {link.label}
                      </TextLink>
                    ))}
                  </Stack>
                </Stack>
              ))}
            </Inline>
          </nav>

          {right}
        </Inline>
        <Divider />

        <Inline space="between" alignItems="center">
          {logo && <div style={{marginRight: 8}}>{logo}</div>}
          <Text2 weight="regular" color={skinVars.colors.textSecondary}>
            {footerText}
          </Text2>
        </Inline>
      </Stack>
    </Box>
  );
};
```

Notes: `FooterPreview` now accepts `items`, an array where each entry represents a column and includes an
optional `title` and an `links` array. This makes column structure explicit and gives each column a header.
`logo` and `footerText` are configurable; `right` remains a slot for additional content. Use `aria-label` on
the nav and prefer `TextLink` for accessible links.

Testing and QA

- Accessibility: test with keyboard navigation and screen reader labels; include role and aria attributes in
  examples.
- Performance: avoid heavy layout reflows; lazy-load images in cards when possible.

Accessibility checklist (quick)

- Provide text alternatives for images (`alt`/`imageAlt`).
- Ensure focus order is logical when the component contains interactive elements.
- Buttons and links must have discernible text.
- Use `aria-*` attributes where native semantics are insufficient.
