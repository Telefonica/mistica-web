# Mistica and Module Federation

This page explains how to consume Mística from a host that uses
[webpack Module Federation](https://webpack.js.org/plugins/module-federation-plugin/).

## The problem that the icons package solves

A `shared` module must answer any request that arrives at run time, so the bundler cannot remove an unused
export. Tree shaking stops for that module. The official Module Federation documentation says that the classic
shared mechanism
["always provides the full dependency bundle"](https://module-federation.io/guide/advanced/shared-tree-shaking).

Mística used to export more than 2200 icons from its barrel, so a host that shared the library received them
all, even when it rendered two icons. Measured in a browser with the example of this repository: a page with
`17.4.0` downloaded **9463 kB** of JavaScript, and a page with this version downloads **1711 kB**, with a
second application on it.

Since version 18.0.0 the icons live in `@telefonica/mistica-icons`, one module for each icon, and
`@telefonica/mistica` carries no icon artwork.

## The split helps every consumer, not only a federated host

Module Federation exposed the problem, but the icons weighed on each consumer. The artwork was 85% of
`dist-es`, and the build dropped from **18.41 MB to 2.15 MB** with the split. So these consumers gain as well:

- an application with Vite, Rollup, esbuild or Rspack, which now reads a smaller package;
- a Jest or Vitest run, which no longer transforms the icons that the test does not render;
- an `npm install` or a Docker layer, which downloads less;
- an editor, which lists one icon for each module instead of 2225 exports of one barrel.

A federation option can only help a federated host. A separate package helps all of them, and it needs no
configuration.

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

Two more details belong to the host, and a page stays blank without them:

- **An async boundary.** The entry must only load the application, for example `import('./bootstrap')`. An
  entry that imports `@telefonica/mistica` itself fails with "Shared module is not available for eager
  consumption", because webpack fills the share scope asynchronously.
- **`output.uniqueName` for each application.** Two applications with the same unique name write to the same
  `webpackChunk` global, their chunk registries collide, and a chunk promise never settles. webpack reads the
  name from `package.json`, so an application with a name needs nothing here.

[examples/module-federation](../examples/module-federation/README.md) holds a working host and remote, with a
script that loads the page in a browser and reports what it downloads.

## The icons need a prefix, or no sharing at all

`@telefonica/mistica-icons` has no entry point on purpose, so this **fails**:

```js
// the container finds no module to provide
shared: {'@telefonica/mistica-icons': {}}
```

**Leave the icons out of the `shared` list.** Each application then bundles the icons that it uses. An icon
holds no state, so a second copy of one icon is safe, and it costs a few hundred bytes.

The other configuration, a shared path prefix, also works, but it costs more than it saves:

```js
// measured: the page makes 63 requests with this line, and 10 without it
shared: {
    '@telefonica/mistica': {singleton: true},
    '@telefonica/mistica-icons/': {},
}
```

The trailing slash shares each module under the prefix on its own, so webpack emits one shared module, one
chunk and one fallback copy for each icon, including the 52 icons that the components of Mística render
themselves. [examples/module-federation](../examples/module-federation/README.md) holds the measurement and
the command that repeats it.

## Warning: one theme context, one specifier

Every application on the page must reach the theme through the same specifier. If application A imports
`ThemeContextProvider` from `@telefonica/mistica`, and application B reaches the same provider through a deep
path such as `@telefonica/mistica/dist-es/theme-context-provider`, the share scope holds two module
identities. The provider of A then becomes invisible to B, and the components of B fall back to the default
theme or throw.

Each icon of `@telefonica/mistica-icons` imports `@telefonica/mistica` by its bare name, for this exact
reason. The share scope intercepts that name, so an icon of a remote reads the theme of the host. An icon that
reached the theme through a deep path would throw _"you must instantiate `<ThemeContextProvider>`"_, because a
deep path never enters the share scope.

## The component barrel stays a barrel

`@telefonica/mistica` exports its components from one entry point, so a shared host receives every component,
not only the ones that it renders. That is about 2 MB before compression.

Three answers exist, in order of cost:

1. Accept it. The 9463 kB page is gone, and a design system of that size is normal.
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

## Why that option did not replace the icons package

The same `treeShaking` option could remove the unused icons from a shared barrel, so a reader can ask why the
library moved them into a second package. Four reasons:

1. **The option belongs to the host.** The library cannot enable it. A host on the plain webpack
   `ModuleFederationPlugin` receives the full barrel, and the library has no way to prevent that.
2. **The option excludes two configurations that Mística needs or permits.** It is incompatible with
   `eager: true`, and its documentation warns about a conflict with a singleton. Mística requires
   `singleton: true` for its theme context.
3. **The option infers the use of an export.** An indirect import, a re-export or a dynamic name can defeat
   that inference, and the host then receives the icon anyway. A separate module for each icon needs no
   inference: the bundler reads the import graph.
4. **The option helps a federated host only.** Read the section above: the icons weighed on each consumer.

The two measures remain complementary. The package split removed the icons for everybody, and `treeShaking`
reduces the component barrel of a host that can enable it.

## Requirements of the icons package

The icons package declares its modules with an `exports` map, so a consumer needs:

- webpack 5, Vite, Rspack or another bundler that reads the `exports` field;
- Jest 28 or later, if the tests import an icon;
- TypeScript with `moduleResolution` set to `bundler`, `node16` or `nodenext`. A project that still uses
  `moduleResolution: node` resolves the types through the `typesVersions` field of the package, which covers
  the same paths.

## Migration

The codemod in [codemods/mistica-icons-codemod.js](../codemods/mistica-icons-codemod.js) helps to rewrite
every icon import of a codebase:

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
