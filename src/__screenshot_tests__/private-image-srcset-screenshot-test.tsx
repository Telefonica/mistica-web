import {openStoryPage, screen} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'DESKTOP', 'LARGE_DESKTOP'] as const;

test.each(DEVICES)('Image with srcSet is responsive (%s)', async (device) => {
    await openStoryPage({
        id: 'private-image-image-with-srcset-attribute-is-responsive--default',
        device,
    });

    const element = await screen.findByTestId('content');
    expect(await element.screenshot()).toMatchImageSnapshot();
});
