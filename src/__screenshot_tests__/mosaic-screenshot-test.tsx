import {openStoryPage, screen} from '../test-utils';

const ITEMS_COUNT = [1, 2, 3, 4, 5, 6, 7, 8];

test.each(ITEMS_COUNT)('HorizontalMosaic - %s items', async (items) => {
    await openStoryPage({
        id: 'components-mosaic--horizontal-mosaic-story',
        device: 'DESKTOP',
        args: {items},
    });

    const story = await screen.findByTestId('horizontal-mosaic');

    expect(await story.screenshot()).toMatchImageSnapshot();
});

test.each(ITEMS_COUNT)('VerticalMosaic - %s items', async (items) => {
    await openStoryPage({
        id: 'components-mosaic--vertical-mosaic-story',
        device: 'DESKTOP',
        args: {items},
    });

    const story = await screen.findByTestId('vertical-mosaic');

    expect(await story.screenshot()).toMatchImageSnapshot();
});

test('HorizontalMosaic - appears properly on mobile', async () => {
    await openStoryPage({
        id: 'components-mosaic--horizontal-mosaic-story',
        device: 'MOBILE_IOS',
    });

    const story = await screen.findByTestId('horizontal-mosaic');

    expect(await story.screenshot()).toMatchImageSnapshot();
});

test('VerticalMosaic - appears properly on mobile', async () => {
    await openStoryPage({
        id: 'components-mosaic--vertical-mosaic-story',
        device: 'MOBILE_IOS',
    });

    const story = await screen.findByTestId('vertical-mosaic');

    expect(await story.screenshot()).toMatchImageSnapshot();
});
