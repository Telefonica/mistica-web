## [7.2.1](https://github.com/Telefonica/mistica-web/compare/v7.2.0...v7.2.1) (2020-11-13)


### Bug Fixes

* **FixedFooterLayout:** use a Portal to render the fixed footer in mobile ([1aa12ae](https://github.com/Telefonica/mistica-web/commit/1aa12ae36960b16aea80c1716a4adadae3a07c06))

# [7.2.0](https://github.com/Telefonica/mistica-web/compare/v7.1.1...v7.2.0) (2020-11-12)


### Bug Fixes

* **Playroom:** update icons in tabs snippet ([7b9f2f8](https://github.com/Telefonica/mistica-web/commit/7b9f2f8ead45a27806399602024ac75afb73a62b))


### Features

* **BoxedRow:** allow to select max lines count in title, subtitle and description ([af0a6da](https://github.com/Telefonica/mistica-web/commit/af0a6dacc380b28d64a26d22935ae833a42bcc8f))
* **HighlightedCard:** Allow to use ButtonLink in HighlightedCard ([58c3822](https://github.com/Telefonica/mistica-web/commit/58c38223b51dd445531fd3a7c3eb64a4bac2d93d))
* **PreviewTools:** playroom component to allow change theme ([d2b020a](https://github.com/Telefonica/mistica-web/commit/d2b020a1c51d100eabdedd29e0237984e5ab5318))

## [7.1.1](https://github.com/Telefonica/mistica-web/compare/v7.1.0...v7.1.1) (2020-11-05)


### Bug Fixes

* **DateTimePicker:** format time in 24H ([#143](https://github.com/Telefonica/mistica-web/issues/143)) ([2413c16](https://github.com/Telefonica/mistica-web/commit/2413c161ba28ce6087a59c0f3abe297977b00aae))

# [7.1.0](https://github.com/Telefonica/mistica-web/compare/v7.0.2...v7.1.0) (2020-11-05)


### Bug Fixes

* **header-story:** translate texts to english ([48f0b22](https://github.com/Telefonica/mistica-web/commit/48f0b22104be72db2c7bee42e609d981b61bb9fa))


### Features

* **ButtonLink:** Remove min width ([0915ba9](https://github.com/Telefonica/mistica-web/commit/0915ba9b5fddf58bb6abe5e78e95c58a6b445340))
* **Dependencies:** upgrade dependencies: typescript, storybook, playroom, babel and more ([#141](https://github.com/Telefonica/mistica-web/issues/141)) ([4b8ce40](https://github.com/Telefonica/mistica-web/commit/4b8ce407845d2e66e14c67910600bb458f3a9817))

## [7.0.2](https://github.com/Telefonica/mistica-web/compare/v7.0.1...v7.0.2) (2020-10-27)


### Bug Fixes

* **HighlightedCard:** desktop paddings ([0a8b9bd](https://github.com/Telefonica/mistica-web/commit/0a8b9bde50ad0a1e0f475af2950da926fa90906c))

## [7.0.1](https://github.com/Telefonica/mistica-web/compare/v7.0.0...v7.0.1) (2020-10-22)


### Bug Fixes

* **Text:** improve truncate related styles ([27841c2](https://github.com/Telefonica/mistica-web/commit/27841c24d5b816f97f70ec9f3c56f4e0ebf1fb8a))

# [7.0.0](https://github.com/Telefonica/mistica-web/compare/v6.7.0...v7.0.0) (2020-10-21)


### Features

* **Controls:** Switch, Checkbox, Radio Buttons. Renamed FormXxxFields to XxxFields ([0119724](https://github.com/Telefonica/mistica-web/commit/011972491ee7dffa95d0b3249112764c7f7a18ae))
* **ThemeContext:** Refactor skins and colors ([278c073](https://github.com/Telefonica/mistica-web/commit/278c0733d22e6c6533d7f5cfb2049c8873c3f7f9))


### BREAKING CHANGES

* **Controls:** renamed FormXxxFields to XxxFields
* **ThemeContext:** theme context provider initialization has changed

# [6.7.0](https://github.com/Telefonica/mistica-web/compare/v6.6.0...v6.7.0) (2020-10-21)

### Features

- **Text:** Allow to pass a number of lines to `truncate` prop
  ([0aeb2dc](https://github.com/Telefonica/mistica-web/commit/0aeb2dc4f478e886cfc171154848d1a1b57117f5))

# [6.6.0](https://github.com/Telefonica/mistica-web/compare/v6.5.0...v6.6.0) (2020-10-20)

### Features

- **DateField:** Date and DateTime improvements (custom icon, improved styles and ux)
  ([#136](https://github.com/Telefonica/mistica-web/issues/136))
  ([2542185](https://github.com/Telefonica/mistica-web/commit/2542185be9e06e83c2f9a4dd2d509c35b301d564))
- **Text:** new `wordBreak` prop.
  ([3895f71](https://github.com/Telefonica/mistica-web/commit/3895f71bbd8e0f09149def7e30783cce8b682e81))

# [6.5.0](https://github.com/Telefonica/mistica-web/compare/v6.4.0...v6.5.0) (2020-10-15)

### Bug Fixes

- **CI:** update vercel action version ([#132](https://github.com/Telefonica/mistica-web/issues/132))
  ([787033f](https://github.com/Telefonica/mistica-web/commit/787033f69dd27a245f787a99c32b905f4456ea98))

### Features

- **Inline:** support 2, 4 and 12px space
  ([d7a71c6](https://github.com/Telefonica/mistica-web/commit/d7a71c6620cbfaf3df2fa5094f1630a2b08c4c77))
- **media queries:** add new isDesktopOrBigger media query
  ([aca5479](https://github.com/Telefonica/mistica-web/commit/aca5479b518963529a0959b9f7b66e7aa1f774c3))

# [6.4.0](https://github.com/Telefonica/mistica-web/compare/v6.3.0...v6.4.0) (2020-10-09)

### Bug Fixes

- **FormEmailField:** improve email validation ([#130](https://github.com/Telefonica/mistica-web/issues/130))
  ([5c8badf](https://github.com/Telefonica/mistica-web/commit/5c8badf39116f4bbac30f779203d47e3cec041af))
- **Icons:** Improve icons tree-shaking
  ([e993755](https://github.com/Telefonica/mistica-web/commit/e99375588faff7cc8ad2a7856a0d375eb7dc02b8))

### Features

- **FormTextField:** Add 'username' as valid autoComplete option
  ([#128](https://github.com/Telefonica/mistica-web/issues/128))
  ([969a8f1](https://github.com/Telefonica/mistica-web/commit/969a8f1ad8af4f008b86c318ba3a26ff6624aa5d))

# [6.3.0](https://github.com/Telefonica/mistica-web/compare/v6.2.0...v6.3.0) (2020-10-06)

### Bug Fixes

- **GridLayout:** fixed styles to avoid horizontal scroll in mobile
  ([18a2605](https://github.com/Telefonica/mistica-web/commit/18a26052c8ecf31b8df1b1d8b013428d4d87fa3c))
- **Version:** improve version import from package.json
  ([f367521](https://github.com/Telefonica/mistica-web/commit/f36752147c7e251c19039524d07f7c8ad407f70e))

### Features

- **Build:** generate library size stats on build time (see `size-stats.json`)
  ([b3e8b66](https://github.com/Telefonica/mistica-web/commit/b3e8b6618ac401be8285afa6aab329b6aace6dd9))

# [6.2.0](https://github.com/Telefonica/mistica-web/compare/v6.1.2...v6.2.0) (2020-09-21)

### Bug Fixes

- **Tabs:** Some style fixes mainly affecting tablet breakpoint layout
  ([1ac7d03](https://github.com/Telefonica/mistica-web/commit/1ac7d036fbe25584ba6077deed5a5309d0122e6d))

### Features

- **Icons:** Added all mistica-icons as React Components. See Storybook Icons section
  ([3d074c4](https://github.com/Telefonica/mistica-web/commit/3d074c473d14052434baaaa27f9341346c868985))
- **Text:** new TextX components with the allowed texts presets
  ([c0b36da](https://github.com/Telefonica/mistica-web/commit/c0b36da0193160ff93b4395c63858e887d213b12))

## [6.1.2](https://github.com/Telefonica/mistica-web/compare/v6.1.1...v6.1.2) (2020-09-16)

### Bug Fixes

- **FeedbackIconError:** broken animation
  ([4e42076](https://github.com/Telefonica/mistica-web/commit/4e42076aaa598df2372d950e86865d78ceabd77a))

## [6.1.1](https://github.com/Telefonica/mistica-web/compare/v6.1.0...v6.1.1) (2020-09-16)

### Bug Fixes

- **Release:** add typedefs to build
  ([bf3110b](https://github.com/Telefonica/mistica-web/commit/bf3110bfc5a1aee926c8fb8acf3b7e62155fd43a))

# [6.1.0](https://github.com/Telefonica/mistica-web/compare/v6.0.0...v6.1.0) (2020-09-15)

### Bug Fixes

- **FormTextField:** fix multi line FormTextField bottom padding
  ([1f5c0a8](https://github.com/Telefonica/mistica-web/commit/1f5c0a8fc4e5caae3b2b4324c2023151a8746d2a))
- **JSS:** use className id generator for client side executed code to avoid class names collision
  ([e972eaf](https://github.com/Telefonica/mistica-web/commit/e972eaf11f23b1a7c02ef1a046445f5f3395e03e))
- **Snackbar:** Fix Snackbar styles for mobile and desktop
  ([f9f8eed](https://github.com/Telefonica/mistica-web/commit/f9f8eedd6dc2ca4bb6f674302ddeba3eda584159))

### Features

- **FeedbackScreen:** New FeedbackScreen component
  ([e22f65c](https://github.com/Telefonica/mistica-web/commit/e22f65ce553716d8c985a623d7c683696935183b))
- **FormDateTimeField:** new Form Field component for DateTime values
  ([221d158](https://github.com/Telefonica/mistica-web/commit/221d1583711fd434444560378f3c40dc88a20cf4))

# [6.0.0](https://github.com/Telefonica/mistica-web/compare/v5.3.2...v6.0.0) (2020-09-08)

### Bug Fixes

- **FormTextField:** Update Focus/Blur behavior in multiline `FormTextField`
  ([b69c49b](https://github.com/Telefonica/mistica-web/commit/b69c49b1078009cafff4fb0ceec973c5cc38bef5))
- **HighlightedCard:** background image positioning
  ([#108](https://github.com/Telefonica/mistica-web/issues/108))
  ([5813cac](https://github.com/Telefonica/mistica-web/commit/5813cac3d7527c484dfe6b78d55bb2537ff7b297))
- **SSR:** Fix some components server side rendering
  ([e0b6777](https://github.com/Telefonica/mistica-web/commit/e0b677741873d0eed64052d356b1ffe4531bbbf3))

### Features

- **bun:** Remove Bun component
  ([da4ca92](https://github.com/Telefonica/mistica-web/commit/da4ca920b8e82616d651646a98b9f574a052bb10))
- Removed `withSheet`, `createSheet` and `removeJssProps`
  ([#107](https://github.com/Telefonica/mistica-web/issues/107))
  ([7cf4aeb](https://github.com/Telefonica/mistica-web/commit/7cf4aeb07e4654e4ca56aac85ea2fb82331ec6b7))

### BREAKING CHANGES

- **bun:** Remove Bun component
- `withSheet`, `createSheet` and `removeJssProps` are no longer part of mistica-web. Use `createUseStyles`
  instead

# 5.3.2 (2020-08-28)

- Update `@tef-novum/webview-bridge` dependency

# 5.3.1 (2020-08-26)

- Fix some Flow types for components with union types in Props (`Touchable`, `Button`, `ListRow`,
  `HightlightedCard`, etc)
- **Internal**: Make PRs fail in CI if flow definitions are not commited.
- **Internal**: Automatically start storybook when running acceptance tests if it hasn't already been started.

# 5.3.0 (2020-08-25)

- New `HighlightedCard` component.
- Added `@telefonica/eslint-plugin-async-await`.

# 5.2.0 (2020-08-20)

- Support multiple tracking events.
- New `FormSearchField` component
- `TextLink` and `ListRow`: disable wrong `:hover` styles in touch devices.
- Fixed several `FormSelect` bugs:
  - Bad spacing when label is empty.
  - Native caret being shown when rendered as a native component.
  - Caret being mispositioned on firefox.
- **Internal**: Kill docker container after running acceptance tests.

# 5.1.0 (2020-08-12)

- Expose `validate` and `submit` in `Form` context to be able to create forms with manual validation and
  submit. See examples in form stories
- **Internal**: GitHub action to upload failed screenshot diffs to azure and show them as PR comment

# 5.0.1 (2020-08-06)

- Fix `FormXXXField` components when used in uncontrolled mode outside a `Form` parent component.
- Fix `FormXXXField` label color when error.
- **Internal**: use `babel-loader` instead of `ts-loader` in storybook.
- Fix Switch component colors in O2 (iOS) and Movistar (Android)
- Fix Switch component when used in uncontrolled mode
- **Internal**: Changed codemod `import-type.js`, now it transforms to import type (flow) everything imported
  as a type in typescript.
- **Internal**: Code reorganization
- Fix `Touchable` styles. All variants are now equally styled (`display: block` and `width: 100%`)

# 5.0.0 (2020-07-29)

### BREAKING CHANGES

- Deprecated `TextField` component is no longer available. Use `FormXXXField` variants.
- Deprecated `type` property for `FormTextField` component is no longer available. Use corresponding
  `FormXXXField` variant.
- `Select` component is no longer available. Use `FormSelect`.
- `PhoneInput` component is no longer available. Use `FormPhoneNumberField`.
- `withMargin` property for `ButtonLayout>` component is no longer available. Refer to `Box` and `Stack`
  components to add spacings when necessary.

# 4.2.7 (2020-07-28)

- Avoid warning in controlled/uncontroleld components

# 4.2.6 (2020-07-28)

- Simplify FormFields implementation. Move common logic to a hook
- Fix a problem with `defaultValue` in fields being used outside a `<Form>` component
- Fix a problem in `Select` component where a double `optional` suffix was being added

# 4.2.5 (2020-07-27)

- Fix: missing new color in O2 Classic skin

# 4.2.4 (2020-07-27)

- Fix: Form initialValues were ignored

# 4.2.3 (2020-07-24)

- Fix: Export some missing FormFields, improve controlled/uncontrolled usage inside a `<Form>`

# 4.2.2 (2020-07-23)

- Add chart color for Vivo

# 4.2.1 (2020-07-23)

- Minor fix for `Portal`, including improved SSR

# 4.2.0 (2020-07-23)

- Update a chart color for Vivo skin
- Form fields refactor:
  - Deprecate `TextField` (will be removed in a future release)
  - Deprecate `FormTextField` with types different than `"text"` (those usages will be removed in a future
    release)
  - New semantic FormField components added:
    - `FormDateField`
    - `FormDecimalField`
    - `FormEmailField`
    - `FormIntegerField`
    - `FormPasswordField`
  - All FormField components can now be used inside a `<Form>` and standalone (connected or unconnected)
  - `name` prop is in FormFields is now mandatory

# 4.1.0 (2020-07-21)

- Removed border from `BoxedRowList` component, moved it to `BoxedRow` component
- New `Inline` layout component
- Forbid using `undefined` in jss dynamic styles

# 4.0.1 (2020-07-16)

- Fix `TextLink` line height

# 4.0.0 (2020-07-15)

- Reset some browser default styles at component level.
- SSR compatibility to support using `@telefonica/mistica` in Next.js apps.
- Added a `examples/` folder. Added some examples on how to use `@telefonica/mistica` with common
  meta-frameworks, like Create React App or Next.js
- Some fixes in `<Switch />` component to avoid some warnings in newer react versions.

### BREAKING CHANGES

- Decouple from `react-router-dom`.
  - You can now provide your custom `Link` component to mistica using the `ThemeContextProvider`. There are
    some examples in the `examples/` folder on how to use this feature with popular routers, like react-router
    and Next.js router.
  - By default, if you don't provide a custom `Link` component, `@telefonica/mistica` will render simple `<a>`
    elements.

# 3.5.0 (2020-07-13)

- Created o2-classic skin and updated colors.

# 3.4.0 (2020-07-08)

- Changed responsive layout columns for tablet.
- Changed grid layout margins and width for some viewports.
- Fixed bug on radio buttons inside lists.

# 3.3.1 (2020-07-01)

- Accessibility and tracking for `Tabs` component.

# 3.3.0 (2020-06-30)

- New `Tabs` component.

# 3.2.0 (2020-06-30)

- New colors for app tab bar.

# 3.1.1 (2020-06-29)

- Fixed changelog.

# 3.1.0 (2020-06-29)

- NegativeBox Component.

# 3.0.2 (2020-06-26)

- Minor bugfixes

# 3.0.1 (2020-06-26)

- Minor bugfixes

# 3.0.0 (2020-06-26)

- Added new skin `O2-classic`
- New radio button component
- New switch component
- List rows improvements:
  - Added support for radio buttons in list rows
  - Added support for switch in list rows
  - Added support for circular checkboxes in list rows
  - Added support for headline and subtitle in list rows
- Added `id` prop to `SectionTitle` and `Text` components, to be able to use them as accesibility labels
  (`aria-labelledby`)
- Added support for SSR. To support using `@telefonica/mistica` in frameworks like Next.

### BREAKING CHANGES

- Migrate to TS
  - Autogenerated d.ts and js.flow definitions
- Unified naming for icon components.
  - All icon component names now start with Icon

# 2.1.1 (2020-06-19)

- Fix for mistica version check.

# 2.1.0 (2020-06-19)

- Check there is only one version of mistica running in the same page
- New color constants for desktop nav bar
- Change credit card form fields spacing to 16px
- Fix control active color for Movitar prominent.

# 2.0.0 (2020-06-12)

- Header improvements:
  - Allow two buttons in header.
  - Make header title optional
  - Allow any `React.Node` as `header` prop in `HeaderLayout` to support skeletons there.
  - Change error color to pink
- Grid layout now have 12 columns in tablet breakpoint too. It had 8 before.
- Expose `Locale` and `RegionCode` types.

### BREAKING CHANGES

- `Header`: Allow extra content vertical in desktop. This is now the default behavior, to enable the old
  horizontal behavior use `sideBySideExtraOnDesktop` prop in `HeaderLayout`.

# 1.1.0 (2020-06-10)

- Fix [bug](https://github.com/Telefonica/mistica-web/pull/12) with cancel calback on Dialogs
- `locale` now have the format `'es-ES'` instead of `es_ES`. This change is retrocompatible at run time
  because we sanitize locales before using them (replace `_` with `-`). But the types aren't retrocompatible
  because we have changed the `Locale` enum

# 1.0.1 (2020-06-05)

- Include flow types

# 1.0.0 (2020-06-05)

- First release!
