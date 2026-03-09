# Timeline

## Timeline

The Timeline component is used to represent events in a chronological timeline. It can be used to visually and organizedly display processes,.

### Usage

#### Use for

- Applying the documented component pattern in product UI
- Keeping user experience coherent across screens and flows

#### Don't use for

- Don't use a timeline to guide a user through a step flow use the stepper or
- Do not replace a more suitable semantic component with this one
- Do not customize behavior in ways that conflict with Mística guidance

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| dataAttributes | `Record<string, string>` | No | - |  |
| orientation | `"horizontal" \| "vertical"` | No | vertical |  |
| role | `string` | No | list |  |

## TimelineItem

TimelineItem is a Mística component used to build consistent and accessible product interfaces.

### Usage

#### Use for

- Applying the documented component pattern in product UI
- Keeping user experience coherent across screens and flows

#### Don't use for

- Do not replace a more suitable semantic component with this one
- Do not customize behavior in ways that conflict with Mística guidance

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| asset | `ReactNode \| { kind: "dot"; } \| { kind: "number"; number: number; } \| { kind: "icon"; Icon: (props: IconProps) => Element; } \| { kind: "circled-icon"; Icon: (props: IconProps) => Element; } \| {...` | No | {kind: 'dot'} |  |
| dataAttributes | `Record<string, string>` | No | - |  |
| role | `string` | No | list |  |
| state | `"active" \| "inactive" \| "completed"` | No | inactive |  |

## Table

Use table for structured row-and-column data, with responsive behavior for mobile scrolling or collapsed row cards.

### Usage

#### Use for

- Displaying comparable structured data across multiple rows and columns
- Data sets that need clear column headers and optional row headers for better scanning and accessibility
- Tables that require per-row actions while keeping actions aligned and consistent
- Responsive scenarios where mobile users either scroll horizontally or see rows collapsed into card-like
  blocks
- Representing empty states directly inside the table container when no rows are available

#### Don't use for

- Do not use for unstructured rich content layouts; use cards or list compositions instead
- Do not hide headers unless users can still understand each cell context (especially in responsive/collapsed
  views)
- Do not force dense tables on small screens without choosing an appropriate responsive mode
- Do not overload rows with too many actions; keep row actions focused and scannable
- Do not use table when each item requires unique layout or long-form content rather than comparison

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| aria-describedby | `string` | No | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| boxed | `boolean` | No | - |  |
| columnTextAlign | `"left" \| "right" \| "center" \| TextAlign[]` | No | left |  |
| columnWidth | `(string \| number)[]` | No | - |  |
| content | `(ReactNode[] \| { cells: ReactNode[]; actions: readonly (ReactElement \| CardAction)[]; })[]` | No | [] |  |
| dataAttributes | `DataAttributes` | No | - | "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" |
| emptyCase | `ReactNode` | No | - |  |
| fullWidth | `boolean` | No | true | By default, the table expands to all the available width, if you want the table to have the minimum width to fit the rows content, set fullWidth to false. It's ignored in mobile |
| heading | `ReactNode[]` | No | [] |  |
| hideHeaders | `boolean \| "desktop" \| "mobile"` | No | - | Used to hide headers from UI. Screen readers will still recognize them when reading an element from the table. |
| maxHeight | `string \| number` | No | - | Limits the height of the table and the content will have vertical scroll. It's ignored in mobile when responsive move is 'collapse-rows' |
| responsive | `"scroll" \| "collapse-rows"` | No | - | In mobile, the table will be scrollable horizontally by default. Alternatively, you can set it to 'collapse-rows', which will render every row as a card |
| rowHeaderIndex | `number` | No | - |  |
| rowVerticalAlign | `"top" \| "middle"` | No | middle |  |
| scrollOverResponsiveLayout | `boolean` | No | - | When rendering the table inside a responsive layout, you can enable this prop to make the table scrollable over the layout paddings |
