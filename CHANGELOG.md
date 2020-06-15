# CHANGELOG

## v.2.0.0 - 2020-06-12

- Header improvements:
  - Allow two buttons in header.
  - **Breaking Change**: Allow extra content vertical in desktop. This is now the default behavior, to enable
    the old horizontal behavior use `sideBySideExtraOnDesktop` prop in `HeaderLayout`.
  - Make header title optional
  - Allow any `React.Node` as `header` prop in `HeaderLayout` to support skeletons there.
  - Change error color to pink
- Grid layout now have 12 columns in tablet breakpoint too. It had 8 before.
- Expose `Locale` and `RegionCode` types.

## v.1.1.0 - 2020-06-10

- Fix [bug](https://github.com/Telefonica/mistica-web/pull/12) with cancel calback on Dialogs
- `locale` now have the format `'es-ES'` instead of `es_ES`. This change is retrocompatible at run time
  because we sanitize locales before using them (replace `_` with `-`). But the types aren't retrocompatible
  because we have changed the `Locale` enum

## v.1.0.1 - 2020-06-05

- Include flow types

## v.1.0.0 - 2020-06-05

- First release!
