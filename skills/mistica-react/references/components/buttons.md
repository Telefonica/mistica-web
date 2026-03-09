# Buttons

## ButtonPrimary

ButtonPrimary represents the main action users should take in a given view or step.

### Usage

#### Use for

- Highlighting the most important action in a screen or flow step
- Driving forward progression in tasks where a clear next action is needed
- Giving visual priority to the single action with highest business or user value

#### Don't use for

- Do not place multiple primary buttons in the same decision area
- Do not use primary styling for secondary or cancel actions
- Do not combine with competing emphasis patterns that weaken action hierarchy

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| aria-controls | `string` | No | - |  |
| aria-current | `boolean \| "true" \| "false" \| "page" \| "step" \| "location" \| "date" \| "time"` | No | - |  |
| aria-describedby | `string` | No | - |  |
| aria-description | `string` | No | - |  |
| aria-expanded | `boolean \| "true" \| "false"` | No | - |  |
| aria-haspopup | `boolean \| "true" \| "false" \| "menu" \| "dialog"` | No | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| className | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - | "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" |
| disabled | `boolean` | No | - |  |
| EndIcon | `(props: IconProps) => Element` | No | - |  |
| fake | `true` | No | - |  |
| fullPageOnWebView | `boolean` | No | - |  |
| href | `string` | No | - |  |
| loadingText | `string` | No | - |  |
| loadOnTop | `boolean` | No | - |  |
| newTab | `boolean` | No | - |  |
| onNavigate | `() => void \| Promise<void>` | No | - |  |
| onPress | `(event: MouseEvent<HTMLElement, MouseEvent>) => void \| Promise<void> \| undefined` | No | - |  |
| role | `string` | No | - | IMPORTANT: try to avoid using role="link" with onPress and first consider other alternatives like to/href + onNavigate |
| showSpinner | `boolean` | No | - |  |
| small | `boolean` | No | - |  |
| StartIcon | `(props: IconProps) => Element` | No | - |  |
| style | `CSSProperties` | No | - |  |
| submit | `true` | No | - |  |
| tabIndex | `number` | No | - |  |
| to | `string \| Location` | No | - |  |
| trackEvent | `boolean` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |

## ButtonSecondary

ButtonSecondary represents a complementary action with less visual priority than the primary action.

### Usage

#### Use for

- Offering alternative or supporting actions next to a primary button
- Handling neutral decisions such as back, cancel, edit, or optional paths
- Providing actions that should remain visible but not dominate the screen hierarchy

#### Don't use for

- Do not use secondary styling for the main conversion or progression action
- Do not present too many secondary actions in one group, which can dilute clarity
- Do not style destructive actions as secondary when risk needs explicit emphasis

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| aria-controls | `string` | No | - |  |
| aria-current | `boolean \| "true" \| "false" \| "page" \| "step" \| "location" \| "date" \| "time"` | No | - |  |
| aria-describedby | `string` | No | - |  |
| aria-description | `string` | No | - |  |
| aria-expanded | `boolean \| "true" \| "false"` | No | - |  |
| aria-haspopup | `boolean \| "true" \| "false" \| "menu" \| "dialog"` | No | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| className | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - | "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" |
| disabled | `boolean` | No | - |  |
| EndIcon | `(props: IconProps) => Element` | No | - |  |
| fake | `true` | No | - |  |
| fullPageOnWebView | `boolean` | No | - |  |
| href | `string` | No | - |  |
| loadingText | `string` | No | - |  |
| loadOnTop | `boolean` | No | - |  |
| newTab | `boolean` | No | - |  |
| onNavigate | `() => void \| Promise<void>` | No | - |  |
| onPress | `(event: MouseEvent<HTMLElement, MouseEvent>) => void \| Promise<void> \| undefined` | No | - |  |
| role | `string` | No | - | IMPORTANT: try to avoid using role="link" with onPress and first consider other alternatives like to/href + onNavigate |
| showSpinner | `boolean` | No | - |  |
| small | `boolean` | No | - |  |
| StartIcon | `(props: IconProps) => Element` | No | - |  |
| style | `CSSProperties` | No | - |  |
| submit | `true` | No | - |  |
| tabIndex | `number` | No | - |  |
| to | `string \| Location` | No | - |  |
| trackEvent | `boolean` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |

