import {openStoryPage, screen, setRootFontSize} from '../test-utils';

const BADGE_OPTIONS = [1, 10, true];

test('Tags', async () => {
    await openStoryPage({
        id: 'components-tag--default',
        device: 'DESKTOP',
    });

    const tag = await screen.findByTestId('tags');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Tags without icon', async () => {
    await openStoryPage({
        id: 'components-tag--default',
        device: 'DESKTOP',
        args: {icon: false},
    });

    const tag = await screen.findByTestId('tags');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Tags inverse', async () => {
    await openStoryPage({
        id: 'components-tag--default',
        device: 'DESKTOP',
        args: {inverse: true},
    });

    const tag = await screen.findByTestId('tags');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Tags dark mode', async () => {
    await openStoryPage({
        id: 'components-tag--default',
        device: 'DESKTOP',
        isDarkMode: true,
    });

    const tag = await screen.findByTestId('tags');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Tags inverse and dark mode', async () => {
    await openStoryPage({
        id: 'components-tag--default',
        device: 'DESKTOP',
        isDarkMode: true,
        args: {inverse: true},
    });

    const tag = await screen.findByTestId('tags');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Tags short label', async () => {
    await openStoryPage({
        id: 'components-tag--default',
        device: 'DESKTOP',
        args: {label: '1'},
    });

    const tag = await screen.findByTestId('tags');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Tags long label', async () => {
    await openStoryPage({
        id: 'components-tag--default',
        device: 'MOBILE_IOS',
        args: {label: 'This is a super long label that should overflow and show ellipsis'},
    });

    const tag = await screen.findByTestId('tags');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Tags with large fontSize', async () => {
    await openStoryPage({
        id: 'components-tag--default',
        device: 'DESKTOP',
    });

    await setRootFontSize(32);

    const tag = await screen.findByTestId('tags');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(BADGE_OPTIONS)('Tags with badge={%s}', async (badge) => {
    await openStoryPage({
        id: 'components-tag--default',
        device: 'DESKTOP',
        args: {badge},
    });

    const tag = await screen.findByTestId('tags');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Tags with badge and large fontSize', async () => {
    await openStoryPage({
        id: 'components-tag--default',
        device: 'DESKTOP',
        args: {badge: 1},
    });

    await setRootFontSize(32);

    const tag = await screen.findByTestId('tags');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Tags with custom colors', async () => {
    await openStoryPage({
        id: 'components-tag--default',
        device: 'DESKTOP',
        args: {
            badge: 1,
            colorConfig: 'custom color',
            textColorCustom: 'yellow',
            backgroundColorCustom: 'blue',
        },
    });

    await setRootFontSize(32);

    const tag = await screen.findByTestId('tags');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});
