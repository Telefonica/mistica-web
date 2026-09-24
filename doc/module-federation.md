# Mistica and Module Federation

This page explains how to consume Mistica from a host that uses
[webpack Module Federation](https://webpack.js.org/plugins/module-federation-plugin/).

## The problem that the icons package solves

A `shared` module must answer any request that arrives at run time, so the bundler cannot remove an unused
export. Tree shaking stops for that module. The official Module Federation documentation says that the classic
shared mechanism
["always provides the full dependency bundle"](https://module-federation.io/guide/advanced/shared-tree-shaking).

Mistica used to export more than 2200 icons from its barrel, so a host that shared the library received about
16 MB of icon artwork, even when it rendered two icons.

Since version 18.0.0 the icons live in `@telefonica/mistica-icons`, one module for each icon, and
`@telefonica/mistica` carries no icon artwork.

## Configuration of a host

```js
new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    /* ... */
  },
  shared: {
    react: {singleton: true},
    'react-dom': {singleton: true},
    '@telefonica/mistica': {singleton: true},
  },
});
```

`@telefonica/mistica` needs `singleton: true`, because it holds React contexts. Two copies of the theme
context break the theme, the dialogs and the snackbars.

## The icons need a prefix, or no sharing at all

`@telefonica/mistica-icons` has no entry point on purpose, so this **fails**:

```js
// the container finds no module to provide
shared: {'@telefonica/mistica-icons': {}}
```

Two configurations work:

1. **Leave the icons out of the `shared` list.** Each application bundles the icons that it uses. Two
   applications that use the same icon ship it two times, and that costs a few hundred bytes. The icons hold
   no state, so a second copy is safe.
2. **Share the path prefix.** Note the trailing slash: webpack then shares each module under the prefix on its
   own.

```js
shared: {
    '@telefonica/mistica': {singleton: true},
    '@telefonica/mistica-icons/': {},
}
```

## Warning: one theme context, one specifier

Every application on the page must reach the theme through the same specifier. If application A imports
`ThemeContextProvider` from `@telefonica/mistica`, and application B reaches the same provider through a deep
path such as `@telefonica/mistica/dist-es/theme-context-provider`, the share scope holds two module
identities. The provider of A then becomes invisible to B, and the components of B fall back to the default
theme or throw.

The icons read the theme through a file of the same package (`dist-es/icon-runtime.js` for a bundler,
`dist/icon-runtime.js` for Node). Do not add that path to the `shared` list: let it resolve inside the shared
copy of `@telefonica/mistica`.

## The component barrel stays a barrel

`@telefonica/mistica` exports its components from one entry point, so a shared host receives every component,
not only the ones that it renders. That is about 2 MB before compression.

Three answers exist, in order of cost:

1. Accept it. The 16 MB problem is gone, and a design system of that size is normal.
2. Import a component by its own path when you need the minimum, for example
   `@telefonica/mistica/dist-es/button`. Warning: read the section above first, because a mixed import style
   splits the context identity.
3. Use the `treeShaking` option of
   [@module-federation/enhanced](https://module-federation.io/guide/advanced/shared-tree-shaking):

```js
shared: {
    '@telefonica/mistica': {
        singleton: true,
        treeShaking: {mode: 'runtime-infer'},
    },
}
```

That option belongs to the consumer, not to this library. It needs `@module-federation/enhanced`, the Rspack
`sharing` module or the Modern.js plugin, it is incompatible with `eager: true`, and its documentation warns
about singleton conflicts.

## Requirements of the icons package

The icons package declares its modules with an `exports` map, so a consumer needs:

- webpack 5, Vite, Rspack or another bundler that reads the `exports` field;
- Jest 28 or later, if the tests import an icon;
- TypeScript with `moduleResolution` set to `bundler`, `node16` or `nodenext`. A project that still uses
  `moduleResolution: node` resolves the types through the `typesVersions` field of the package, which covers
  the same paths.

## Migration

The codemod in [codemods/mistica-icons-codemod.js](../codemods/mistica-icons-codemod.js) rewrites every icon
import of a codebase:

```bash
yarn add @telefonica/mistica-icons
npx jscodeshift -t codemods/mistica-icons-codemod.js --parser=tsx --extensions=tsx,ts src
```

Before:

```tsx
import {ButtonPrimary, IconStarRegular} from '@telefonica/mistica';
```

After:

```tsx
import {ButtonPrimary} from '@telefonica/mistica';
import IconStarRegular from '@telefonica/mistica-icons/icon-star-regular';
```

The icon metadata moved as well:

```tsx
// before: import {iconKeywords, iconCategories} from '@telefonica/mistica';
import {iconKeywords, iconCategories} from '@telefonica/mistica-icons/keywords';
```
