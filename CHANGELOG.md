# v5.3.2 - 2020-08-28

- Update `@tef-novum/webview-bridge` dependency

# v.5.3.1 - 2020-08-26

- Fix some Flow types for components with union types in Props (`Touchable`, `Button`, `ListRow`,
  `HightlightedCard`, etc)
- **Internal**: Make PRs fail in CI if flow definitions are not commited.
- **Internal**: Automatically start storybook when running acceptance tests if it hasn't already been started.

# v.5.3.0 - 2020-08-25

- New `HighlightedCard` component.
- Added `@telefonica/eslint-plugin-async-await`.

# v.5.2.0 - 2020-08-20

- Support multiple tracking events.
- New `FormSearchField` component
- `TextLink` and `ListRow`: disable wrong `:hover` styles in touch devices.
- Fixed several `FormSelect` bugs:
  - Bad spacing when label is empty.
  - Native caret being shown when rendered as a native component.
  - Caret being mispositioned on firefox.
- **Internal**: Kill docker container after running acceptance tests.

# v.5.1.0 - 2020-08-12

- Expose `validate` and `submit` in `Form` context to be able to create forms with manual validation and
  submit. See examples in form stories
- **Internal**: GitHub action to upload failed screenshot diffs to azure and show them as PR comment

# v.5.0.1 - 2020-08-06

- Fix `FormXXXField` components when used in uncontrolled mode outside a `Form` parent component.
- Fix `FormXXXField` label color when error.
- **Internal**: use `babel-loader` instead of `ts-loader` in storybook.
- Fix Switch component colors in O2 (iOS) and Movistar (Android)
- Fix Switch component when used in uncontrolled mode
- **Internal**: Changed codemod `import-type.js`, now it transforms to import type (flow) everything imported
  as a type in typescript.
- **Internal**: Code reorganization
- Fix `Touchable` styles. All variants are now equally styled (`display: block` and `width: 100%`)

# v.5.0.0 - 2020-07-29

### Breaking changes

- Deprecated `TextField` component is no longer available. Use `FormXXXField` variants.
- Deprecated `type` property for `FormTextField` component is no longer available. Use corresponding
  `FormXXXField` variant.
- `Select` component is no longer available. Use `FormSelect`.
- `PhoneInput` component is no longer available. Use `FormPhoneNumberField`.
- `withMargin` property for `ButtonLayout>` component is no longer available. Refer to `Box` and `Stack`
  components to add spacings when necessary.

# v4.2.7 - 2020-07-28

- Avoid warning in controlled/uncontroleld components

# v4.2.6 - 2020-07-28

- Simplify FormFields implementation. Move common logic to a hook
- Fix a problem with `defaultValue` in fields being used outside a `<Form>` component
- Fix a problem in `Select` component where a double `optional` suffix was being added

# v.4.2.5 - 2020-07-27

- Fix: missing new color in O2 Classic skin

# v.4.2.4 - 2020-07-27

- Fix: Form initialValues were ignored

# v.4.2.3 - 2020-07-24

- Fix: Export some missing FormFields, improve controlled/uncontrolled usage inside a `<Form>`

# v.4.2.2 - 2020-07-23

- Add chart color for Vivo

# v.4.2.1 - 2020-07-23

- Minor fix for `Portal`, including improved SSR

# v.4.2.0 - 2020-07-23

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

# v.4.1.0 - 2020-07-21

- Removed border from `BoxedRowList` component, moved it to `BoxedRow` component
- New `Inline` layout component
- Forbid using `undefined` in jss dynamic styles

# v.4.0.1 - 2020-07-16

- Fix `TextLink` line height

# v.4.0.0 - 2020-07-15

- **Breaking change**: Decouple from `react-router-dom`.
  - You can now provide your custom `Link` component to mistica using the `ThemeContextProvider`. There are
    some examples in the `examples/` folder on how to use this feature with popular routers, like react-router
    and Next.js router.
  - By default, if you don't provide a custom `Link` component, `@telefonica/mistica` will render simple `<a>`
    elements.
- Reset some browser default styles at component level.
- SSR compatibility to support using `@telefonica/mistica` in Next.js apps.
- Added a `examples/` folder. Added some examples on how to use `@telefonica/mistica` with common
  meta-frameworks, like Create React App or Next.js
- Some fixes in `<Switch />` component to avoid some warnings in newer react versions.

# v.3.5.0 - 2020-07-13

- Created o2-classic skin and updated colors.

# v.3.4.0 - 2020-07-08

- Changed responsive layout columns for tablet.
- Changed grid layout margins and width for some viewports.
- Fixed bug on radio buttons inside lists.

# v.3.3.1 - 2020-07-01

- Accessibility and tracking for `Tabs` component.

# v.3.3.0 - 2020-06-30

- New `Tabs` component.

# v.3.2.0 - 2020-06-30

- New colors for app tab bar.

# v.3.1.1 - 2020-06-29

- Fixed changelog.

# v.3.1.0 - 2020-06-29

- NegativeBox Component.

# v.3.0.2 - 2020-06-26

- Minor bugfixes

# v.3.0.1 - 2020-06-26

- Minor bugfixes

# v.3.0.0 - 2020-06-26

- **Breaking change**: Migrate to TS
  - Autogenerated d.ts and js.flow definitions
- **Breaking change**: Unified naming for icon components.
  - All icon component names now start with Icon
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

# v.2.1.1 - 2020-06-19

- Fix for mistica version check.

# v.2.1.0 - 2020-06-19

- Check there is only one version of mistica running in the same page
- New color constants for desktop nav bar
- Change credit card form fields spacing to 16px
- Fix control active color for Movitar prominent.

# v.2.0.0 - 2020-06-12

- Header improvements:
  - Allow two buttons in header.
  - **Breaking Change**: Allow extra content vertical in desktop. This is now the default behavior, to enable
    the old horizontal behavior use `sideBySideExtraOnDesktop` prop in `HeaderLayout`.
  - Make header title optional
  - Allow any `React.Node` as `header` prop in `HeaderLayout` to support skeletons there.
  - Change error color to pink
- Grid layout now have 12 columns in tablet breakpoint too. It had 8 before.
- Expose `Locale` and `RegionCode` types.

# v.1.1.0 - 2020-06-10

- Fix [bug](https://github.com/Telefonica/mistica-web/pull/12) with cancel calback on Dialogs
- `locale` now have the format `'es-ES'` instead of `es_ES`. This change is retrocompatible at run time
  because we sanitize locales before using them (replace `_` with `-`). But the types aren't retrocompatible
  because we have changed the `Locale` enum

# v.1.0.1 - 2020-06-05

- Include flow types

# v.1.0.0 - 2020-06-05

- First release!
