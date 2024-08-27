import {openStoryPage, screen} from '../test-utils';

test('informative', async () => {
    await openStoryPage({
        id: 'components-snackbar--default',
        device: 'MOBILE_ANDROID',
    });

    await (await screen.findByRole('button', {name: 'Open Snackbar'})).click();
    const snackbar = await screen.findByRole('alert');
    const image = await snackbar.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('critical', async () => {
    await openStoryPage({
        id: 'components-snackbar--default',
        device: 'MOBILE_ANDROID',
        args: {type: 'CRITICAL'},
    });

    await (await screen.findByRole('button', {name: 'Open Snackbar'})).click();
    const snackbar = await screen.findByRole('alert');
    const image = await snackbar.screenshot();
    expect(image).toMatchImageSnapshot();
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
    const image = await snackbar.screenshot();
    expect(image).toMatchImageSnapshot();
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
    const image = await snackbar.screenshot();
    expect(image).toMatchImageSnapshot();
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
    const image = await snackbar.screenshot();
    expect(image).toMatchImageSnapshot();
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
    const image = await snackbar.screenshot();
    expect(image).toMatchImageSnapshot();
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
    const image = await snackbar.screenshot();
    expect(image).toMatchImageSnapshot();
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
    const image = await snackbar.screenshot();
    expect(image).toMatchImageSnapshot();
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
    const image = await snackbar.screenshot();
    expect(image).toMatchImageSnapshot();
});
