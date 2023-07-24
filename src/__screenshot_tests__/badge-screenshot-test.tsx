import {openStoryPage, screen} from '../test-utils';

const BADGE_VALUE_OPTIONS = ['undefined', '0', '2', '14'];

test.each(BADGE_VALUE_OPTIONS)('Badge - value = %s', async (value) => {
    await openStoryPage({
        id: 'components-badge--default',
        device: 'MOBILE_IOS',
        args: {value},
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Badge - over inverse', async () => {
    await openStoryPage({
        id: 'components-badge--default',
        device: 'MOBILE_IOS',
        args: {inverse: true},
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});
