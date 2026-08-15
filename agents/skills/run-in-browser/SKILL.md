---
name: run-in-browser
description:
  Drive a component in the dockerized Chromium that CI uses, to interact with it, catch runtime errors,
  measure it, screenshot it, and read its accessibility tree
applyTo: 'src/**/*.tsx,src/**/*.css.ts,src/**/__screenshot_tests__/**,playroom/**'
globs: src/**/*.tsx,src/**/*.css.ts,src/**/__screenshot_tests__/**,playroom/**
alwaysApply: false
---

# Run a component in a real browser

Before you claim that a component works or matches its specification, drive it in a browser. A unit test in
jsdom proves logic. It does not prove layout, appearance, or interaction.

This repository ships one browser for that purpose: the dockerized Chromium of
`@telefonica/acceptance-testing`, on port 9223. CI uses that browser and no other.

## What the browser answers

1. **Interaction.** Does a real click reach the element? Does the keyboard close the panel? Does a hover
   paint?
2. **Runtime errors.** An uncaught exception, a React warning, a failed request.
3. **Measurement.** A rect and the computed styles, against the numbers of the specification.
4. **Appearance.** A screenshot that you read yourself.
5. **Structure.** The rendered HTML and the accessibility tree, which tell you what a screen reader announces.

## Rules

1. Measure and screenshot in the dockerized Chromium, and connect to it, never launch it. A local browser
   answers a question about behaviour, never a question about a pixel. `--ui` is the one exception, and a
   human asks for it.
2. Do not change `platform: linux/amd64` in the `docker-compose.yaml` of `@telefonica/acceptance-testing`. The
   team pinned that architecture so that gradients, backgrounds, and antialiasing render exactly as they do in
   CI. The emulation costs time, and the team accepts that price.
3. Take every number with `getBoundingClientRect` or `getComputedStyle`. Never estimate from an image.
4. Report the measured values against the specification values, in a table.
5. Look at the screenshot. A correct number can still look wrong.

## The command

Storybook must run first. Reuse the one on port 6006 if it answers, otherwise run `yarn storybook`. Read the
story id from `http://localhost:6006/index.json`, because Storybook shortens a title in ways that surprise
you.

```bash
yarn browse <story-id> [options] [steps…]
```

The command starts the container if port 9223 is silent. It applies each step in the order you write it, then
prints a JSON report with the results, the console messages, the uncaught errors, and the failed requests.

Options: `--device`, `--skin`, `--args`, `--dark`, `--real-motion`, `--fail-on-console`, `--ui`. Steps:
`--click`, `--click-text`, `--hover`, `--press`, `--wait`, `--measure`, `--html`, `--a11y`, `--shot`. Run
`yarn browse` with no argument for the full list.

Example, which opens the second column of the sidenav and measures it:

```bash
yarn browse components-sidenavbar-bar--double-panel \
    --click '[data-sidenav-item-id="projects"]' \
    --measure '[role="group"][aria-label="Projects"]' \
    --shot nav
```

`--shot` writes the PNG in the temporary directory of the system and prints the path. Read that file.

By default the page runs in acceptance mode, the same as CI: the user agent carries `acceptance-test`,
animations and transitions stop, and the scrollbars hide. Add `--real-motion` when you must debug a
transition, and never for a baseline.

## Watch the page with your own eyes

`--ui` copies `test-acceptance --ui`: it opens a real browser window on your machine, and it slows every
action by 50 ms, so your eye follows it. It applies your steps, then it waits for you. Press Enter to close
the browser.

```bash
yarn browse components-sidenavbar-bar--double-panel --ui --real-motion
```

That window is not the engine of CI. Trust it for a behaviour, never for a pixel.

The command tries the Chromium of Puppeteer first, because its version matches CI. That binary is x86_64, so
it fails on an arm64 Mac. The command then tries the Chrome for Testing of `~/.cache/puppeteer`, then Google
Chrome, then Chromium, then Edge. `BROWSE_BROWSER=<path>` puts your own choice first.

If no local browser starts, the command keeps the page in the container and opens the DevTools of that page
instead. The container has no screen, so that live view is the only way to watch the engine of CI itself.

`--ui` needs a human. Do not use it in an automated run: it holds the browser until Enter, or for five minutes
when no terminal answers.

## Anything the command cannot express

Import `scripts/open-story.js` in a throwaway script at the root of the repository, so that `require`
resolves:

```js
const {openStory, measure} = require('./scripts/open-story');

const {page, errors, close} = await openStory('components-sidenavbar-bar--double-panel', {
  device: 'DESKTOP',
  args: {collapsed: '!true'},
});

await page.click('[data-sidenav-item-id="projects"]');
console.log(await measure(page, '[role="group"]'), errors);
await close();
```

`errors` collects from before the first navigation, because React logs its warnings during the first render.
Delete the script when you finish.

## Screenshot baselines

Never write a baseline by hand. Run the screenshot test of the repository:

```bash
PATH="$PWD/node_modules/.bin:$PATH" node node_modules/.bin/test-acceptance src/<component>/tests/__screenshot_tests__/<name>-screenshot-test.tsx
```

It sets `HEADLESS=true`, which selects the dockerized Chromium. The library refuses `toMatchImageSnapshot`
from any other browser: the expectation passes, then `afterEach` throws.

A local run reuses a development Storybook, while CI serves a production build. If a baseline file is new, say
so, and let the author decide whether to keep it or to let CI write it.

## One caveat about the old engine

The container runs Chromium 93, from 2021. For a pixel it is the only correct engine. For an error hunt it can
mislead you, because a modern API or a modern syntax can fail there while a current browser stays silent.

- A pixel or a measurement: the container, always.
- An unexplained runtime error: reproduce it in the container, then confirm it in a current Chrome before you
  call it a defect of the component.

## Troubleshooting

| Symptom                          | Cause                                     | Action                                        |
| -------------------------------- | ----------------------------------------- | --------------------------------------------- |
| `spawn Unknown system error -88` | The Chromium of Puppeteer is x86_64       | Connect to port 9223, or let `--ui` fall back |
| `Cannot find module 'puppeteer'` | The script sits outside the repository    | Move it to the root of the repository         |
| The page loads empty             | The URL uses `localhost` inside docker    | Use `host.docker.internal`                    |
| `Storybook does not answer`      | No server on port 6006                    | Run `yarn storybook`                          |
| The story does not exist         | A guessed id                              | Read `http://localhost:6006/index.json`       |
| `jest: command not found`        | `test-acceptance` shells out to `jest`    | Prefix `PATH="$PWD/node_modules/.bin:$PATH"`  |
| `Node is either not clickable`   | The element is hidden in this state       | Check the state, or click a visible ancestor  |
| A click by text finds nothing    | A hidden accessibility token in the label | Use `--click` with a selector                 |
| `yarn` dies on a shell error     | The shell of the agent loads `nvm` lazily | Run `node scripts/browse-story.js …`          |
