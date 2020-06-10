# CHANGELOG

## v.1.1.0 - 2020-06-10

- Fix [bug](https://github.com/Telefonica/mistica-web/pull/12) with cancel calback on Dialogs
- `locale` now have the format `'es-ES'` instead of `es_ES`. This change is retrocompatible at run time
  because we sanitize locales before using them (replace `_` with `-`). But the types aren't retrocompatible
  because we have changed the `Locale` enum

## v.1.0.1 - 2020-06-05

- Include flow types

## v.1.0.0 - 2020-06-05

- First release!
