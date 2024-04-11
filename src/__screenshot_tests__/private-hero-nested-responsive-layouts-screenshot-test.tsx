import {openStoryPage, screen} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'DESKTOP', 'LARGE_DESKTOP'] as const;

test.each(DEVICES)('Hero with nested responsive layouts (%s)', async (device) => {
    await openStoryPage({
        id: 'private-hero-with-nested-responsivelayouts--default',
        device,
    });

    const element = await screen.findByTestId('slideshow');

    expect(await element.screenshot()).toMatchImageSnapshot();
});
