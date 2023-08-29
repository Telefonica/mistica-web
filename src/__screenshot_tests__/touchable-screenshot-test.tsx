import {openStoryPage, screen} from '../test-utils';

test('Touchable', async () => {
    await openStoryPage({id: 'components-primitives-touchable--default'});

    const story = await screen.findByTestId('touchable');

    expect(await story.screenshot()).toMatchImageSnapshot();
});
