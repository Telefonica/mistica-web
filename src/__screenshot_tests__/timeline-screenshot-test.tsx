import {openStoryPage, screen} from '../test-utils';

const ASSET_TYPES = ['dot', 'number', 'icon', 'circled-icon'];

test.each(ASSET_TYPES)('Timeline %s asset', async (asset) => {
    await openStoryPage({
        id: 'components-timeline--timeline-story',
        args: {orientation: 'vertical', items: 3, activeItem: 1, asset},
    });

    const timer = await screen.findByRole('list');

    const image = await timer.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Timeline horizontal', async () => {
    await openStoryPage({
        id: 'components-timeline--timeline-story',
        args: {orientation: 'horizontal', items: 3, activeItem: 1, asset: 'dot'},
    });

    const timer = await screen.findByRole('list');

    const image = await timer.screenshot();
    expect(image).toMatchImageSnapshot();
});