## ButtonDanger

ButtonDanger is reserved for high-risk, destructive actions that require clear visual warning.

### Usage

#### Use for

- Triggering irreversible or risky operations such as delete, remove, or reset
- Making destructive intent explicit so users can distinguish it from neutral actions
- Pairing with confirmation patterns when accidental activation would have high impact

#### Don't use for

- Do not use danger styling for normal navigation or low-risk actions
- Do not place multiple danger actions together without clear separation and context
- Do not make destructive actions the default visual choice in routine flows

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| aria-controls | `string` | No | - |  |
| aria-current | `boolean \| "true" \| "false" \| "page" \| "step" \| "location" \| "date" \| "time"` | No | - |  |
| aria-describedby | `string` | No | - |  |
| aria-description | `string` | No | - |  |
| aria-expanded | `boolean \| "true" \| "false"` | No | - |  |
| aria-haspopup | `boolean \| "true" \| "false" \| "menu" \| "dialog"` | No | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| className | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - | "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" |
| disabled | `boolean` | No | - |  |
| EndIcon | `(props: IconProps) => Element` | No | - |  |
| fake | `true` | No | - |  |
| fullPageOnWebView | `boolean` | No | - |  |
| href | `string` | No | - |  |
| loadingText | `string` | No | - |  |
| loadOnTop | `boolean` | No | - |  |
| newTab | `boolean` | No | - |  |
| onNavigate | `() => void \| Promise<void>` | No | - |  |
| onPress | `(event: MouseEvent<HTMLElement, MouseEvent>) => void \| Promise<void> \| undefined` | No | - |  |
| role | `string` | No | - | IMPORTANT: try to avoid using role="link" with onPress and first consider other alternatives like to/href + onNavigate |
| showSpinner | `boolean` | No | - |  |
| small | `boolean` | No | - |  |
| StartIcon | `(props: IconProps) => Element` | No | - |  |
| style | `CSSProperties` | No | - |  |
| submit | `true` | No | - |  |
| tabIndex | `number` | No | - |  |
| to | `string \| Location` | No | - |  |
| trackEvent | `boolean` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |

## ButtonLink

ButtonLink provides low-emphasis actions and lightweight navigation in button form.

### Usage

#### Use for

- Presenting tertiary actions that should remain visible with minimal visual weight
- Offering contextual navigation from inline sections or supporting action groups
- Using link-style buttons for low-friction actions that do not compete with primary controls

#### Don't use for

- Do not use link emphasis for the main call to action
- Do not mix too many link actions in the same area without clear prioritization
- Do not use it for destructive decisions where stronger warning semantics are required

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| aria-controls | `string` | No | - |  |
| aria-current | `boolean \| "true" \| "false" \| "page" \| "step" \| "location" \| "date" \| "time"` | No | - |  |
| aria-describedby | `string` | No | - |  |
| aria-description | `string` | No | - |  |
| aria-expanded | `boolean \| "true" \| "false"` | No | - |  |
| aria-haspopup | `boolean \| "true" \| "false" \| "menu" \| "dialog"` | No | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| bleedLeft | `boolean` | No | - |  |
| bleedRight | `boolean` | No | - |  |
| bleedY | `boolean` | No | - |  |
| className | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - | "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" |
| disabled | `boolean` | No | - |  |
| EndIcon | `(props: IconProps) => Element` | No | - |  |
| fake | `true` | No | - |  |
| fullPageOnWebView | `boolean` | No | - |  |
| href | `string` | No | - |  |
| loadingText | `string` | No | - |  |
| loadOnTop | `boolean` | No | - |  |
| newTab | `boolean` | No | - |  |
| onNavigate | `() => void \| Promise<void>` | No | - |  |
| onPress | `(event: MouseEvent<HTMLElement, MouseEvent>) => void \| Promise<void> \| undefined` | No | - |  |
| role | `string` | No | - | IMPORTANT: try to avoid using role="link" with onPress and first consider other alternatives like to/href + onNavigate |
| showSpinner | `boolean` | No | - |  |
| small | `boolean` | No | - |  |
| StartIcon | `(props: IconProps) => Element` | No | - |  |
| style | `CSSProperties` | No | - |  |
| tabIndex | `number` | No | - |  |
| to | `string \| Location` | No | - |  |
| trackEvent | `boolean` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |
| withChevron | `boolean` | No | - |  |

