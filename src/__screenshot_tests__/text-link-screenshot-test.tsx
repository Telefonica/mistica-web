import {openStoryPage, screen} from '../test-utils';

test('TextLink in light mode screenshot', async () => {
    await openStoryPage({id: 'components-text-link--default'});

    const textLink = await screen.findByTestId('text-link');

    const image = await textLink.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('TextLink inverse in light mode screenshot', async () => {
    await openStoryPage({
        id: 'components-text-link--default',
        args: {inverse: true},
    });

    const textLink = await screen.findByTestId('text-link');

    const image = await textLink.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('TextLink in dark mode screenshot', async () => {
    await openStoryPage({
        id: 'components-text-link--default',
        isDarkMode: true,
    });

    const textLink = await screen.findByTestId('text-link');

    const image = await textLink.screenshot();

    expect(image).toMatchImageSnapshot();
});
