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
- Do not use secondary buttons for destructive actions, use buttonDanger or buttonLinkDanger instead

## ButtonDanger

ButtonDanger is reserved for high-risk, destructive actions that require clear visual warning.

### Usage

#### Use for

- Triggering irreversible or risky operations such as delete, remove, or reset
- Making destructive intent explicit so users can distinguish it from neutral actions
- Pairing with confirmation patterns when accidental activation would have high impact

#### Don't use for

- Do not use buttonDanger for normal navigation or low-risk actions
- Do not place multiple danger actions together without clear separation and context
- Do not make destructive actions the default visual choice in routine flows

## ButtonLink

ButtonLink provides low-emphasis actions and lightweight navigation in button form.

### Usage

#### Use for

- Presenting tertiary actions that should remain visible with minimal visual weight
- Offering contextual navigation from inline sections or supporting action groups
- Use buttonLinks for low-friction actions that do not compete with primary controls

#### Don't use for

- Do not use link emphasis for the main call to action
- Do not mix too many link actions in the same area without clear prioritization
- Do not use it for destructive decisions where stronger warning semantics are required

## ButtonLinkDanger

ButtonLinkDanger is a low-emphasis destructive action used when risk exists but should not dominate the
interface.

### Usage

#### Use for

- Offering destructive options with lighter emphasis than a full danger button
- Placing secondary-risk actions in contextual areas where a subtle warning is enough
- Pairing with confirmation steps when the destructive outcome is not easily reversible

#### Don't use for

- Do not use it for primary destructive decisions that require maximum prominence
- Do not combine with non-destructive link actions without clear visual grouping
- Do not rely on color alone; provide surrounding context that explains the risk

## IconButton

IconButton exposes a compact icon-only action with accessible labeling, visual variants, and optional loading
feedback for async interactions.

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

#### Example

> **Important:** `Icon` receives the component reference (not a JSX element). Do not use children.

```tsx
<IconButton Icon={IconTrashCanRegular} aria-label="Delete" onPress={handleDelete} type="danger" />
```

## ToggleIconButton

ToggleIconButton switches between checked and unchecked icon states using the same compact visual language as
IconButton.

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

#### Example

```tsx
<ToggleIconButton
  checkedProps={{Icon: IconStarFilled, 'aria-label': 'Remove from favorites', type: 'brand'}}
  uncheckedProps={{Icon: IconStarRegular, 'aria-label': 'Add to favorites'}}
  checked={isFavorite}
  onChange={setIsFavorite}
/>
```

## ButtonGroup

ButtonGroup organizes primary, secondary, and optional link actions into a coherent action block with
responsive alignment.

### Usage

#### Use for

- Grouping related call-to-action buttons so decision hierarchy is clear at a glance
- Pairing primary and secondary actions with an optional supporting link action
- Building reusable action blocks where button presence can vary by context

#### Don't use for

- Do not include unrelated actions in the same group just to save space
- Do not flatten hierarchy by styling all actions with equal emphasis
- Do not force rendering when no actions are available; avoid empty action containers
- Do not overuse centered alignment if it reduces scanability in dense layouts
