import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

for (const position of ['top-right', 'bottom-left'] as const) {
    test(`Snackbar position=${position} on desktop`, async () => {
        const page = await openStoryPage({
            id: 'components-snackbar--default',
            device: 'DESKTOP',
            args: {position, persistent: true},
        });

        await (await screen.findByRole('button', {name: 'Open Snackbar'})).click();
        await screen.findByRole('alert');
        await expectScreenshot(page);
    });
}

test('informative', async () => {
    await openStoryPage({
        id: 'components-snackbar--default',
        device: 'MOBILE_ANDROID',
    });

    await (await screen.findByRole('button', {name: 'Open Snackbar'})).click();
    const snackbar = await screen.findByRole('alert');
    await expectScreenshot(snackbar);
});

test('critical', async () => {
    await openStoryPage({
        id: 'components-snackbar--default',
        device: 'MOBILE_ANDROID',
        args: {type: 'CRITICAL'},
    });

    await (await screen.findByRole('button', {name: 'Open Snackbar'})).click();
    const snackbar = await screen.findByRole('alert');
    await expectScreenshot(snackbar);
});

test('long message', async () => {
    await openStoryPage({
        id: 'components-snackbar--default',
        device: 'MOBILE_ANDROID',
        args: {
            message: 'The quick brown fox jumps over the lazy dog - Pack my box with five dozen liquor jugs',
        },
    });

    await (await screen.findByRole('button', {name: 'Open Snackbar'})).click();
    const snackbar = await screen.findByRole('alert');
    await expectScreenshot(snackbar);
});

test('long action', async () => {
    await openStoryPage({
        id: 'components-snackbar--default',
        device: 'MOBILE_ANDROID',
        args: {
            buttonText: 'This action is long enough',
        },
    });

    await (await screen.findByRole('button', {name: 'Open Snackbar'})).click();
    const snackbar = await screen.findByRole('alert');
    await expectScreenshot(snackbar);
});

test('long action and message', async () => {
    await openStoryPage({
        id: 'components-snackbar--default',
        device: 'MOBILE_ANDROID',
        args: {
            message: 'The quick brown fox jumps over the lazy dog - Pack my box with five dozen liquor jugs',
            buttonText: 'This action is long enough',
        },
    });

    await (await screen.findByRole('button', {name: 'Open Snackbar'})).click();
    const snackbar = await screen.findByRole('alert');
    await expectScreenshot(snackbar);
});

test('with dismiss button', async () => {
    await openStoryPage({
        id: 'components-snackbar--default',
        device: 'MOBILE_ANDROID',
        args: {
            dismiss: true,
        },
    });

    await (await screen.findByRole('button', {name: 'Open Snackbar'})).click();
    const snackbar = await screen.findByRole('alert');
    await expectScreenshot(snackbar);
});

test('with dismiss button and long message', async () => {
    await openStoryPage({
        id: 'components-snackbar--default',
        device: 'MOBILE_ANDROID',
        args: {
            message: 'The quick brown fox jumps over the lazy dog - Pack my box with five dozen liquor jugs',
            dismiss: true,
        },
    });

    await (await screen.findByRole('button', {name: 'Open Snackbar'})).click();
    const snackbar = await screen.findByRole('alert');
    await expectScreenshot(snackbar);
});

test('with dismiss button and long action', async () => {
    await openStoryPage({
        id: 'components-snackbar--default',
        device: 'MOBILE_ANDROID',
        args: {
            buttonText: 'This action is long enough',
            dismiss: true,
        },
    });

    await (await screen.findByRole('button', {name: 'Open Snackbar'})).click();
    const snackbar = await screen.findByRole('alert');
    await expectScreenshot(snackbar);
});

test('with dismiss button and long action and message', async () => {
    await openStoryPage({
        id: 'components-snackbar--default',
        device: 'MOBILE_ANDROID',
        args: {
            message: 'The quick brown fox jumps over the lazy dog - Pack my box with five dozen liquor jugs',
            buttonText: 'This action is long enough',
            dismiss: true,
        },
    });

    await (await screen.findByRole('button', {name: 'Open Snackbar'})).click();
    const snackbar = await screen.findByRole('alert');
    await expectScreenshot(snackbar);
});

['INFORMATIVE', 'CRITICAL'].forEach((type) => {
    test(`${type} in dark mode`, async () => {
        await openStoryPage({
            id: 'components-snackbar--default',
            device: 'MOBILE_ANDROID',
            args: {type},
            isDarkMode: true,
        });

        await (await screen.findByRole('button', {name: 'Open Snackbar'})).click();
        const snackbar = await screen.findByRole('alert');
        await expectScreenshot(snackbar);
    });
});
