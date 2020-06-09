# Styles

Internally, `@telefonica/mistica` uses [`react-jss`](https://cssinjs.org/react-jss/?v=v10.0.0) to style the
Mistica components. If you're using Mistica in your App, you may want to use the Mistica jss to have access to
the theme skin colors, etc. The lib exposes some functions that allows you to style your components in the
same way we do internally in Mistica.

## createUseStyles

To create a hook that returns the `JSS` classes you just have to call `createUseStyles`, **passing in a
function that returns your styles object**:

```javascript
import {createUseStyles} from '@telefonica/mistica';

const useStyles = createUseStyles(() => ({
  title: {
    // Some styles
  },
}));
```

Then you can make use of it in your component:

```javascript
const MyComponent = () => {
  const classes = useStyles();

  return <h1 className={classes.title}>Hello moto!</h1>;
};
```

The function passed in to `createUseStyles` will be called with one argument, the styling theme:

```javascript
const useStyles = createUseStyles((theme) => ({
  title: {
    color: theme.colors.textPrimary,
  },
}));
```

Additionally, you can pass one argument to the `useStyles` function. This will allow you to have dynamic
properties in your styles by making use of function values. **Function values are only supported for leaf
nodes, meaning they have to be mapped directly to a CSS property**:

```javascript
const useStyles = createUseStyles(() => ({
  title: {
    fontSize: ({titleSize = 20}) => titleSize,
  },
}));

const MyComponent = (props) => {
  const classes = useStyles(props);

  return <h1 className={classes.title}>Hello moto!</h1>;
};
```

```html
<MyComponent titleSize="10"></MyComponent>
```
