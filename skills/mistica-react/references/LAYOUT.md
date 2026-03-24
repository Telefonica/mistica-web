# Layout

## Core Layout Primitives

### Box

- Use for container internal spacing
- Do not use for external spacing
- Do not use to distribute children

```tsx
<Box paddingX={16} paddingY={24}>
  <Child />
</Box>
```

### Stack

Distributes children vertically with consistent spacing.

- Use for vertical rhythm, sections or rouped content
- The items that have to be vertically stacket should be direct children of the stack
- Values of stack space prop should decrease from general to particular (e.g. sections use 32, and items inside that section 24)
- `space` property can not be empty

```tsx
<Stack space={24}>
  <Child1 />
  <Child2 />
</Stack>
```

### Grid

- All direct children of a grid should be `<GridItem>`
- Grid

```tsx
<Grid columns={2} rows={3} gap={8}>
  <GridItem columnSpan={2} />
  <GridItem rowSpan={2} />
</Grid>
```

### Inline

Horizontal equivalent of Stack

- `space` property can not be empty

Available space values

- Numeric (e.g. 16): fixed separation
- "between": first and last flush to edges
- "around": half-space at edges
- "evenly": equal space everywhere

```tsx
<Inline space={16}>
  <Child1 />
  <Child2 />
</Inline>
```

### Align

Align items horizontally or vertically

```tsx
<Align x="center"><Child /></Align>
<Align y="center"><Child /></Align>
```

## Page layouts

### ResponsiveLayout

This component creates a responsive container for your page content. The size of this container depends on the viewport size.

```tsx
<ResponsiveLayout>
  <MyFeature />
</ResponsiveLayout>
```

### HeaderLayout

The HeaderLayout is responsible for render the page header and related components. It uses the ResponsiveLayout internally so you must not wrap it inside one.

```tsx
<HeaderLayout header={<Header title="Header" />} />
<ResponsiveLayout>
  <MyFeature />
</ResponsiveLayout>
```

### Gridlayout

The GridLayout uses defines a grid with a set of columns where you can place your components. Different screen sizes will have different number of columns. This component must be used inside a ResponsiveLayout

```tsx
<ResponsiveLayout>
  <GridLayout>
    <Component1 />
    <Component2 />
    {/* ... */}
    <ComponentN />
  </GridLayout>
</ResponsiveLayout>
```

### Grid templates

A set of predefined templates can be used

```tsx
<ResponsiveLayout>
  <GridLayout
    template="6+6"
    left={<LeftComponent />}
    right={<RightComponent />}
  />
</ResponsiveLayout>
```

## NegativeBox

Some components, like non boxed Lists, need to be rendered overflowing its container, because the hover effect is larger than the container. This can be achieved using a NegativeBox

```tsx
<ResponsiveLayout>
  <NegativeBox>
    <RowList>
      <Row1 />
      <Row2 />
      <Row3 />
    </RowList>
  </NegativeBox>
</ResponsiveLayout>
```

## Vertical ryhthm

It makes the page feel consistent and visually pleasant. It is important to maintain the rhythm across the site.

Elements inside our page content can be divided in 3 main groups:

Container: should have a top and bottom space of 24px
Sections: should have a 32px space between them
Elements: should have a 16px separation between them

This is how a page layout could look like:

```tsx
<HeaderLayout header={<Header title="Header" />} />
<ResponsiveLayout>
  <Box paddingY={24}>
    <Stack space={32}>
      <Stack space={16}>
        <Title1>Section 1</Title1>
        <Text2 regular>
          Some example text
        </Text2>
      </Stack>

      <Stack space={16}>
        <Title1>Section 2</Title1>
        <NegativeBox>
          <RowList>
            <Row1 />
            <Row2 />
            <Row3 />
          </RowList>
        </NegativeBox>
      </Stack>
    </Stack>
  </Box>
</ResponsiveLayout>
```
