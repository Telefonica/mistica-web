const os = require('os');
const path = require('path');
const {spawn} = require('child_process');
const {DEVICES, devtoolsUrl, findByText, measure, openStory, wait} = require('./open-story');

const UI_TIMEOUT = 5 * 60 * 1000;

const USAGE = `
Usage: yarn browse <story-id> [options] [steps…]

Options
  --device <name>        ${Object.keys(DEVICES).join(' | ')} (default DESKTOP)
  --skin <name>          Movistar | Vivo | Vivo-evolution | O2 | Telefonica | Blau | Esimflag | Cyber
  --args <k:v;k2:v2>     Storybook args. Booleans need a bang: collapsed:!true
  --dark                 Emulate prefers-color-scheme: dark
  --real-motion          Keep animations and transitions. Use it to debug motion, never for a baseline
  --fail-on-console      Exit with 1 if the story logs a console error or warning
  --ui                   Open a real browser window, drive the steps slowly, and wait for you

Steps, applied in the order you write them
  --click <selector>
  --click-text <text>
  --hover <selector>
  --press <key>          A key name of the CDP protocol, for example Escape, Enter, Tab
  --wait <ms>
  --measure <selector>   Rect plus the computed styles that matter for a specification
  --html <selector>      Outer HTML of the element
  --a11y                 Accessibility tree of the page
  --shot [selector]      PNG of the element, or of the page when you give no selector

Example
  yarn browse components-sidenavbar-bar--double-panel --args collapsed:!false \\
      --click '[data-sidenav-item-id="projects"]' --measure '[role="group"]' --shot nav
`;

const STEP_FLAGS = new Set([
    '--click',
    '--click-text',
    '--hover',
    '--press',
    '--wait',
    '--measure',
    '--html',
    '--a11y',
    '--shot',
]);

const parseArgs = (argv) => {
    const options = {device: 'DESKTOP', skin: 'Movistar'};
    const steps = [];
    let storyId;

    for (let index = 0; index < argv.length; index++) {
        const arg = argv[index];

        if (!arg.startsWith('--')) {
            if (storyId) {
                throw new Error(`Unexpected argument "${arg}"`);
            }
            storyId = arg;
            continue;
        }

        if (STEP_FLAGS.has(arg)) {
            const next = argv[index + 1];
            const takesValue = arg !== '--a11y' && (arg !== '--shot' || (next && !next.startsWith('--')));
            steps.push({kind: arg.slice(2), value: takesValue ? next : undefined});
            if (takesValue) {
                index++;
            }
            continue;
        }

        switch (arg) {
            case '--device':
            case '--skin':
            case '--args':
                options[arg.slice(2)] = argv[++index];
                break;
            case '--dark':
                options.darkMode = true;
                break;
            case '--real-motion':
                options.acceptanceMode = false;
                break;
            case '--fail-on-console':
                options.failOnConsole = true;
                break;
            case '--ui':
                options.ui = true;
                break;
            case '--help':
                options.help = true;
                break;
            default:
                throw new Error(`Unknown option "${arg}"`);
        }
    }

    return {storyId, options, steps};
};

const parseStoryArgs = (value) => {
    if (!value) {
        return undefined;
    }

    return Object.fromEntries(
        value.split(';').map((entry) => {
            const [key, ...rest] = entry.split(':');
            return [key, rest.join(':')];
        })
    );
};

const shotPath = (storyId, index) =>
    path.join(os.tmpdir(), `browse-${storyId.replace(/[^a-z0-9-]/gi, '-')}-${index}.png`);

const openInLocalBrowser = (url) => {
    const command = process.platform === 'darwin' ? 'open' : 'xdg-open';
    const child = spawn(command, [url], {detached: true, stdio: 'ignore'});
    child.on('error', () => console.error('Could not open a browser. Open the link yourself.'));
    child.unref();
};

const waitForEnter = () =>
    new Promise((resolve) => {
        process.stdin.resume();
        process.stdin.once('data', () => {
            process.stdin.pause();
            resolve();
        });
    });

