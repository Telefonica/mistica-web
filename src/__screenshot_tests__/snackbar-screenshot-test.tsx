import {openStoryPage, screen} from '../test-utils';

test('informative', async () => {
    await openStoryPage({
        id: 'components-snackbar--default',
        device: 'MOBILE_ANDROID',
    });

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

    const snackbar = await screen.findByRole('alert');
    const image = await snackbar.screenshot();
    expect(image).toMatchImageSnapshot();
});
