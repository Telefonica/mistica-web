# Commits and Pull Requests

This document describes the commit and pull-request conventions used in `mistica-web` and how
they drive the automated release process.

## Overview

The repository releases with [`semantic-release`](https://semantic-release.gitbook.io/). The
version number and changelog are derived automatically from the conventional-commit history, so the
format of the message that lands on `master` directly determines whether a release is published and
which part of the version is incremented.

## Conventional commits

Messages follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>
```

- **type**: the kind of change (see the allowed subset below).
- **scope**: the affected **component name** (for example `TextField`, `Dialog`). For internal
  changes that do not touch a component, use `Chore` as the scope.
- **subject**: a concise, imperative description of the change.

## Allowed types (the supported subset)

Conventional Commits defines many types, but this repository intentionally supports only a subset.
The allowlist is enforced by the `validate-pr-title` job in
[`.github/workflows/ci.yml`](../.github/workflows/ci.yml):

| Type     | Purpose                                          | Release effect   |
| -------- | ------------------------------------------------ | ---------------- |
| `feat`   | A new feature or a new component API.            | Minor version    |
| `fix`    | A bug fix.                                        | Patch version    |
| `revert` | Reverts a previous change.                        | Patch version    |
| `chore`  | Internal work with no user-facing impact.         | No release       |

Any other type (for example `docs`, `style`, `refactor`, `test`) is rejected at pull-request
validation and must be expressed as one of the four types above.

## Semantic versioning scope

Releases follow [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`), but the supported
type subset deliberately limits which increments occur automatically:

- `feat` raises the **minor** version.
- `fix` and `revert` raise the **patch** version.
- `chore` produces **no release**.

Major-version increments are not produced through routine pull requests. Breaking changes are
coordinated and released deliberately rather than triggered automatically from a commit type.

## Pull-request rules

Pull requests merge into `master`, and the pull-request **title** becomes the commit message that
`semantic-release` analyses. The title therefore must satisfy the conventions above. See
[CONTRIBUTING.md](../CONTRIBUTING.md) for the full contribution flow.

- The title must follow the conventional-commit format, with the scope set to the affected
  component name (or `Chore` for internal changes).
- The description should be a concise summary of the problem and the fix, ending with
  `Ref: <TICKET-ID>` when a Jira ticket exists.
- Add the `@Telefonica/mistica-web-reviewers` team as a reviewer.
- Add the `AI` label when the code was written by an AI agent.

Only the pull-request title is validated. Local commit messages are not linted; the `pre-commit`
hook runs `lint-staged` only. This works because pull requests are squashed on merge, so the title
is the single message that reaches `master`.

## Release pipeline

The [`Release` workflow](../.github/workflows/release.yml) runs `semantic-release` and executes the
plugin chain configured under `release` in `package.json`:

1. `@semantic-release/commit-analyzer` determines the next version from the commit history.
2. `@semantic-release/release-notes-generator` builds the release notes.
3. `@semantic-release/changelog` updates `CHANGELOG.md`.
4. `scripts/set-version.js` writes the version into the source.
5. `@semantic-release/npm` publishes the package.
6. `@semantic-release/git` commits `CHANGELOG.md`, `package.json`, and `src/package-version.tsx`.
7. `@semantic-release/github` creates the GitHub release.

The release commit is tagged `[skip ci]` so it does not retrigger the pipeline.
