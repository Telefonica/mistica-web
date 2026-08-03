# Contributing to mistica-web

Thank you for your interest in Mística. You can contribute to this project in several ways:

<!-- TOC depthFrom:2 -->

- [Pull Requests](#pull-requests)
  - [Fork PRs — preview deployment](#fork-prs--preview-deployment)
- [Bug reports](#bug-reports)
- [Feature requests (no UI/UX changes)](#feature-requests-no-uiux-changes)
- [Documentation and help requests](#documentation-and-help-requests)
- [New component proposals or UI/UX changes](#new-component-proposals-or-uiux-changes)

<!-- /TOC -->

You can contact maintainers at the
[Mística Teams Channel](https://teams.microsoft.com/l/channel/19%3ad2e3607a32ec411b8bf492f43cd0fe0c%40thread.tacv2/General?groupId=e265fe99-929f-45d1-8154-699649674a40&tenantId=9744600e-3e04-492e-baa1-25ec245c6f10).
Don't hesitate to ask any questions and share your ideas

## Pull Requests

We would love to accept your Pull Requests but please, before starting your development,
[create an issue](https://github.com/Telefonica/mistica-web/issues/new/choose).

### PR Title - Conventional commit standard

PR title must follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>
```

- **type**: the kind of change (see the allowed subset below).
- **scope**: the affected **component name** (for example `TextField`, `Dialog`). For internal changes that do
  not touch a component, use `Chore` as the scope.
- **subject**: a concise, imperative description of the change.
- Add the `AI` label when the code was written by an AI agent.

#### Allowed types (the supported subset)

Conventional Commits defines many types, but this repository intentionally supports only a subset. The
allowlist is enforced by the `validate-pr-title` job in
[`.github/workflows/ci.yml`](./.github/workflows/ci.yml#L108):

- fix
- feat
- chore
- revert

### PR Description

Concise summary of the problem and fix, ending with `Ref: <ISSUE-ID>`;

### Reviewers

Always add the `@Telefonica/mistica-web-reviewers` team as a reviewer to every PR.

### Fork PRs — preview deployment

PRs opened from a fork cannot access repository secrets, so CI and the preview deployment do not run
automatically. The process requires a maintainer to explicitly approve each step:

1. A maintainer approves the CI run on the PR so the standard checks execute against the fork's code.
2. A maintainer reviews the PR and adds the `safe-to-deploy` label. This captures the exact commit SHA at that
   moment and triggers the deployment workflow.
3. The triggered workflow post a link to the workflow run, which a manitainer has to approve. This approval
   gate is required before any secrets are exposed.
4. Once approved, the preview is deployed against the pinned commit SHA. The deployment URL is printed in the
   workflow run logs.

> [!IMPORTANT] If you push new commits to your branch after the `safe-to-deploy` label is added, the
> deployment will fail with a SHA mismatch. A maintainer must remove the label and add it again to re-trigger
> the deployment for the new commits.

## Bug reports

If something is broken or not working as expected, let us know!

:bug:
[Open a Bug issue](https://github.com/Telefonica/mistica-web/issues/new?assignees=&labels=bug&template=bug-report.md&title=)

## Feature requests (no UI/UX changes)

If you need additional functionality, support a new use case, improve a component API...

:construction:
[Open a Feature Request issue](https://github.com/Telefonica/mistica-web/issues/new?assignees=&labels=enhancement&template=feature-request.md&title=)

**Important:** Your feature request should not include UI or UX changes, only implementation details, because
those kind of changes must be evaluated, approved and documented by the `Design Core Team` (see
[New component proposals or UI/UX changes](#new-component-proposals-or-uiux-changes) section).

## Documentation and help requests

Is something in our documentation not well explained? Do you need help using a component? Should we create a
new [Storybook](https://mistica-web.vercel.app/) story as example?

:blue_book:
[Open an Documentation issue](https://github.com/Telefonica/mistica-web/issues/new?assignees=&labels=documentation&template=documentation-request.md&title=)

## New component proposals or UI/UX changes

Adding a new component to the Mística Design System or updating the UI/UX of an existing one requires to
follow a process where the component and its use cases will be evaluated by the `Design Core Team`.

Share your ideas at the
[Mística Teams Channel](https://teams.microsoft.com/l/channel/19%3ad2e3607a32ec411b8bf492f43cd0fe0c%40thread.tacv2/General?groupId=e265fe99-929f-45d1-8154-699649674a40&tenantId=9744600e-3e04-492e-baa1-25ec245c6f10)
or [open an issue](https://github.com/Telefonica/mistica/issues) in the main Mistica Repository
