# Icons

- Icons from Figma always come in kebab-case, to use them in code you should preprende Icon and transfor to camel case
- Icon weight is defined in the component name, there are three available weights: light, regular and filled: `Icon2GLight`, `Icon2GRegular`,`Icon2GFilled`

## Import

```tsx
import { Icon2GFilled } from "@telefonica/mistica";
```

## Color

Icon color can be change via `color` prop

```tsx
<Icon2GFilled color={skinVars.colors.brand} />
```

## Size

Icon size can be change via `size` prop

```tsx
<Icon2GFilled size={24} />
```