## ButtonLinkDanger

ButtonLinkDanger is a low-emphasis destructive action used when risk exists but should not dominate the interface.

### Usage

#### Use for

- Offering destructive options with lighter emphasis than a full danger button
- Placing secondary-risk actions in contextual areas where a subtle warning is enough
- Pairing with confirmation steps when the destructive outcome is not easily reversible

#### Don't use for

- Do not use it for primary destructive decisions that require maximum prominence
- Do not combine with non-destructive link actions without clear visual grouping
- Do not rely on color alone; provide surrounding context that explains the risk

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| aria-controls | `string` | No | - |  |
| aria-current | `boolean \| "true" \| "false" \| "page" \| "step" \| "location" \| "date" \| "time"` | No | - |  |
| aria-describedby | `string` | No | - |  |
| aria-description | `string` | No | - |  |
| aria-expanded | `boolean \| "true" \| "false"` | No | - |  |
| aria-haspopup | `boolean \| "true" \| "false" \| "menu" \| "dialog"` | No | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| bleedLeft | `boolean` | No | - |  |
| bleedRight | `boolean` | No | - |  |
| bleedY | `boolean` | No | - |  |
| className | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - | "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" |
| disabled | `boolean` | No | - |  |
| EndIcon | `(props: IconProps) => Element` | No | - |  |
| fake | `true` | No | - |  |
| fullPageOnWebView | `boolean` | No | - |  |
| href | `string` | No | - |  |
| loadingText | `string` | No | - |  |
| loadOnTop | `boolean` | No | - |  |
| newTab | `boolean` | No | - |  |
| onNavigate | `() => void \| Promise<void>` | No | - |  |
| onPress | `(event: MouseEvent<HTMLElement, MouseEvent>) => void \| Promise<void> \| undefined` | No | - |  |
| role | `string` | No | - | IMPORTANT: try to avoid using role="link" with onPress and first consider other alternatives like to/href + onNavigate |
| showSpinner | `boolean` | No | - |  |
| small | `boolean` | No | - |  |
| StartIcon | `(props: IconProps) => Element` | No | - |  |
| style | `CSSProperties` | No | - |  |
| tabIndex | `number` | No | - |  |
| to | `string \| Location` | No | - |  |
| trackEvent | `boolean` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |

## IconButton

IconButton exposes a compact icon-only action with accessible labeling, visual variants, and optional loading feedback for async interactions.

### Usage

#### Use for

- Triggering frequent, low-text actions where space is constrained and icon meaning is familiar
- Supporting toolbars and dense layouts where compact touch targets are needed
- Providing immediate async feedback with spinner state during long-running button actions
- Applying visual emphasis (`neutral`, `brand`, `danger`) that matches action intent

#### Don't use for

