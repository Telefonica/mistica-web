# Menu

## Menu

Menu displays contextual actions from a trigger, with adaptive positioning, keyboard navigation, and dismiss
behavior through overlay interaction.

### Usage

#### Use for

- Presenting grouped actions or navigation options in a compact contextual surface
- Organizing options into sections when users need quick scanning and clear grouping
- Keeping interaction patterns coherent in overflow and contextual action scenarios
- Supporting accessible keyboard interaction for action discovery and activation

#### Don't use for

- Do not use Menu as primary page navigation for always-visible destinations
- Do not overload menus with long, dense content that reduces quick decision making
- Do not add manual separators between menu sections by default, since section dividers are built in
- Do not keep critical actions only inside hidden menus when direct visibility is required

## MenuItem

MenuItem represents an actionable row inside a menu, with optional icon, destructive emphasis, disabled state,
or checkbox control behavior.

### Usage

#### Use for

- Presenting a single contextual action in compact menu surfaces
- Adding optional leading icons when they improve recognition speed without ambiguity
- Showing destructive options with stronger visual emphasis to signal risk
- Representing on/off choices with menuitem-checkbox behavior when selection state is relevant

#### Don't use for

- Do not use unclear labels that force users to infer action outcomes
- Do not combine too many icon styles and action tones in one menu without hierarchy
- Do not expose unavailable actions without disabled context that explains why
- Do not use MenuItem as a substitute for full form controls when persistent state editing is needed

## MenuSection

MenuSection groups related menu items and automatically renders a divider between sections for clearer
scanability.

### Usage

#### Use for

- Grouping related actions into clear clusters inside a single menu surface
- Improving menu scanability by separating action groups with built-in section dividers
- Structuring overflow menus where users need quick orientation by action category
- Keeping section composition lightweight by rendering only meaningful groups

#### Don't use for

- Do not add manual divider components between MenuSection blocks; separation is already built in
- Do not create many single-item sections when grouping does not add semantic value
- Do not use empty sections as spacing hacks in menu layouts
- Do not split tightly related actions across different sections without clear rationale
