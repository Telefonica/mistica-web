import {openStoryPage, screen, PageApi} from '../test-utils';

const updateSnackbar = async ({
    page,
    type = 'INFORMATIVE',
    message = 'This is a message',
    button = 'Action',
}: {
    page: PageApi;
    type?: string;
    message?: string;
    button?: string;
}) => {
    await page.select(await screen.findByLabelText('type'), type);

    const buttonHandle = await screen.findByLabelText('buttonText (opcional)');
    const messageHandle = await screen.findByLabelText('message');

    await page.click(buttonHandle, {clickCount: 3});
    await page.type(buttonHandle, button, {delay: 0});

    await page.click(messageHandle, {clickCount: 3});
    await page.type(messageHandle, message, {delay: 0});
};

test('informative', async () => {
    const page = await openStoryPage({
        id: 'components-dialogs-snackbar--default',
        device: 'MOBILE_ANDROID',
    });

    await updateSnackbar({page});

    const snackbar = await screen.findByRole('alert');
    const image = await snackbar.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('critical', async () => {
    const page = await openStoryPage({
        id: 'components-dialogs-snackbar--default',
        device: 'MOBILE_ANDROID',
    });

    await updateSnackbar({page, type: 'CRITICAL'});

    const snackbar = await screen.findByRole('alert');
    const image = await snackbar.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('long message', async () => {
    const page = await openStoryPage({
        id: 'components-dialogs-snackbar--default',
        device: 'MOBILE_ANDROID',
    });

    await updateSnackbar({
        page,
        message: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs',
    });

    const snackbar = await screen.findByRole('alert');
    const image = await snackbar.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('long action', async () => {
    const page = await openStoryPage({
        id: 'components-dialogs-snackbar--default',
        device: 'MOBILE_ANDROID',
    });

    await updateSnackbar({
        page,
        button: 'Is this action long enough?',
    });

    const snackbar = await screen.findByRole('alert');
    const image = await snackbar.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('long action and message', async () => {
    const page = await openStoryPage({
        id: 'components-dialogs-snackbar--default',
        device: 'MOBILE_ANDROID',
    });

    await updateSnackbar({
        page,
        message: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs',
        button: 'Is this action long enough?',
    });

    const snackbar = await screen.findByRole('alert');
    const image = await snackbar.screenshot();
    expect(image).toMatchImageSnapshot();
});
