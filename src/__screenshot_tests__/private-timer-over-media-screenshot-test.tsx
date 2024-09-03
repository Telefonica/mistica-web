import {openStoryPage, screen} from '../test-utils';

test('Private example', async () => {
    await openStoryPage({
        id: 'private-timer-over-media--default',
        device: 'MOBILE_IOS',
    });

    const card = await screen.findByTestId('card');
    expect(await card.screenshot()).toMatchImageSnapshot();
});