const showUi = async (session, {acceptanceMode}) => {
    if (session.headed) {
        console.error('\nThe browser window is yours. It renders faster, but not with the engine of CI.');
    } else {
        const inspectorUrl = await devtoolsUrl(session.page);
        console.error(`\nLive view of this page, with its DOM and its console:\n  ${inspectorUrl}`);
        console.error(
            'If the live view stays blank, open chrome://inspect, press Configure, and add localhost:9223.'
        );
        openInLocalBrowser(inspectorUrl);
    }

    if (acceptanceMode !== false) {
        console.error('Animations are frozen. Add --real-motion to watch them.');
    }

    if (!process.stdin.isTTY) {
        console.error(`\nNo terminal to read. The browser closes in ${UI_TIMEOUT / 1000} seconds.`);
        await wait(UI_TIMEOUT);
        return;
    }

    console.error('\nPress Enter to close the browser.');
    await waitForEnter();
};

const runStep = async (page, step, storyId, index) => {
    const {kind, value} = step;

    if (kind === 'click') {
        await page.click(value);
        return {step: `click ${value}`, done: true};
    }

    if (kind === 'click-text') {
        const handle = await findByText(page, value);
        if (!handle) {
            throw new Error(`No element with the text "${value}"`);
        }
        await handle.click();
        return {step: `click-text ${value}`, done: true};
    }

    if (kind === 'hover') {
        await page.hover(value);
        return {step: `hover ${value}`, done: true};
    }

    if (kind === 'press') {
        await page.keyboard.press(value);
        return {step: `press ${value}`, done: true};
    }

    if (kind === 'wait') {
        await wait(Number(value));
        return {step: `wait ${value}ms`, done: true};
    }

    if (kind === 'measure') {
        return {step: `measure ${value}`, result: await measure(page, value)};
    }

    if (kind === 'html') {
        const html = await page.evaluate(
            (selector) => document.querySelector(selector)?.outerHTML ?? null,
            value
        );
        return {step: `html ${value}`, result: html};
    }

    if (kind === 'a11y') {
        return {step: 'a11y', result: await page.accessibility.snapshot()};
    }

    if (kind === 'shot') {
        const file = shotPath(storyId, index);
        const target = value ? await page.$(value) : page;
        if (!target) {
            throw new Error(`No element matches "${value}"`);
        }
        await target.screenshot({path: file});
        return {step: `shot ${value ?? 'page'}`, result: file};
    }

    throw new Error(`Unknown step "${kind}"`);
};

const main = async () => {
    const {storyId, options, steps} = parseArgs(process.argv.slice(2));

    if (!storyId || options.help) {
        console.log(USAGE);
        process.exit(storyId ? 0 : 1);
    }

    const storyArgs = parseStoryArgs(options.args);

    const session = await openStory(storyId, {
        device: options.device,
        skin: options.skin,
        args: storyArgs,
        darkMode: options.darkMode,
        acceptanceMode: options.acceptanceMode,
        headed: options.ui,
        log: (message) => console.error(message),
    });

    const report = {story: storyId, device: options.device, steps: []};

    try {
        for (let index = 0; index < steps.length; index++) {
            report.steps.push(await runStep(session.page, steps[index], storyId, index));
            await wait(150);
        }
    } catch (error) {
        report.failure = error.message;
    }

    report.errors = session.errors;
    console.log(JSON.stringify(report, null, 2));

    if (options.ui) {
        const closeAndExit = (code) => session.close().then(() => process.exit(code));
        process.once('SIGINT', () => closeAndExit(130));
        process.once('SIGTERM', () => closeAndExit(143));

        await showUi(session, options);
    }

    await session.close();

    const consoleProblems = report.errors.messages.filter(
        (message) => message.type === 'error' || message.type === 'warning'
    );

    if (report.failure) {
        console.error(`\nFAILED: ${report.failure}`);
        process.exit(1);
    }

    if (report.errors.pageErrors.length > 0) {
        console.error(`\n${report.errors.pageErrors.length} uncaught error(s) in the page.`);
        process.exit(1);
    }

    if (options.failOnConsole && consoleProblems.length > 0) {
        console.error(`\n${consoleProblems.length} console error(s) or warning(s).`);
        process.exit(1);
    }
};

main().catch((error) => {
    console.error(`FAILED: ${error.message}`);
    process.exit(1);
});