- Do not use ambiguous or uncommon icons for destructive or high-risk actions
- Do not omit accessible naming (`aria-label` or `aria-labelledby`) for icon-only controls
- Do not place too many icon buttons together without clear hierarchy and grouping
- Do not use IconButton when visible text is needed to remove action ambiguity

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| Icon | `(props: IconProps) => Element` | Yes | - |  |
| aria-current | `boolean \| "false" \| "true" \| "page" \| "step" \| "location" \| "date" \| "time"` | No | - |  |
| aria-describedby | `string` | No | - |  |
| aria-description | `string` | No | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| backgroundType | `"transparent" \| "solid" \| "soft"` | No | transparent |  |
| bleedLeft | `boolean` | No | - |  |
| bleedRight | `boolean` | No | - |  |
| bleedY | `boolean` | No | - |  |
| dataAttributes | `DataAttributes` | No | - | "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" |
| disabled | `boolean` | No | - |  |
| fullPageOnWebView | `boolean` | No | - |  |
| href | `string` | No | - |  |
| loadOnTop | `boolean` | No | - |  |
| newTab | `boolean` | No | - |  |
| onNavigate | `() => void \| Promise<void>` | No | - |  |
| onPress | `PressHandler` | No | - |  |
| replace | `boolean` | No | - |  |
| role | `string` | No | - | IMPORTANT: try to avoid using role="link" with onPress and first consider other alternatives like to/href + onNavigate |
| showSpinner | `boolean` | No | - |  |
| small | `boolean` | No | - |  |
| to | `string \| Location` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |
| type | `"neutral" \| "brand" \| "danger"` | No | neutral |  |

## ToggleIconButton

ToggleIconButton switches between checked and unchecked icon states using the same compact visual language as IconButton.

### Usage

#### Use for

- Toggling a binary preference or status where both states can be represented with clear icons
- Keeping compact two-state actions consistent with IconButton sizing and visual variants
- Showing distinct accessible labels and assets for checked and unchecked states
- Supporting asynchronous state changes where visual feedback should remain stable until completion

#### Don't use for

- Do not use ToggleIconButton for multi-step or multi-option choices beyond two states
- Do not use the same icon/label for checked and unchecked states when meaning changes
- Do not omit accessible naming for each state; state intent must be understandable to assistive tech
- Do not use toggle interactions when the action is not reversible or does not represent a true on/off state

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| checkedProps | `{ Icon: (props: IconProps) => Element; type?: IconButtonType \| undefined; backgroundType?: IconButtonBackgroundType \| undefined; } & { ...; }` | Yes | - |  |
| uncheckedProps | `{ Icon: (props: IconProps) => Element; type?: IconButtonType \| undefined; backgroundType?: IconButtonBackgroundType \| undefined; } & { ...; }` | Yes | - |  |
| bleedLeft | `boolean` | No | - |  |
| bleedRight | `boolean` | No | - |  |
| bleedY | `boolean` | No | - |  |
| checked | `boolean` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| defaultChecked | `boolean` | No | - |  |
| disabled | `boolean` | No | - |  |
| onChange | `(checked: boolean) => void \| Promise<void> \| undefined` | No | - |  |
| role | `string` | No | - |  |
| showSpinner | `boolean` | No | - |  |
| small | `boolean` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |

## ButtonGroup

ButtonGroup organizes primary, secondary, and optional link actions into a coherent action block with responsive alignment.

### Usage

#### Use for

- Grouping related call-to-action buttons so decision hierarchy is clear at a glance
- Pairing primary and secondary actions with an optional supporting link action
- Keeping action sets visually consistent across breakpoints using left or centered alignment
- Building reusable action blocks where button presence can vary by context

#### Don't use for

- Do not include unrelated actions in the same group just to save space
- Do not flatten hierarchy by styling all actions with equal emphasis
- Do not force rendering when no actions are available; avoid empty action containers
- Do not overuse centered alignment if it reduces scanability in dense layouts

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| align | `"center" \| "left" \| { mobile: "center" \| "left"; tablet?: "center" \| undefined; desktop: "center" \| "left"; }` | No | left |  |
| dataAttributes | `DataAttributes` | No | - |  |
| link | `RendersNullableElement<ButtonLink>` | No | - |  |
| primaryButton | `RendersNullableElement<Button>` | No | - |  |
| secondaryButton | `RendersNullableElement<Button>` | No | - |  |
