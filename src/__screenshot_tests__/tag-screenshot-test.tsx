import {openStoryPage, screen, setRootFontSize} from '../test-utils';

test('Tags', async () => {
    await openStoryPage({
        id: 'components-others-tag--default',
        device: 'DESKTOP',
    });

    const tag = await screen.findByTestId('tags');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Tags dark mode', async () => {
    await openStoryPage({
        id: 'components-others-tag--default',
        device: 'DESKTOP',
        isDarkMode: true,
    });

    const tag = await screen.findByTestId('tags');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Tags short label', async () => {
    await openStoryPage({
        id: 'components-others-tag--default',
        device: 'DESKTOP',
        args: {label: '1%'},
    });

    const tag = await screen.findByTestId('tags');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Tags long label', async () => {
    await openStoryPage({
        id: 'components-others-tag--default',
        device: 'DESKTOP',
        args: {label: 'Super long label is long'},
    });

    const tag = await screen.findByTestId('tags');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Tags with large fontSize', async () => {
    await openStoryPage({
        id: 'components-others-tag--default',
        device: 'DESKTOP',
    });

    await setRootFontSize(32);

    const tag = await screen.findByTestId('tags');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});
