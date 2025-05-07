import {openStoryPage, screen} from '../test-utils';

test('TextLink - light mode', async () => {
    await openStoryPage({id: 'components-textlink--default'});

    const textLink = await screen.findByTestId('text-link');

    const image = await textLink.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('TextLink - inverse', async () => {
    await openStoryPage({
        id: 'components-textlink--default',
        args: {inverse: true},
    });

    const textLink = await screen.findByTestId('text-link');

    const image = await textLink.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('TextLink - dark mode', async () => {
    await openStoryPage({
        id: 'components-textlink--default',
        isDarkMode: true,
    });

    const textLink = await screen.findByTestId('text-link');

    const image = await textLink.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('TextLink - disabled', async () => {
    await openStoryPage({id: 'components-textlink--default', args: {disabled: true}});

    const textLink = await screen.findByTestId('text-link');

    const image = await textLink.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('TextLink - wraps if necessary', async () => {
    await openStoryPage({
        id: 'components-textlink--default',
        args: {text: 'a long text for the description to force text wrap'},
        device: 'MOBILE_IOS',
    });

    const textLink = await screen.findByTestId('text-link');

    const image = await textLink.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('TextLink - inherits text style', async () => {
    await openStoryPage({id: 'components-textlink--default', args: {textStyle: 'Text5'}});

    const textLink = await screen.findByTestId('text-link');

    const image = await textLink.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('TextLink - underline on hover', async () => {
    await openStoryPage({
        id: 'components-textlink--default',
        args: {underline: 'on hover'},
    });

    const textLink = await screen.findByTestId('text-link');

    const image = await textLink.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('TextLink - underline on hover - inverse', async () => {
    await openStoryPage({
        id: 'components-textlink--default',
        args: {inverse: true, underline: 'on hover'},
    });

    const textLink = await screen.findByTestId('text-link');

    const image = await textLink.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('TextLink - underline on hover - dark mode', async () => {
    await openStoryPage({
        id: 'components-textlink--default',
        args: {underline: 'on hover'},
        isDarkMode: true,
    });

    const textLink = await screen.findByTestId('text-link');

    const image = await textLink.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('TextLink - underline on hover - inverse - dark mode', async () => {
    await openStoryPage({
        id: 'components-textlink--default',
        args: {inverse: true, underline: 'on hover'},
        isDarkMode: true,
    });

    const textLink = await screen.findByTestId('text-link');

    const image = await textLink.screenshot();

    expect(image).toMatchImageSnapshot();
});
